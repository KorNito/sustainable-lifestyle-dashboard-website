import React from "react";
import { db } from "../../firebase";
import { ref, remove } from "firebase/database";

const Place = ({ place }) => {
  const deleteChallenge = (placeId) => {
    remove(ref(db, `places/${placeId}`));
  };

  return (
    <>
      <td>{place.placeName}</td>
      <td>{place.longitude}</td>
      <td>{place.latitude}</td>
      <td>
        <button
          className="btn btn-delete"
          onClick={() => deleteChallenge(place.id)}
        >
          Delete
        </button>
      </td>
    </>
  );
};

export default Place;
