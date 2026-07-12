import api from '../services/api';

const AuthService = {
    async register(nome, email, senha, role) {
        try {
            const response = await api.post('/auth/register', { nome, email, senha, role });
            return response.data;
        } catch (error) {
            throw error.response.data || error.message;
        }
    },

    async login(email, senha) {
        try {
            const response = await api.post('/auth/login', { email, senha });
            return response.data;
        } catch (error) {
            throw error.response.data || error.message;
        }
    },


};

export default AuthService;
