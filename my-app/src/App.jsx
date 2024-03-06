import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/login/login";
import Mainpage from "./components/Mainpage/Mainpage";
import Navbar from "./components/Navbar/Navbar";
import Cards from "./components/cards/Cards";
//import Web3 from 'web3' ; 

function App() {
  return (

    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Booking" element={<Mainpage />} />
    </Routes>
  
     

  );
}

export default App;
