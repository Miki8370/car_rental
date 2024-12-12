import { useState } from "react";
import axios from "axios";


const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
        const response = await axios.post("http://127.0.0.1:8000/api/token/", formData);

        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);



        setMessage("Login succesful!");
        console.log(response.data);
        
        } catch (error){
        setMessage("Login error");
        console.error(error.response.data);
        }
    };

    return(
        <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
        <div>
            <label>Username:</label>
            <input 
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required/>
        </div>

        <div>
            <label>Password:</label>
            <input 
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value})}
            required
            />
        </div>

        <button type="submit">Login</button>
        
        </form>
        {message && <p>{message}</p>}
        </div>
    );

}

export default Login;