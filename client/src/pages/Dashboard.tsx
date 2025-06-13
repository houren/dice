import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem("username");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/");
    };

    return (
        <div>
            <p>ようこそ、{username}さん！</p>
            <h4>まだなにもないよ</h4>
            <button onClick={handleLogout}>ログアウト</button>
        </div>
    );
};

export default Dashboard;
