import { useNavigate } from "react-router-dom";
import "../css/Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <main className="home">
      <div className="home-container">
        <header>
          <h1>VetNelli 🐾</h1>
          <p>Sistema de Gerenciamento Veterinário</p>
        </header>

        <section>
          <button className="btn-entrar" onClick={() => navigate("/consultas")}>
            Entrar
          </button>
        </section>
      </div>
    </main>
  );
}

export default Home;