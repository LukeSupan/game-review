import React, { useState } from "react";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";
import Welcome from "../../components/Welcome";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div>
            <Welcome />
            <LoginForm />
            <RegisterForm />
        </div>
    );
}
