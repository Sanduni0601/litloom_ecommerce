import Homepage from './Components/HomePage';
import RegisterForm from './Components/RegisterForm';
import Header from './Components/Header';
import Login from './Components/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddForm from './Components/AddForm';
import BookList from './Components/BookList';
import BookDetail from './Components/BookDetail';
import Cart from './Components/Cart';
import ContactUs from './Components/Contact';
import AdminDashboard from './Components/AdminDashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<Login/>} />
      <Route path='/book' element = {<AddForm/>}/>
      <Route path = '/booklist' element={<BookList/>}/>
      <Route path='/books/:bookId' element={<BookDetail/>}/>
     <Route path='/cart' element={<Cart/>}/>
     <Route path='/contact' element={<ContactUs/>}/>
     <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
