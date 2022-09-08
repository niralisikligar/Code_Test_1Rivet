import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Navbar from "./Component/Navbar";
import Home from "./Component/Home";
import AddInterest from "./Component/AddInterest";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/add/:id" element={<AddInterest />} />
        {/* <Route path="/add" element={<AddInterest />} /> */}
     
      </Routes>
    </>
  );
}

export default App;
