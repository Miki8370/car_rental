import Home from "./components/Home"
import Cars from "./components/Cars"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Registeration from "./components/Registeraion"



function App() {

  return (
    <>
    <ToastContainer />

<Router>
  <div>
    <ul>
      <li>
      <Link to="/login">Login</Link>
      </li>
      <li>
      <Link to="/registeration">Registeration</Link>
      </li>
    </ul>
  </div>
      <Routes>
      <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/registeration" element={<Registeration />} />
        <Route path="/" element={<Cars />} />
      </Routes>
    </Router>
    {/* <Home /> */}
    {/* <Cars /> */}
    </>
  )
}

export default App
