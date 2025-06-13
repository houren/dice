import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        const res = await registerUser(username, password);
        if(res.success){
            alert("登録に成功しました！");
            navigate("/login");
        }else{
            alert("登録に失敗しました\n" + res.message);
        }
    }
    return(
        <div>
            <h2>ユーザー登録</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">登録</button>
            </form>
            <br />
            <br />
            <a href="/">TOPへ</a>
        </div>
    );
}
export default Register;