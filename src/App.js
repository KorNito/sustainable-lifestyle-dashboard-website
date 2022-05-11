import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Pages/Home";
import Challenges from "./components/Pages/Challenges";
import Rewards from "./components/Pages/Rewards";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact component={Home} />
        <Route path="/challenges" exact component={Challenges} />
        <Route path="/rewards" exact component={Rewards} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
