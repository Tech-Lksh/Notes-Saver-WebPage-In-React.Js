import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Paste from "./components/Paste";
import ViewPaste from "./components/ViewPaste";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route 
        path="/" 
        element={<Home />} 
        />
        <Route 
        path="/paste" 
        element={<Paste />} 
        />
        <Route 
        path="/paste/id:" 
        element={<ViewPaste />} 
        />
      </Routes>
    </div>
  );
};

export default App;
