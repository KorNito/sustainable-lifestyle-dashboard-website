import React, { useState, useEffect } from "react";
import "./ViewChallenges.css";
import { db } from "../../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Challenge from "../../Challenges/Challenge/Challenge";

const ViewChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const challengesRef = collection(db, "challenges");

  useEffect(() => {
    const getChallenges = async () => {
      const data = await getDocs(challengesRef);
      setChallenges(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getChallenges();
  }, []);

  let content = <p>loading...</p>;

  if (challenges.length > 0) {
    content = challenges.map((challenge) => (
      <tr key={challenge.id}>
        <Challenge challenge={challenge} />
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
          <th></th>
        </tr>
      </thead>
      <tbody>{content}</tbody>
    </table>
  );
};

export default ViewChallenges;
