import { useState } from "react";
import { register } from "/services/authService";
import { toast } from "react-toastify";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
        await register(username, email, password1, password2);
        toast.success("Registration successful!");
        // Redirect to login
        } catch (error) {
        toast.error(error?.non_field_errors || "Registration failed!");
        }
    };

    return (
        <div>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
            <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            <input
            type="password"
            placeholder="Password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            required
            />
            <input
            type="password"
            placeholder="Confirm Password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
            />
            <button type="submit">Register</button>
        </form>
        </div>
    );
};

export default Register;
