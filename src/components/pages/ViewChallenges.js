import React, { useState, useEffect, useCallback } from "react";
import { db } from "../../firebase";
import { set, ref, onValue, remove, update, query } from "firebase/database";
import Challenge from "./Challenge";

const ViewChallenges = () => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const challenges = snapshot.val();
      let challengesList = [];

      Object.keys(challenges).map((key) =>
        Object.keys(challenges[key]).map((property) =>
          challengesList.push(challenges[key][property])
        )
      );

      setChallenges(challengesList);
    });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Challenge Name</th>
          <th>Points</th>
          <th>Start date</th>
          <th>End date</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(challenges).map((key) => (
          <tr key={key}>
            <Challenge challenge={challenges[key]} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default ViewChallenges;
