import axios from "axios";

const Logout = () => {
    const handleLogout = async () => {
        try {
            // Call the logout endpoint
            await axios.post("http://127.0.0.1:8000/api/auth/logout/", {}, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // Clear local data (optional, depending on your use of tokens/storage)
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            alert("Logged out successfully!");
        } catch (error) {
            console.error("Logout error:", error.response?.data || error.message);
            alert("An error occurred during logout. Please try again.");
        }
    };

    return (
        <div>
            <h1>Logout</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
