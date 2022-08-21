import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/pages/Login/Login";
import SignUp from "./components/pages/SignUp/SignUp";
import Home from "./components/pages/Home";
import NoPage from "./components/pages/NoPage";
import CreateChallenge from "./components/pages//Challenges/CreateChallenge/CreateChallenge";
import ViewChallenges from "./components/pages/Challenges/ViewChallenges/ViewChallenges";
import CreateReward from "./components/pages//Rewards/CreateReward/CreateReward";
import ViewRewards from "./components/pages/Rewards/ViewRewards/ViewRewards";
import CreatePlace from "./components/pages/Places/CreatePlace/CreatePlace";
import ViewPlaces from "./components/pages/Places/ViewPlaces/ViewPlaces";
import CreateCustomChallenge from "./components/pages/Challenges/CreateCustomChallenge/CreateCustomChallenge";
import ViewCustomChallenges from "./components/pages/Challenges/ViewCustomChallenges/ViewCustomChallenges";
import { UserContext } from "./context/UserContext";

function App() {
  let localStorageUser = localStorage.getItem("user");

  useEffect(() => {
    setCurrentUser(localStorageUser);
  }, [localStorageUser]);

  const [currentUser, setCurrentUser] = useState();

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Router>
        <Routes>
          {currentUser ? (
            <Route path="/" element={<Navbar />}>
              <Route index element={<Home />} />
              <Route path="create-challenge" element={<CreateChallenge />} />
              <Route path="view-challenges" element={<ViewChallenges />} />
              <Route
                path="create-custom-challenge"
                element={<CreateCustomChallenge />}
              />
              <Route
                path="view-custom-challenges"
                element={<ViewCustomChallenges />}
              />
              <Route path="create-reward" element={<CreateReward />} />
              <Route path="view-rewards" element={<ViewRewards />} />
              <Route path="create-place" element={<CreatePlace />} />
              <Route path="view-places" element={<ViewPlaces />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          ) : (
            <Route path="/" element={<Login />} />
          )}
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
