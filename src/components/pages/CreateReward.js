import React, { useState } from "react";
import "./CreateReward.css";
import useInput from "../../hooks/use-input";

const isNotEmpty = (value) => value.trim() !== "";

const CreateReward = () => {
  const [isSending, setIsSending] = useState(false);

  const {
    value: rewardNameValue,
    isValid: rewardNameIsValid,
    hasError: rewardNameHasError,
    valueChangeHandler: rewardNameChangeHandler,
    inputBlurHandler: rewardNameBlurHandler,
    reset: resetChallengeName,
  } = useInput(isNotEmpty);

  const {
    value: pointsValue,
    isValid: pointsIsValid,
    hasError: pointsHasError,
    valueChangeHandler: pointsChangeHandler,
    inputBlurHandler: pointsBlurHandler,
    reset: resetPoints,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (rewardNameIsValid && pointsIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    setIsSending(true);

    fetch(
      "https://sustainable-lifestyle-30c7b-default-rtdb.europe-west1.firebasedatabase.app/rewards.json",
      {
        method: "POST",
        body: JSON.stringify({
          rewardName: rewardNameValue,
          points: pointsValue,
        }),
      }
    );

    setIsSending(false);

    resetChallengeName();
    resetPoints();
  };

  return (
    <div className="createRewardContainer">
      <form onSubmit={submitHandler}>
        <h1>Create a reward</h1>
        <label htmlFor="name">Reward name</label>
        <input
          type="text"
          id="name"
          value={rewardNameValue}
          onChangeCapture={rewardNameChangeHandler}
          onBlur={rewardNameBlurHandler}
        />
        {rewardNameHasError && <p>Please enter reward name</p>}
        <label htmlFor="points">Points</label>
        <input
          type="text"
          id="points"
          value={pointsValue}
          onChangeCapture={pointsChangeHandler}
          onBlur={pointsBlurHandler}
        />
        {pointsHasError && <p>Please enter points</p>}
        {isSending ? (
          <button disabled>Creating challenge...</button>
        ) : (
          <button disabled={!formIsValid} type="Submit">
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default CreateReward;
