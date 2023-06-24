import React, { useContext, useState } from "react";
import '../styles/components/CreateEntry.css';
import { RatingContext } from './RatingContext';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../config/firebase-config";
import { useNavigate } from "react-router-dom";

function CreateEntry() {
  const { rating } = useContext(RatingContext);
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const postsCollectionRef = collection(db, "entries");
  let navigate = useNavigate();

  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      rating,
      title,
      postText,
      timestamp: serverTimestamp(), 
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid }
    });
    navigate("/home");
  };

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1> Create A Post </h1>
        <div className="inputGp"> </div>
        <label> Title: </label>
        <input
          placeholder="Title..."
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />

        <div className="inputGp">
          <label> Post: </label>
          <textarea
            placeholder="Post..."
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          />
        </div>
        <button onClick={createPost}> Save </button>
      </div>
    </div>
  );
}

export default CreateEntry;
