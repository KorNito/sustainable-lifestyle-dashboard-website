import React from "react";
import { db } from "../../firebase";
import { ref, remove } from "firebase/database";

const Reward = ({ reward }) => {
  const deleteReward = (rewardId) => {
    remove(ref(db, `rewards/${rewardId}`));
  };

  return (
    <>
      <td>{reward.rewardName}</td>
      <td>{reward.points}</td>
      <td>
        <button
          className="btn btn-delete"
          onClick={() => deleteReward(reward.id)}
        >
          Delete
        </button>
      </td>
    </>
  );
};

export default Reward;
