
import api from "../services/api";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "../css/Consulta.css";
import { useNavigate } from "react-router-dom";

function Consultas() {
  const [consultas, setConsultas] = useState([]);
  const [editId, setEditId] = useState(null);
  const [deletarId, setDeletarId] = useState(null);
  const [pesquisa, setPesquisa] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");
  const [erro, setErro] = useState({ geral: "", editar: {} });

  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: "",
    nomePet: "",
    idadePet: "",
    nomeDono: "",
    motivo: "",
    dataConsulta: "",
    status: "",
  });

  async function carregarConsultas() {
    try {
      const response = await api.get("/consultas");
      setConsultas(response.data);
      setErro((prev) => ({
        ...prev,
        geral: "",
      }));
    } catch (error) {
      setErro((prev) => ({
        ...prev,
        editar: error.response?.data?.errors || {},
        geral: error.response?.data?.message || "",
      }))
    }
  }

  const consultaFiltrada = consultas.filter((c) =>
    c.nomeDono.toLowerCase().includes(pesquisa.toLowerCase())).filter((c) => filtroStatus ? c.status === filtroStatus : true );  


  const total = consultas.length;
  const agendadas = consultas.filter((c) => c.status === "AGENDADA").length;
  const atendendo = consultas.filter((c) => c.status === "EM_ATENDIMENTO").length;
  const finalizadas = consultas.filter((c) => c.status === "FINALIZADA").length;

  useEffect(() => {
    carregarConsultas();
  }, []);

  function handleEditId(consulta) {
    setEditId(consulta.id);
    setForm(consulta);
  }



  async function atualizarConsulta(id) {
    try {
      await api.put(`/consultas/${id}`, form);
      await api.patch(`/consultas/${id}/status?status=${form.status}`);
      setEditId(null);
      await carregarConsultas();
      setErro((prev) => ({ ...prev, editar: {} }));
    } catch (error) {
      setErro((prev) => ({
        ...prev,
        editar: error.response?.data?.errors || {},
        geral: error.response?.data?.message || "",
      }))
    }
  }


  async function deletarConsulta(id) {
    try {
      await api.delete(`/consultas/${id}`);
      setDeletarId(null)
      await carregarConsultas();
      setErro((prev) => ({
        ...prev, geral: "",
      }));
    } catch (error) {
      setErro((prev) => ({
        ...prev,
        geral: error.response?.data?.message || ""
      }))
    }
  }

  function formatarData(data) {
    if (!data) return "—";
    return new Date(data).toLocaleString("pt-BR", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  }

  function labelStatus(status) {
    const labels = {
      AGENDADA: "Agendada",
      EM_ATENDIMENTO: "Em Atendimento",
      FINALIZADA: "Finalizada",
    };
    return labels[status] || status;
  }

  function petIcon(idadePet) {
    if (idadePet === "FILHOTE") return "🐶";
    if (idadePet === "IDOSO") return "🐕";
    return "🐾";
  }

  return (
    <main className="page">

      <header className="header">
        <h1>VetNelli <span>🐾</span></h1>
      </header>


      <section className="header-btn">
        <button className="btn-voltar" onClick={() => navigate("/")}>
          ← Voltar
        </button>

        <div className="pesquisa-wrapper">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            className="pesquisa"
            type="text"
            placeholder="Buscar pelo nome do dono…"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
        </div>

        <button className="btn-criar" onClick={() => navigate("/cadastrarConsulta")}>
          + Nova Consulta
        </button>
      </section>


      <div className="stats-bar">
        <span className="stat-chip total" onClick={() => setFiltroStatus("")}>● {total} total</span>
        <span className="stat-chip agendada" onClick={() => setFiltroStatus("AGENDADA")}>● {agendadas} agendadas</span>
        <span className="stat-chip atend" onClick={() => setFiltroStatus("EM_ATENDIMENTO")}>● {atendendo} em atendimento</span>
        <span className="stat-chip final" onClick={() => setFiltroStatus("FINALIZADA")}>● {finalizadas} finalizadas</span>
        {erro.geral && <p className="mensagem-erro-consultas">{erro.geral}</p>}
      </div>

      <section className="consultas-container">
        {consultaFiltrada.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🐾</span>
            <p>Nenhuma consulta encontrada.</p>
          </div>
        ) : (
          consultaFiltrada.map((consulta) => (
            <article className="consulta-card" key={consulta.id}>


              <header className="card-name">
                <div className="name-icon">
                  {editId === consulta.id ? (
                    <>
                      <input
                        value={form.nomePet}
                        onChange={(e) => setForm({ ...form, nomePet: e.target.value })}
                        placeholder="Nome do pet"
                      />
                      {erro.editar.nomePet && (
                        <span className="mensagem-errors">{erro.editar.nomePet}</span>
                      )}
                    </>
                  ) : (
                    <h1>{consulta.nomePet}</h1>
                  )}


                </div>
                <span className="pet-icon">{petIcon(consulta.idadePet)}</span>

              </header>

              <div className="card-body">
                <dl className="card-info">

                  <dt>Dono</dt>
                  <dd>
                    {editId === consulta.id ? (
                      <>
                        <input
                          value={form.nomeDono}
                          onChange={(e) => setForm({ ...form, nomeDono: e.target.value })}
                        />
                        {erro.editar.nomeDono && (
                          <span className="mensagem-errors">{erro.editar.nomeDono}</span>
                        )}
                      </>
                    ) : consulta.nomeDono}
                  </dd>

                  <dt>Idade</dt>
                  <dd>
                    {editId === consulta.id ? (
                      <>
                        <select
                          value={form.idadePet}
                          onChange={(e) => setForm({ ...form, idadePet: e.target.value })}>
                          <option value="filhote">Filhote</option>
                          <option value="adulto">Adulto</option>
                          <option value="idoso">Idoso</option>
                        </select>
                        {erro.editar.idadePet && (
                          <span className="mensagem-errors">{erro.editar.idadePet}</span>
                        )}
                      </>
                    ) : (
                      <span style={{ textTransform: "capitalize" }}>{consulta.idadePet}</span>
                    )}
                  </dd>

                  <dt>Motivo</dt>
                  <dd>
                    {editId === consulta.id ? (
                      <>
                        <input
                          value={form.motivo}
                          onChange={(e) => setForm({ ...form, motivo: e.target.value })}
                        />
                        {erro.editar.motivo && (
                          <span className="mensagem-errors">{erro.editar.motivo}</span>
                        )}
                      </>
                    ) : consulta.motivo}
                  </dd>

                  <dt>Status</dt>
                  <dd>
                    {editId === consulta.id ? (
                      <>
                        <select
                          value={form.status}
                          onChange={(e) => setForm({ ...form, status: e.target.value })}>
                          <option value="AGENDADA">Agendada</option>
                          <option value="EM_ATENDIMENTO">Em Atendimento</option>
                          <option value="FINALIZADA">Finalizada</option>
                        </select>
                        {erro.editar.status && (
                          <span className="mensagem-errors">{erro.editar.status}</span>
                        )}
                      </>

                    ) : (
                      <span className={`status-badge status-${consulta.status}`}>
                        {labelStatus(consulta.status)}
                      </span>
                    )}
                  </dd>

                  <dt>Data</dt>
                  <dd>
                    {editId === consulta.id ? (
                      <>
                        <input
                          type="datetime-local"
                          value={form.dataConsulta ? form.dataConsulta.slice(0, 16) : ""}
                          onChange={(e) => setForm({ ...form, dataConsulta: e.target.value })}
                        />
                        {erro.editar.dataConsulta && (
                          <span className="mensagem-errors">{erro.editar.dataConsulta}</span>
                        )}
                      </>

                    ) : (
                      <span style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
                        {formatarData(consulta.dataConsulta)}
                      </span>
                    )}
                  </dd>

                </dl>

                <div className="card-divider" />

                <div className="card-actions">
                  {editId === consulta.id ? (
                    <>
                      <button className="btn-salvar" onClick={() => atualizarConsulta(consulta.id)}>
                        Salvar
                      </button>
                      <button className="btn-cancelar" onClick={() => { setEditId(null), setErro((prev) => ({ ...prev, editar: {}, geral: "" })) }}>
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <button className="btn-editar" onClick={() => handleEditId(consulta)}>
                      Editar
                    </button>
                  )}
                  <button className="btn-deletar" onClick={() => setDeletarId(consulta.id)}>
                    🗑
                  </button>

                </div>
              </div>

            </article>
          ))
        )}
      </section>
      {deletarId && createPortal(
        <div className="modal-overlay" onClick={() => setDeletarId(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Deletar consulta</h2>
            <p>Tem certeza que deseja deletar esta consulta? Esta ação não pode ser desfeita.</p>
            <div className="modal-actions">
              <button className="btn-cancelar" onClick={() => setDeletarId(null)}>
                Cancelar
              </button>
              <button className="btn-deletar" onClick={() => deletarConsulta(deletarId)}>
                Deletar
              </button>
            </div>
          </div>
        </div>,
        document.body // ← renderiza direto no body
      )}
    </main>

  );
}

export default Consultas;