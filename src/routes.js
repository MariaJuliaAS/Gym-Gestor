import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginApp from "./Pages/Login";
import Matricula from "./Pages/Matricula";
import Cadastro from "./Pages/Cadastro";
import VerMatriculas from "./Pages/VerMatriculas";

function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <LoginApp/> }/>
                <Route path="/matricula" element={ <Matricula/> }/>
                <Route path="/cadastrar" element={ <Cadastro/> }/>
                <Route path="/verMatriculas" element={ <VerMatriculas/> }/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;