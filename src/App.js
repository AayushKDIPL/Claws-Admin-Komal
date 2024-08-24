import logo from './logo.svg';
import './App.css';
import Home from './components/Main';
import AddProduct from './components/AddProduct';
import AllProduct from './components/AllProduct';
import Category from './components/Category';
import Subcategory from './components/Subcategory';
import DetailPage from './components/DetailPage';
import Edit from './components/Edit';
import ShowCate from './components/ShowCate';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
     
    <Route path="/" element={<Home />} exact />
    <Route path="/new" element={<AddProduct/>} exact />
    <Route path="/product" element={<AllProduct/>} exact />
    <Route path="/category" element={<Category/>} exact />
    <Route path="/category/subcategory" element={<Subcategory/>} exact />
    <Route path="/detail" element={<DetailPage/>} exact />
    <Route path="/edit" element={<Edit/>} exact />
    <Route path="/showcate" element={<ShowCate/>} exact />
       
    </Routes>
    </BrowserRouter>
  );
}

export default App;
