import React, { useState, useEffect } from "react";
import useInput from "../../../../hooks/use-input";
import { db } from "../../../../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

const isNotEmpty = (value) => value.trim() !== "";

const CreateCustomChallenge = () => {
  const [isSending, setIsSending] = useState(false);
  const [created, setCreated] = useState(false);

  const [sustainableLifestyleCategories, setSustainableLifestyleCategories] =
    useState([]);
  const sustainableLifestyleCategoryRef = collection(
    db,
    "sustainableLifestyleCategories"
  );

  const customChallengesRef = collection(db, "customChallenges");

  const [selectedCategory, setSelectedCategory] = useState("");

  const {
    value: customChallengeNameValue,
    isValid: customChallengedNameIsValid,
    hasError: customChallengeNameHasError,
    valueChangeHandler: customChallengeNameChangeHandler,
    inputBlurHandler: customChallengedNameBlurHandler,
    reset: resetCustomChallengeName,
  } = useInput(isNotEmpty);

  useEffect(() => {
    const getChallengeCategories = async () => {
      const data = await getDocs(sustainableLifestyleCategoryRef);
      setSustainableLifestyleCategories(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    getChallengeCategories();
  }, []);

  let formIsValid = false;

  if (customChallengedNameIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    setCreated(true);
    setIsSending(true);

    createCustomChallenge();

    resetCustomChallengeName();

    setTimeout(() => {
      setCreated(false);
      setIsSending(false);
    }, 2000);
  };

  const createCustomChallenge = async () => {
    await addDoc(customChallengesRef, {
      sustainabilityCategory: selectedCategory,
      name: customChallengeNameValue,
      likes: 0,
      dislikes: 0,
      createBy: localStorage.getItem("user"),
    });
  };

  const changeCategoryOptionHandler = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="createRewardContainer">
      <form onSubmit={submitHandler}>
        <h1>Create custom challenge</h1>
        {created && <div>Reward created</div>}
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
        <label htmlFor="name">Challenge name</label>
        <input
          type="text"
          id="name"
          value={customChallengeNameValue}
          onChangeCapture={customChallengeNameChangeHandler}
          onBlur={customChallengedNameBlurHandler}
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
