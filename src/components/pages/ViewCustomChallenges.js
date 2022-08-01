import React, { useState, useEffect, useReducer } from "react";
import "./ViewCustomChallenges.css";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";

const initialState = {
  likes: 1,
  dislikes: 8,
};

const appReducer = (state, action) => {
  switch (action.type) {
    case "HANDLE_LIKE":
      return {
        ...state,
        likes: state.likes + action.payload,
      };
    case "HANDLE_DISLIKE":
      return {
        ...state,
        dislikes: state.dislikes + action.payload,
      };
    default:
      return state;
  }
};

const ViewCustomChallenges = () => {
  const [customChallenges, setCustomChallenges] = useState([]);
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(10);

  useEffect(() => {}, []);

  let content = <p>loading...</p>;

  const [state, dispatch] = useReducer(appReducer, initialState);
  const { likes, dislikes } = state;
  const [status, setStatus] = useState(null);

  const handleClickLike = () => {
    if (status === "like") {
      setStatus(null);
      dispatch({
        type: "HANDLE_LIKE",
        payload: -1,
      });
    } else {
      setStatus("like");
      if (status === "dislike") {
        dispatch({
          type: "HANDLE_DISLIKE",
          payload: -1,
        });
      }
      dispatch({
        type: "HANDLE_LIKE",
        payload: 1,
      });
    }
  };

  const handleClickDislike = () => {
    if (status === "dislike") {
      setStatus(null);
      dispatch({
        type: "HANDLE_DISLIKE",
        payload: -1,
      });
    } else {
      setStatus("dislike");
      if (status === "like") {
        dispatch({
          type: "HANDLE_LIKE",
          payload: -1,
        });
      }
      dispatch({
        type: "HANDLE_DISLIKE",
        payload: 1,
      });
    }
  };

  return (
    <table className="rewards">
      <thead>
        <tr>
          <th>Sustainable lifestyle category</th>
          <th>Challenge name</th>
          <th></th>
          <th>Approval</th>
          <th></th>
        </tr>
      </thead>
      <tr>
        <td>Nutrition challenge</td>
        <td>Buy an apple</td>
        <td>
          <button
            className={status === "like" ? "btn active" : "btn"}
            onClick={handleClickLike}
          >
            Like <span>{likes}</span>
          </button>
        </td>
        <td>{Math.floor((100 * likes) / (likes + dislikes))} %</td>
        <td>
          <button
            className={status === "dislike" ? "btn active" : "btn"}
            onClick={handleClickDislike}
          >
            Dislike <span>{dislikes}</span>
          </button>
        </td>
      </tr>
    </table>
  );
};

export default ViewCustomChallenges;
