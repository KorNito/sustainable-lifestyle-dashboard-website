import React, { useState } from "react";
import "./CreateChallenge.css";
import useInput from "../../hooks/use-input";

const isNotEmpty = (value) => value.trim() !== "";

const CreateChallenge = () => {
  const [isSending, setIsSending] = useState(false);
  const [created, setCreated] = useState(false);

  const {
    value: challengeNameValue,
    isValid: challengeNameIsValid,
    hasError: challengeNameHasError,
    valueChangeHandler: challengeNameChangeHandler,
    inputBlurHandler: challengeNameBlurHandler,
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

  const {
    value: startDateValue,
    isValid: startDateIsValid,
    hasError: startDateHasError,
    valueChangeHandler: startDateChangeHandler,
    inputBlurHandler: startDateBlurHandler,
    reset: resetStartDate,
  } = useInput(isNotEmpty);

  const {
    value: endDateValue,
    isValid: endDateIsValid,
    hasError: endDateHasError,
    valueChangeHandler: endDateChangeHandler,
    inputBlurHandler: endDateBlurHandler,
    reset: resetEndDate,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (
    challengeNameIsValid &&
    pointsIsValid &&
    startDateIsValid &&
    endDateIsValid
  ) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    setIsSending(true);
    setCreated(true);

    fetch(
      "https://sustainable-lifestyle-30c7b-default-rtdb.europe-west1.firebasedatabase.app/challenges.json",
      {
        method: "POST",
        body: JSON.stringify({
          challengeName: challengeNameValue,
          points: pointsValue,
          startDate: startDateValue,
          endDate: endDateValue,
        }),
      }
    );

    resetChallengeName();
    resetPoints();
    resetStartDate();
    resetEndDate();

    setTimeout(() => {
      setCreated(false);
      setIsSending(false);
    }, 2000);
  };

  return (
    <div className="createChallengeContainer">
      <form onSubmit={submitHandler}>
        <h1>Create a challenge</h1>
        {created && <div>Challenge created</div>}
        <label htmlFor="name">Challenge name</label>
        <input
          type="text"
          id="name"
          value={challengeNameValue}
          onChangeCapture={challengeNameChangeHandler}
          onBlur={challengeNameBlurHandler}
        />
        {challengeNameHasError && <p>Please enter challenge name</p>}

        <label htmlFor="points">Points</label>
        <input
          type="number"
          id="points"
          value={pointsValue}
          onChangeCapture={pointsChangeHandler}
          onBlur={pointsBlurHandler}
        />
        {pointsHasError && <p>Please enter points</p>}

        <label htmlFor="startDate">Start date</label>
        <input
          type="date"
          id="startDate"
          value={startDateValue}
          onChangeCapture={startDateChangeHandler}
          onBlur={startDateBlurHandler}
        />
        {startDateHasError && <p>Please enter start date</p>}

        <label htmlFor="endDate">End date</label>
        <input
          type="date"
          id="endDate"
          value={endDateValue}
          onChangeCapture={endDateChangeHandler}
          onBlur={endDateBlurHandler}
        />
        {endDateHasError && <p>Please enter end date</p>}

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

export default CreateChallenge;
