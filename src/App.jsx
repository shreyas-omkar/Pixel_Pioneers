import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import Products from './Pages/Products'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import Checkout from './Pages/Checkout'
import Appointment from './Pages/Appointment'
import Thanks from './Pages/Thanks'
import Login from './Pages/Login'
import Register from './Pages/Register'

function App() {

  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:_id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/thanks" element={<Thanks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
