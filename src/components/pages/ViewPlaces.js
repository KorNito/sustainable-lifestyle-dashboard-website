import React, { useState, useEffect } from "react";
import "./ViewPlaces.css";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";
import Place from "./Place";
import "./ViewPlaces.css";

const ViewRewards = () => {
  const [places, setRewards] = useState([]);

  useEffect(() => {
    onValue(ref(db, "places"), (snapshot) => {
      const places = snapshot.val();
      let placesList = [];

      for (let id in places) {
        placesList.push({ id, ...places[id] });
      }

      console.log("debug places" + places);
      setRewards(placesList);
    });
  }, []);

  let content = <p>loading...</p>;

  if (places.length > 0) {
    content = Object.keys(places).map((key) => (
      <tr key={key}>
        <Place place={places[key]} />
      </tr>
    ));
  }

  return (
    <table className="places">
      <thead>
        <tr>
          <th>Reward Name</th>
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
