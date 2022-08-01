import React, { useState } from "react";
import useInput from "../../hooks/use-input";

const isNotEmpty = (value) => value.trim() !== "";

const CreateCustomChallenge = () => {
  const [isSending, setIsSending] = useState(false);
  const [created, setCreated] = useState(false);

  const {
    value: rewardNameValue,
    isValid: rewardNameIsValid,
    hasError: rewardNameHasError,
    valueChangeHandler: rewardNameChangeHandler,
    inputBlurHandler: rewardNameBlurHandler,
    reset: resetChallengeName,
  } = useInput(isNotEmpty);

  // let formIsValid = false;

  // if (rewardNameIsValid && pointsIsValid) {
  //   formIsValid = true;
  // }

  const submitHandler = (event) => {
    //   event.preventDefault();
    //   if (!formIsValid) {
    //     return;
    //   }
    //   setCreated(true);
    //   setIsSending(true);
    //   fetch(
    //     "https://sustainable-lifestyle-30c7b-default-rtdb.europe-west1.firebasedatabase.app/rewards.json",
    //     {
    //       method: "POST",
    //       body: JSON.stringify({
    //         rewardName: rewardNameValue,
    //         points: pointsValue,
    //       }),
    //     }
    //   );
    //   resetChallengeName();
    //   resetPoints();
    //   setTimeout(() => {
    //     setCreated(false);
    //     setIsSending(false);
    //   }, 2000);
  };

  return (
    <div className="createRewardContainer">
      <form onSubmit={submitHandler}>
        <h1>Create custom challenge</h1>
        <label htmlFor="category">Category</label>
        <select>
          <option>Sustainability challenge</option>
          <option>Fitness challenge</option>
          <option>Nutrition challenge</option>
          <option>Diversity challenge</option>
          <option>Remote challenge</option>
          <option>Civic challenge</option>
        </select>
        {created && <div>Reward created</div>}
        <label htmlFor="name">Challenge name</label>
        <input
          type="text"
          id="name"
          value={rewardNameValue}
          onChangeCapture={rewardNameChangeHandler}
          onBlur={rewardNameBlurHandler}
        />
        {isSending ? (
          <button disabled>Creating reward...</button>
        ) : (
          <button type="Submit">Submit</button>
        )}
      </form>
    </div>
  );
};

export default CreateCustomChallenge;
