import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Navbar";
import Home from "./components/pages/Home";
import Challenges from "./components/pages/Challenges";
import Rewards from "./components/pages/Rewards";
import NoPage from "./components/pages/NoPage";
import CreateChallenge from "./components/pages/CreateChallenge";
import ViewChallenges from "./components/pages/ViewChallenges";
import CreateReward from "./components/pages/CreateReward";
import ViewRewards from "./components/pages/ViewRewards";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="challenges" element={<Challenges />} />
          <Route path="rewards" element={<Rewards />} />
          <Route path="create-challenge" element={<CreateChallenge />} />
          <Route path="view-challenges" element={<ViewChallenges />} />
          <Route path="create-reward" element={<CreateReward />} />
          <Route path="view-rewards" element={<ViewRewards />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
