import React, { useState } from "react";
import { db } from "../../../../firebase";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import "./CustomChallenge.css";

const CustomChallenge = ({ customChallenge }) => {
  const [status, setStatus] = useState(null);
  const [likedAChallenge, setLikedAChallenge] = useState(false);
  const [dislikedAChallenge, setDislikedAChallenge] = useState(false);

  const handleLikeClick = async (id, likes, dislikes) => {
    let docRef = doc(db, "customChallenges", id);
    let likeData = 0;
    let dislikeData = 0;

    if (status === "like") {
      setStatus(null);
      likeData = { likes: likes - 1 };
      await updateDoc(docRef, likeData);
    } else {
      setStatus("like");
      likeData = { likes: likes + 1 };
      await updateDoc(docRef, likeData);
      if (status == "dislike") {
        dislikeData = { dislikes: dislikes - 1 };
        await updateDoc(docRef, dislikeData);
      }
    }
  };

  const handleDislikeClick = async (id, dislikes, likes) => {
    let docRef = doc(db, "customChallenges", id);
    let dislikeData = 0;
    let likeData = 0;

    if (status === "dislike") {
      setStatus(null);
      dislikeData = { dislikes: dislikes - 1 };
      await updateDoc(docRef, dislikeData);
    } else {
      setStatus("dislike");
      dislikeData = { dislikes: dislikes + 1 };
      await updateDoc(docRef, dislikeData);
      if (status === "like") {
        likeData = { likes: likes - 1 };
        await updateDoc(docRef, likeData);
      }
    }
  };

  const deleteCustomChallenge = async (challengeId) => {
    const challengeToDelete = doc(db, "customChallenges", challengeId);
    await deleteDoc(challengeToDelete);
  };

  return (
    <>
      <td>{customChallenge.category}</td>
      <td>{customChallenge.name}</td>
      <td>
        <button
          className={status === "like" ? "btn active" : "btn"}
          onClick={() =>
            handleLikeClick(
              customChallenge.id,
              customChallenge.likes,
              customChallenge.dislikes
            )
          }
        >
          Like <span>{customChallenge.likes}</span>
        </button>
      </td>
      <td>
        {Math.floor(
          (100 * customChallenge.likes) /
            (customChallenge.likes + customChallenge.dislikes)
        )}{" "}
        %
      </td>
      <td>
        <button
          className={status === "dislike" ? "btn active" : "btn"}
          onClick={() =>
            handleDislikeClick(
              customChallenge.id,
              customChallenge.dislikes,
              customChallenge.likes
            )
          }
        >
          Dislike <span>{customChallenge.dislikes}</span>
        </button>
      </td>
      <td>
        <button
          className="delete-button"
          onClick={() => deleteCustomChallenge(customChallenge.id)}
        >
          Delete
        </button>
      </td>
    </>
  );
};

export default CustomChallenge;
