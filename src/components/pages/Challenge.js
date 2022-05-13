import React from "react";

const Challenge = ({ challenge }) => {
  return (
    <>
      <td>{challenge.challengeName}</td>
      <td>{challenge.points}</td>
      <td>{challenge.startDate}</td>
      <td>{challenge.endDate}</td>
      <td>
        <button>Delete</button>
      </td>
    </>
  );
};

export default Challenge;
