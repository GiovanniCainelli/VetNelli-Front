import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import { useAuth } from "./auth/UseAuth";

import Home from "./pages/Home";
import Consultas from "./pages/Consultas";
import CadastrarConsulta from "./pages/CadastrarConsulta";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function PrivateRoute({ children }) {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
}

function AppRoutes() {
    return (
        <Routes>
            =
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />


            <Route path="/" element={
                <PrivateRoute><Home /></PrivateRoute>
            } />
            <Route path="/consultas" element={
                <PrivateRoute><Consultas /></PrivateRoute>
            } />
            <Route path="/cadastrarConsulta" element={
                <PrivateRoute><CadastrarConsulta /></PrivateRoute>
            } />
        </Routes>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;