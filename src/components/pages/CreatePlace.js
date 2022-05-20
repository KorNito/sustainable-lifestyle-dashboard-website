import React, { useState } from "react";
import "./CreatePlace.css";
import useInput from "../../hooks/use-input";

const isNotEmpty = (value) => value.trim() !== "";

const CreatePlace = () => {
  const [isSending, setIsSending] = useState(false);
  const [created, setCreated] = useState(false);

  const {
    value: placeNameValue,
    isValid: placeNameIsValid,
    hasError: placeNameHasError,
    valueChangeHandler: placeNameChangeHandler,
    inputBlurHandler: placeNameBlurHandler,
    reset: resetPlaceName,
  } = useInput(isNotEmpty);

  const {
    value: longitudeValue,
    isValid: longitudeIsValid,
    hasError: longitudeHasError,
    valueChangeHandler: longitudeChangeHandler,
    inputBlurHandler: longitudeBlurHandler,
    reset: resetLongitude,
  } = useInput(isNotEmpty);

  const {
    value: latitudeValue,
    isValid: latitudeIsValid,
    hasError: latitudeHasError,
    valueChangeHandler: latitudeChangeHandler,
    inputBlurHandler: latitudeBlurHandler,
    reset: resetLatitude,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (placeNameIsValid && longitudeIsValid && latitudeIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    setCreated(true);
    setIsSending(true);

    fetch(
      "https://sustainable-lifestyle-30c7b-default-rtdb.europe-west1.firebasedatabase.app/places.json",
      {
        method: "POST",
        body: JSON.stringify({
          placeName: placeNameValue,
          longitude: longitudeValue,
          latitude: latitudeValue,
        }),
      }
    );

    resetPlaceName();
    resetLongitude();
    resetLatitude();

    setTimeout(() => {
      setCreated(false);
      setIsSending(false);
    }, 2000);
  };

  return (
    <div className="createPlaceContainer">
      <form onSubmit={submitHandler}>
        <h1>Create a place</h1>
        {created && <div>Place created</div>}
        <label htmlFor="name">Place name</label>
        <input
          type="text"
          id="name"
          value={placeNameValue}
          onChangeCapture={placeNameChangeHandler}
          onBlur={placeNameBlurHandler}
        />
        {placeNameHasError && <p>Please enter place name</p>}
        <label htmlFor="longitude">Longitude</label>
        <input
          type="text"
          id="longitude"
          value={longitudeValue}
          onChangeCapture={longitudeChangeHandler}
          onBlur={longitudeBlurHandler}
        />
        {longitudeHasError && <p>Please enter longitude</p>}
        <label htmlFor="latitude">Latitude</label>
        <input
          type="text"
          id="latitude"
          value={latitudeValue}
          onChangeCapture={latitudeChangeHandler}
          onBlur={latitudeBlurHandler}
        />
        {latitudeHasError && <p>Please enter latitude</p>}
        {isSending ? (
          <button disabled>Creating place...</button>
        ) : (
          <button type="Submit">Submit</button>
        )}
      </form>
    </div>
  );
};

export default CreatePlace;
