import { BrowserRouter,Routes,Route } from "react-router-dom";

import Home from "./pages/Home";
import Consultas from "./pages/Consultas";
import CadastrarConsulta from "./pages/CadastrarConsulta";

function App() {

return (

    <BrowserRouter>
        <Routes>

            <Route path="/" element={<Home/>}/>
            <Route path="/consultas" element={<Consultas/>}/>
            <Route path="/cadastrarConsulta" element={<CadastrarConsulta/>}/>

            </Routes>
    </BrowserRouter>
);

}

export default App;