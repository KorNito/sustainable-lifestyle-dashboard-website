import React from "react";
import { db } from "../../../../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import "./Place.css";

const Place = ({ place }) => {
  const deleteChallenge = async (placeId) => {
    const placeToDelete = doc(db, "places", placeId);
    await deleteDoc(placeToDelete);
  };

  return (
    <>
      <td>{place.placeName}</td>
      <td>{place.longitude}</td>
      <td>{place.latitude}</td>
      <td>
        <button
          className="delete-button"
          onClick={() => deleteChallenge(place.id)}
        >
          Delete
        </button>
      </td>
    </>
  );
};

export default Place;
