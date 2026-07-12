import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../auth/UseAuth';
import '../../css/auth/Auth.css';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [error, setError] = useState(null);
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await login(email, senha);
            navigate('/consultas');
        } catch (error) {
            setError('Email ou senha incorretos.', error);
        }
    };

    return (
        <main className="auth-page">
            <section className="auth-container">
                <h2>VetNelli <span>🐾</span></h2>

                {error && (
                    <p className="error-message" role="alert">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} aria-label="Formulário de login">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu@email.com"
                            autoComplete="email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="senha">Senha</label>
                        <div className="input-senha-wrapper">
                            <input
                                type={mostrarSenha ? 'text' : 'password'}
                                id="senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                placeholder="••••••"
                                autoComplete="current-password"
                                required
                            />
                            <button
                                type="button"
                                className="btn-olho"
                                onClick={() => setMostrarSenha(!mostrarSenha)}
                                aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                            >
                                {mostrarSenha ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="auth-submit"
                        disabled={loading}
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>

                <p>
                    Não tem uma conta?{' '}
                    <Link to="/register">Cadastre-se</Link>
                </p>
            </section>
        </main>
    );
}

export default Login;