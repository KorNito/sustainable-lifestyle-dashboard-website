import React, { useState, useEffect } from "react";
import "./ViewChallenges.css";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";
import Challenge from "./Challenge";

const ViewChallenges = () => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    onValue(ref(db, "challenges"), (snapshot) => {
      const challenges = snapshot.val();
      let challengesList = [];

      for (let id in challenges) {
        challengesList.push({ id, ...challenges[id] });
      }

      setChallenges(challengesList);
    });
  }, []);

  let content = <p>loading...</p>;

  if (challenges.length > 0) {
    content = Object.keys(challenges).map((key) => (
      <tr key={key}>
        <Challenge challenge={challenges[key]} />
      </tr>
    ));
  }

  return (
    <table className="challenges">
      <thead>
        <tr>
          <th>Challenge Name</th>
          <th>Points</th>
          <th>Start date</th>
          <th>End date</th>
        </tr>
      </thead>
      <tbody>{content}</tbody>
    </table>
  );
};
export default ViewChallenges;
