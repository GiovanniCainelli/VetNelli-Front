import api from "../services/api";
import "../css/CadastrarConsulta.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CadastrarConsulta() {
  const navigate = useNavigate();
  const [consultaCriada, setConsultaCriada] = useState(null);
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({ criar: {}, editar: {} });

  const [form, setForm] = useState({
    nomePet: "",
    idadePet: "",
    nomeDono: "",
    motivo: "",
    dataConsulta: "",
  });

  const [formEdicao, setFormEdicao] = useState({
    nomePet: "",
    idadePet: "",
    nomeDono: "",
    motivo: "",
    dataConsulta: "",
    status: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function cadastrarConsulta(e) {
    e.preventDefault();
    try {
      const response = await api.post("/consultas", form);
      setConsultaCriada(response.data);
      setForm({ nomePet: "", idadePet: "", nomeDono: "", motivo: "", dataConsulta: "" });
      setErrors((prev) => ({ ...prev, criar: {} }));
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        criar: error.response?.data?.errors || {},
      }));
    }
  }

  function handleEditar(consulta) {
    setEditId(consulta.id);
    setFormEdicao(consulta);
  }

  async function atualizarConsulta(id) {
    try {
      await api.put(`/consultas/${id}`, formEdicao);
      await api.patch(`/consultas/${id}/status?status=${formEdicao.status}`);
      const response = await api.get(`/consultas/${id}`);
      setConsultaCriada(response.data);
      setEditId(null);
      setErrors((prev) => ({ ...prev, editar: {} }));
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        editar: error.response?.data?.errors || {},
      }));
    }
  }

  function labelStatus(status) {
    const map = { AGENDADA: "Agendada", EM_ATENDIMENTO: "Em Atendimento", FINALIZADA: "Finalizada" };
    return map[status] || status;
  }

  function formatarData(data) {
    if (!data) return "—";
    return new Date(data).toLocaleString("pt-BR", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  }

  return (
    <main className="page">

      <header className="header">
        <h1>VetNelli 🐾</h1>
      </header>

      <section className="header-btn">
        <button className="btn-voltar" onClick={() => navigate("/consultas")}>
          ← Consultas
        </button>

        <h2>Adicionar Consulta</h2>
        <button className="btn-voltar" onClick={() => navigate("/")}>
          Home
        </button>
      </section>


      <section className="cadastro-container">


        <article className="consulta-card">
          <header className="card-name">
            <input
              type="text"
              name="nomePet"
              required
              value={form.nomePet}
              onChange={handleChange}
              placeholder="Nome do pet"
            />
            {errors.criar.nomePet && (
              <span className="mensagem-errors">{errors.criar.nomePet}</span>
            )}
            <span className="card-label">Cadastro</span>
          </header>

          <div className="card-body">
            <form onSubmit={cadastrarConsulta}>
              <dl className="card-info">

                <dt>Idade</dt>
                <dd>
                  <select name="idadePet" required value={form.idadePet} onChange={handleChange}>
                    <option value="">Selecione</option>
                    <option value="filhote">Filhote</option>
                    <option value="adulto">Adulto</option>
                    <option value="idoso">Idoso</option>
                  </select>
                  {errors.criar.idadePet && (
                    <span className="mensagem-errors">{errors.criar.idadePet}</span>
                  )}
                </dd>

                <dt>Dono</dt>
                <dd>
                  <input
                    type="text"
                    name="nomeDono"
                    required
                    value={form.nomeDono}
                    onChange={handleChange}
                    placeholder="Nome do dono"
                  />
                  {errors.criar.nomeDono && (
                    <span className="mensagem-errors">{errors.criar.nomeDono}</span>
                  )}
                </dd>

                <dt>Motivo</dt>
                <dd>
                  <input
                    type="text"
                    name="motivo"
                    required
                    value={form.motivo}
                    onChange={handleChange}
                    placeholder="Motivo da consulta"
                  />
                  {errors.criar.motivo && (
                    <span className="mensagem-errors">{errors.criar.motivo}</span>
                  )}
                </dd>

                <dt>Data</dt>
                <dd>
                  <input
                    type="datetime-local"
                    name="dataConsulta"
                    required
                    value={form.dataConsulta}
                    onChange={handleChange}
                  />
                  {errors.criar.dataConsulta && (
                    <span className="mensagem-errors">{errors.criar.dataConsulta}</span>
                  )}
                </dd>

              </dl>

              <div className="card-divider" style={{ margin: "18px 0" }} />

              <div className="card-actions">
                <button type="submit" className="btn-salvar">
                  Cadastrar Consulta
                </button>
              </div>
            </form>
          </div>
        </article>


        {consultaCriada && (
          <article className="consulta-card card-criado">
            <header className="card-name">
              {editId === consultaCriada.id ? (
                <input
                  value={formEdicao.nomePet}
                  onChange={(e) => setFormEdicao({ ...formEdicao, nomePet: e.target.value })}
                  placeholder="Nome do pet"
                />
              ) : (
                <h1>{consultaCriada.nomePet}</h1>
              )}
              <span className="card-label">Criada ✓</span>
            </header>

            {errors.editar.nomePet && (
              <span className="mensagem-errors" style={{ padding: "4px 22px 0" }}>
                {errors.editar.nomePet}
              </span>
            )}

            <div className="card-body">
              <dl className="card-info">

                <dt>Dono</dt>
                <dd>
                  {editId === consultaCriada.id ? (
                    <input
                      value={formEdicao.nomeDono}
                      onChange={(e) => setFormEdicao({ ...formEdicao, nomeDono: e.target.value })}
                    />
                  ) : (
                    <span>{consultaCriada.nomeDono}</span>
                  )}
                  {errors.editar.nomeDono && (
                    <span className="mensagem-errors">{errors.editar.nomeDono}</span>
                  )}
                </dd>

                <dt>Idade</dt>
                <dd>
                  {editId === consultaCriada.id ? (
                    <select
                      value={formEdicao.idadePet}
                      onChange={(e) => setFormEdicao({ ...formEdicao, idadePet: e.target.value })}>
                      <option value="filhote">Filhote</option>
                      <option value="adulto">Adulto</option>
                      <option value="idoso">Idoso</option>
                    </select>
                  ) : (
                    <span style={{ textTransform: "capitalize" }}>{consultaCriada.idadePet}</span>
                  )}
                  {errors.editar.idadePet && (
                    <span className="mensagem-errors">{errors.editar.idadePet}</span>
                  )}
                </dd>

                <dt>Motivo</dt>
                <dd>
                  {editId === consultaCriada.id ? (
                    <input
                      value={formEdicao.motivo}
                      onChange={(e) => setFormEdicao({ ...formEdicao, motivo: e.target.value })}
                    />
                  ) : (
                    <span>{consultaCriada.motivo}</span>
                  )}
                  {errors.editar.motivo && (
                    <span className="mensagem-errors">{errors.editar.motivo}</span>
                  )}
                </dd>

                <dt>Status</dt>
                <dd>
                  {editId === consultaCriada.id ? (
                    <select
                      value={formEdicao.status}
                      onChange={(e) => setFormEdicao({ ...formEdicao, status: e.target.value })}>
                      <option value="AGENDADA">Agendada</option>
                      <option value="EM_ATENDIMENTO">Em Atendimento</option>
                      <option value="FINALIZADA">Finalizada</option>
                    </select>
                  ) : (
                    <span className={`status-badge status-${consultaCriada.status}`}>
                      {labelStatus(consultaCriada.status)}
                    </span>
                  )}
                  {errors.editar.status && (
                    <span className="mensagem-errors">{errors.editar.status}</span>
                  )}
                </dd>

                <dt>Data</dt>
                <dd>
                  {editId === consultaCriada.id ? (
                    <input
                      type="datetime-local"
                      value={formEdicao.dataConsulta ? formEdicao.dataConsulta.slice(0, 16) : ""}
                      onChange={(e) => setFormEdicao({ ...formEdicao, dataConsulta: e.target.value })}
                    />
                  ) : (
                    <span style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
                      {formatarData(consultaCriada.dataConsulta)}
                    </span>
                  )}
                  {errors.editar.dataConsulta && (
                    <span className="mensagem-errors">{errors.editar.dataConsulta}</span>
                  )}
                </dd>

              </dl>

              <div className="card-divider" style={{ margin: "4px 0 0" }} />

              <div className="card-actions">
                {editId === consultaCriada.id ? (
                  <>
                    <button className="btn-salvar" onClick={() => atualizarConsulta(consultaCriada.id)}>
                      Salvar
                    </button>
                    <button
                      className="btn-cancelar"
                      onClick={() => {
                        setEditId(null);
                        setErrors((prev) => ({ ...prev, editar: {} }));
                      }}>
                      Cancelar
                    </button>
                  </>
                ) : (
                  <button className="btn-editar" onClick={() => handleEditar(consultaCriada)}>
                    Editar
                  </button>
                )}
              </div>
            </div>
          </article>
        )}

      </section>
    </main>
  );
}

export default CadastrarConsulta;