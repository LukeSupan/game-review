import "./Auth.css";
import { useState } from "react";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";
import Welcome from "../../components/Welcome";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="auth-page">
            <Welcome />
            <LoginForm />
            <RegisterForm />
        </div>
    );
}
