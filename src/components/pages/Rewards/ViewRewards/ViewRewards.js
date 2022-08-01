import React, { useState, useEffect } from "react";
import "./ViewRewards.css";
import { db } from "../../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Reward from "../../Rewards/Reward/Reward";

const ViewRewards = () => {
  const [rewards, setRewards] = useState([]);
  const rewardsRef = collection(db, "rewards");

  useEffect(() => {
    const getRewards = async () => {
      const data = await getDocs(rewardsRef);
      setRewards(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getRewards();
  }, []);

  let content = <p>loading...</p>;

  if (rewards.length > 0) {
    content = rewards.map((reward) => (
      <tr key={reward.id}>
        <Reward reward={reward} />
      </tr>
    ));
  }

  return (
    <table className="rewards">
      <thead>
        <tr>
          <th>Reward Name</th>
          <th>Points</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{content}</tbody>
    </table>
  );
};

export default ViewRewards;
