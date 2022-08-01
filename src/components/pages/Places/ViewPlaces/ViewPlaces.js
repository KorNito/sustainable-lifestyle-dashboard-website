import React, { useState, useEffect } from "react";
import "./ViewPlaces.css";
import { db } from "../../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Place from "../../Places/Place/Place";
import "./ViewPlaces.css";

const ViewRewards = () => {
  const [places, setPlaces] = useState([]);
  const placesRef = collection(db, "places");

  useEffect(() => {
    const getPlaces = async () => {
      const data = await getDocs(placesRef);
      setPlaces(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPlaces();
  }, []);

  let content = <p>loading...</p>;

  if (places.length > 0) {
    content = places.map((place) => (
      <tr key={place.id}>
        <Place place={place} />
      </tr>
    ));
  }

  return (
    <table className="places">
      <thead>
        <tr>
          <th>Place Name</th>
          <th>Longitude</th>
          <th>Latitude</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{content}</tbody>
    </table>
  );
};

export default ViewRewards;
