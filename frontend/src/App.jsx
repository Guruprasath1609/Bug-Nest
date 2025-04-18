import Admin from "./Pages/Admin";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AboutPage from "./Pages/AboutPage";
import RegisterPage from "./Pages/RegisterPage";
import "./index.css";

function App() {
 
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<AboutPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/home" element={<Home />} />
    <Route path="/admin" element={<Admin />} />
    
    </Routes>
    </BrowserRouter>
  );
}

export default App
