import { BrowserRouter}  from "react-router-dom";
import {Routes , Route}  from "react-router-dom";
import CadastroUsuarios from "../Pages/CadastroUsuario/index";
import CadastroPlataforma from "../Pages/CadastroProcesso";
import ListagemUsuarios from "../Pages/ListagemUsuario";
import ListagemProcesso from "../Pages/ListagemProcesso";
import Dashbord from "../Pages/DashboardGeral";
import Update_Participante from "../Pages/Update_Participante";
import Update_Processo from "../Pages/Update_Processo";


export default function Routas () {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/cadastroUsuario" element={<CadastroUsuarios/>} />
            <Route path="/cadastroProcesso" element={<CadastroPlataforma/>} />
            <Route path="/listagemUsuario" element={<ListagemUsuarios/>} />
            <Route path="/EditarPar/:id" element={<Update_Participante/>} />
            <Route path="/EditarProces/:id" element={<Update_Processo/>} />
            <Route path="/listagemProcesso" element={<ListagemProcesso/>} />
            <Route path="/Dashboard" element={<Dashbord/>} />
            <Route path="*" element={<Dashbord/>} />
        </Routes>
        </BrowserRouter>

    )
        
}