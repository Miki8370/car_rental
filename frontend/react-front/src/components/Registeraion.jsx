import { useState } from "react";
import axios from "axios";

const Registeration = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password1: "",
        password2: "",
    });

    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.post("http://127.0.0.1:8000/api/auth/registration/", formData);
        
        setMessage("Registration successful! You can now log in.");
        console.log(response.data); // Tokens or other registration response data
        } catch (error) {
        setMessage("Registration failed. Please check the form and try again.");
        console.error(error.response.data); // Debugging response
        }
    };

    return (
        <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <div>
            <label>Username:</label>
            <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
            />
            </div>
            <div>
            <label>Email:</label>
            <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
            />
            </div>
            <div>
            <label>Password:</label>
            <input
                type="password"
                value={formData.password1}
                onChange={(e) => setFormData({ ...formData, password1: e.target.value })}
                required
            />
            </div>
            <div>
            <label>Confirm Password:</label>
            <input
                type="password"
                value={formData.password2}
                onChange={(e) => setFormData({ ...formData, password2: e.target.value })}
                required
            />
            </div>
            <button type="submit">Register</button>
        </form>
        {message && <p>{message}</p>}
        </div>
    );
    };

    export default Registeration;
