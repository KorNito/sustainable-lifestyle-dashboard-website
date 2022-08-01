import React from "react";
import { db } from "../../../../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import "./Challenge.css";

const Challenge = ({ challenge }) => {
  const deleteChallenge = async (challengeId) => {
    const challengeToDelete = doc(db, "challenges", challengeId);
    await deleteDoc(challengeToDelete);
    window.location.reload();
  };

  return (
    <>
      <td>{challenge.challengeName}</td>
      <td>{challenge.points}</td>
      <td>{challenge.startDate}</td>
      <td>{challenge.endDate}</td>
      <td>
        <button
          className="delete-button"
          onClick={() => deleteChallenge(challenge.id)}
        >
          Delete
        </button>
      </td>
    </>
  );
};

export default Challenge;
