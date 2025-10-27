import { useState } from "react";

// basic login form
function RegisterForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const handleRegister = async (e) => {
        // prevents page from refreshing on submit
        e.preventDefault();
        
        // connect route
        try {
            const res = await fetch(`${backendUrl}/api/register`, {
                
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

            console.log('Register successful:', data);

            // we would handle going to the new page now but, i dont have one those currently
            

        } catch (err) {
            console.error('Register error:', err.message);
        }
    }

    return (
        <form onSubmit={handleRegister}>
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
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default RegisterForm;
