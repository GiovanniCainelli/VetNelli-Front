import { useNavigate } from "react-router-dom";
import "../css/Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <main className="home">
      <section className="home-container">

        <div className="home-logo">
          <h1>
            VetNelli <span>🐾</span>
          </h1>

          <p>
            Sistema de gerenciamento de consultas veterinárias.
          </p>
        </div>

        <div className="home-content">
          <button
            className="btn-entrar"
            onClick={() => navigate("/consultas")}
          >
            Entrar no sistema
          </button>
        </div>

      </section>
    </main>
  );
}

export default Home;