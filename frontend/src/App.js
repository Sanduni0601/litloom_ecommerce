import Homepage from './Components/HomePage';
import RegisterForm from './Components/RegisterForm';
import Header from './Components/Header';
import Login from './Components/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddForm from './Components/AddForm';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<Login/>} />
      <Route path='/book' element = {<AddForm/>}/>
      </Routes>
    </Router>
  );
}

export default App;
