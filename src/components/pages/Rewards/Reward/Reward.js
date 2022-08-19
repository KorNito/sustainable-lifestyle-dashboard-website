import React from "react";
import { db } from "../../../../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import "./Rewards.css";

const Reward = ({ reward }) => {
  const deleteReward = async (rewardId) => {
    const rewardToDelete = doc(db, "rewards", rewardId);
    await deleteDoc(rewardToDelete);
  };

  return (
    <>
      <td>{reward.rewardName}</td>
      <td>{reward.points}</td>
      <td>
        <button
          className="delete-button"
          onClick={() => deleteReward(reward.id)}
        >
          Delete
        </button>
      </td>
    </>
  );
};

export default Reward;
