import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000"; // Backend URL

// Login API
export const login = async (username, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login/`, {
        username,
        password,
        });
        const { access, refresh } = response.data;
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

    // Logout API
export const logout = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    };

    // Registration API
export const register = async (username, email, password1, password2) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/registration/`, {
        username,
        email,
        password1,
        password2,
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
