import React, { useState, useEffect } from "react";
// import "./ViewRewards.css";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";
import Reward from "./Reward";

const ViewRewards = () => {
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    onValue(ref(db, "rewards"), (snapshot) => {
      const rewards = snapshot.val();
      let rewardsList = [];

      for (let id in rewards) {
        rewardsList.push({ id, ...rewards[id] });
      }

      console.log("debug rewards" + rewards);
      setRewards(rewardsList);
    });
  }, []);

  let content = <p>loading...</p>;

  if (rewards.length > 0) {
    content = Object.keys(rewards).map((key) => (
      <tr key={key}>
        <Reward reward={rewards[key]} />
      </tr>
    ));
  }

  return (
    <table className="rewards">
      <thead>
        <tr>
          <th>Reward Name</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>{content}</tbody>
    </table>
  );
};

export default ViewRewards;
