import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useAuth } from "./hooks/useAuth";

function App(){
    const token = localStorage.getItem("token");
    const isAuthenticated = !!token;

    return(
        <BrowserRouter>
        <Routes>
            <Route path = "/" element = {<Home />}/>
            <Route path = "/login" element = {<Login />}/>
            <Route path = "/register" element = {<Register />}/>
            <Route
                path = "/dashboard" 
                element = {isAuthenticated ? <Dashboard /> : <Navigate to = "/" />}
            />
        </Routes>
        </BrowserRouter>
    );
}
function Home(){
    return(
        <div>
            <h1>ようこそ！</h1> <br/>
            <a href="/login">ログイン</a>
            <br/><br/>
            <a href="/register">アカウント登録</a>
        </div>
    )
}
export default App;
