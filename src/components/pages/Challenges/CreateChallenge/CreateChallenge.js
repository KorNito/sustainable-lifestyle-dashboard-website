import React, { useState, useEffect } from "react";
import "./CreateChallenge.css";
import useInput from "../../../../hooks/use-input";
import { db } from "../../../../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const isNotEmpty = (value) => value.trim() !== "";

const CreateChallenge = () => {
  const [isSending, setIsSending] = useState(false);
  const [created, setCreated] = useState(false);

  const [challengeNameValue, setChallengeNameValue] = useState("");
  const challengesRef = collection(db, "challenges");

  const [sustainableLifestyleCategories, setSustainableLifestyleCategories] =
    useState([]);
  const sustainableLifestyleCategoryRef = collection(
    db,
    "sustainableLifestyleCategories"
  );

  const [selectedCategory, setSelectedCategory] = useState("");

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

  useEffect(() => {
    const getChallengeCategories = async () => {
      const data = await getDocs(sustainableLifestyleCategoryRef);
      setSustainableLifestyleCategories(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    getChallengeCategories();
  }, []);

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

    createChallenge();

    resetPoints();
    resetStartDate();
    resetEndDate();

    setTimeout(() => {
      setCreated(false);
      setIsSending(false);
    }, 2000);
  };

  const createChallenge = async () => {
    await addDoc(challengesRef, {
      sustainabilityCategory: selectedCategory,
      challengeName: challengeNameValue,
      points: pointsValue,
      startDate: startDateValue,
      endDate: endDateValue,
      createdBy: localStorage.getItem("user"),
    });
  };

  let selectedSustainabilityCategory = [];

  if (selectedCategory !== "") {
    selectedSustainabilityCategory = sustainableLifestyleCategories.filter(
      (sustainableLifestyleCategory) => {
        return sustainableLifestyleCategory.category === selectedCategory;
      }
    );
  }

  const changeCategoryOptionHandler = (event) => {
    setSelectedCategory(event.target.value);
  };

  const changeChallengeOptionHandler = (event) => {
    setChallengeNameValue(event.target.value);
  };

  return (
    <div className="createChallengeContainer">
      <form onSubmit={submitHandler}>
        <h1>Create a challenge</h1>
        {created && <div>Challenge created</div>}

        <label htmlFor="category">Category</label>
        <select onChange={changeCategoryOptionHandler}>
          <option value="" selected disabled hidden>
            Select sustainability category
          </option>
          {sustainableLifestyleCategories.map((challengeCategory) => (
            <option value={challengeCategory.category}>
              {challengeCategory.category}
            </option>
          ))}
        </select>

        <label htmlFor="challenge">Challenge</label>
        <select onChange={(e) => changeChallengeOptionHandler(e)}>
          <option value="" selected disabled hidden>
            Select sustainability challenge
          </option>
          {selectedSustainabilityCategory.map((selectedCategoryChallenges) =>
            selectedCategoryChallenges.challenges.map((challenge) => (
              <option value={selectedCategoryChallenges.challenge}>
                {challenge}
              </option>
            ))
          )}
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
