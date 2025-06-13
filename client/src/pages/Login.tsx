import { useState } from "react";
import { loginUser } from "../api/auth";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async (e: React.FormEvent) =>{
        e.preventDefault();
        const res = await loginUser(username, password);
        if(res.success && res.token){
            alert("登録に成功しました！");
            localStorage.setItem("token", res.token);
            localStorage.setItem("username", username);
            window.location.href = "/dashboard";
        }else{
            alert("ログインに失敗しました\n" + res.message);
        }
    }
    return(
        <div>
            <h2>ログイン</h2>
            <input
                type = "text"
                placeholder = "ユーザー名"
                value = {username}
                onChange = {(e) => setUsername(e.target.value)}
            />
            <br />
            <input
                type = "password"
                placeholder = "パスワード"
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
            />
            <br />
            <button onClick={handleLogin}>ログイン</button>
            <br />
            <br />
            <a href="/">TOPへ</a>
        </div>
    );
}
export default Login;