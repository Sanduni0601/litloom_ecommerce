import Homepage from './Components/HomePage';
import RegisterForm from './Components/RegisterForm';
import Header from './Components/Header';
import Login from './Components/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;
