import { useState } from "react";
import { useNavigate } from "react-router-dom";

// basic login form
function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const handleLogin = async (e) => {
        // prevents page from refreshing on submit
        e.preventDefault();
        
        // connect route
        try {
            const res = await fetch(`${backendUrl}/api/auth/login`, {
                
                // POST request, sending data
                method: 'POST',

                // this says we are sending JSON data, so it can be parsed (the username and password)
                headers: { 'Content-Type': 'application/json' },

                // converts the JS object into a JSON string, this is req.body = { username, password }
                body: JSON.stringify({ username, password }),
            });

            // parse the json response that we get back from the server. (check authRoutes.js to see what its up to)
            const data = await res.json();

            // res.ok is status between 200-299, so if its not between that, we just throw an error
            if(!res.ok) throw new Error(data.error);

            console.log('Login successful:', data);

            // store the token if sent.
            if (data.token) {
                localStorage.setItem('token', data.token);
            }

            // handle going to new page
            navigate('/home');
            

        } catch (err) {
            console.error('Login error:', err.message);
        }
    }

    return (
        <div className="auth-container">
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="auth-button" type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginForm;
