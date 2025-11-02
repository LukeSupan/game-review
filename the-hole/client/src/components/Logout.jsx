import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // get rid of JWT and take us home
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <button className="logout-button" onClick={handleLogout}>
            Log out
        </button>
    );
}
