import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Navbar";
import Home from "./components/pages/Home";
import NoPage from "./components/pages/NoPage";
import CreateChallenge from "./components/pages/CreateChallenge";
import ViewChallenges from "./components/pages/ViewChallenges";
import CreateReward from "./components/pages/CreateReward";
import ViewRewards from "./components/pages/ViewRewards";
import CreatePlace from "./components/pages/CreatePlace";
import ViewPlaces from "./components/pages/ViewPlaces";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="create-challenge" element={<CreateChallenge />} />
          <Route path="view-challenges" element={<ViewChallenges />} />
          <Route path="create-reward" element={<CreateReward />} />
          <Route path="view-rewards" element={<ViewRewards />} />
          <Route path="create-place" element={<CreatePlace />} />
          <Route path="view-places" element={<ViewPlaces />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
