/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/UseAuth';
import "../../css/auth/Auth.css"

function Register() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [role, setRole] = useState('FUNCIONARIO');
    const [error, setError] = useState(null);
    const { register, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await register(nome, email, senha, role);
            navigate('/consultas');
        } catch (err) {
            setError(err.message || 'Erro ao fazer cadastro. Tente novamente.');
        }
    };


    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>VetNelli <span>🐾</span></h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nome">Nome</label>
                        <input type="text" id="nome" value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Seu nome completo" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu@email.com" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="senha">Senha</label>
                        <input type="password" id="senha" value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            placeholder="••••••" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Função</label>
                        <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="FUNCIONARIO">Funcionário</option>
                            <option value="ADMIN">Administrador</option>
                        </select>
                    </div>
                    <button className="auth-submit" type="submit" disabled={loading}>
                        {loading ? 'Cadastrando...' : 'Cadastrar'}
                    </button>
                </form>
                <p>Já tem uma conta? <a href="/login">Entrar</a></p>
            </div>
        </div>
    );
}

export default Register;