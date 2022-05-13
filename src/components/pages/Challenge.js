import React from "react";
import { db } from "../../firebase";
import { ref, remove } from "firebase/database";

const Challenge = ({ challenge }) => {
  const deleteChallenge = (challengeId) => {
    remove(ref(db, `challenges/${challengeId}`));
  };

  return (
    <>
      <td>{challenge.challengeName}</td>
      <td>{challenge.points}</td>
      <td>{challenge.startDate}</td>
      <td>{challenge.endDate}</td>
      <td>
        <button onClick={() => deleteChallenge(challenge.id)}>Delete</button>
      </td>
    </>
  );
};

export default Challenge;
