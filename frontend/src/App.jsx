import Admin from "./Pages/Admin";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {
 
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/home" element={<Home />} />
    <Route path="/admin" element={<Admin />} />
    
    </Routes>
    </BrowserRouter>
  );
}

export default App
