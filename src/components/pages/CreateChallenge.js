import React, { useState } from "react";
import "./CreateChallenge.css";
import useInput from "../../hooks/use-input";

const isNotEmpty = (value) => value.trim() !== "";

const CreateChallenge = () => {
  const [isSending, setIsSending] = useState(false);
  const [created, setCreated] = useState(false);
  const [selected, setSelected] = useState("");
  const [challengeNameValue, setChallengeNameValue] = useState("");

  const sustainabilityChallenges = ["Reusable cup", "Reusable bag"];
  const fitnessChallenges = ["Arrive with bicycle"];

  let type = null;
  let options = null;

  if (selected === "Sustainability challenge") {
    type = sustainabilityChallenges;
  } else if (selected === "Fitness challenge") {
    type = fitnessChallenges;
  }

  if (type) {
    options = type.map((el) => <option key={el}>{el}</option>);
  }

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

  if (pointsIsValid && startDateIsValid && endDateIsValid) {
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

    resetPoints();
    resetStartDate();
    resetEndDate();

    setTimeout(() => {
      setCreated(false);
      setIsSending(false);
    }, 2000);
  };

  const changeSelectOptionHandler = (event) => {
    setSelected(event.target.value);
  };

  const changeOptionHandler = (event) => {
    setChallengeNameValue(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className="createChallengeContainer">
      <form onSubmit={submitHandler}>
        <h1>Create a challenge</h1>
        {created && <div>Challenge created</div>}

        <label htmlFor="category">Category</label>
        <select onChange={(e) => changeSelectOptionHandler(e)}>
          <option>Sustainability challenge</option>
          <option>Fitness challenge</option>
          <option>Nutrition challenge</option>
          <option>Diversity challenge</option>
          <option>Remote challenge</option>
          <option>Civic challenge</option>
        </select>

        <label htmlFor="challenge">Challenge</label>
        <select id="challenge" onChange={(e) => changeOptionHandler(e)}>
          {options}
        </select>

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
