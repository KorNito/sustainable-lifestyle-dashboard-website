import React, { useState, useEffect } from "react";
import "./ViewCustomChallenges.css";
import { db } from "../../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import CustomChallenge from "../../Challenges/CustomChallenge/CustomChallenge";

const ViewCustomChallenges = () => {
  const [customChallenges, setCustomChallenges] = useState([]);
  const customChallengesRef = collection(db, "customChallenges");

  useEffect(() => {
    const getCustomChallenges = async () => {
      const data = await getDocs(customChallengesRef);
      setCustomChallenges(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    getCustomChallenges();
  }, [customChallengesRef]);

  let content = <p>loading...</p>;

  if (customChallenges.length > 0) {
    content = customChallenges.map((customChallenge) => (
      <tr key={customChallenge.id}>
        <CustomChallenge customChallenge={customChallenge} />
      </tr>
    ));
  }

  return (
    <table className="rewards">
      <thead>
        <tr>
          <th>Sustainable lifestyle category</th>
          <th>Challenge name</th>
          <th></th>
          <th>Approval</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>{content}</tbody>
    </table>
  );
};

export default ViewCustomChallenges;
