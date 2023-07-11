import React, { useContext, useState, useEffect } from "react";
import "../styles/components/CreateEntry.css";
import { RatingContext } from "./RatingContext";
import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase-config";
import { useNavigate } from "react-router-dom";

function CreateEntry({ selectedDate }) {
  const { rating } = useContext(RatingContext);
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [existingEntry, setExistingEntry] = useState(null);
  const postsCollectionRef = collection(db, "entries");
  let navigate = useNavigate();

  useEffect(() => {
    const fetchExistingEntry = async () => {
      if (selectedDate) {
        const entryDoc = doc(db, "entries", selectedDate.toISOString());
        const entrySnapshot = await getDoc(entryDoc);
        if (entrySnapshot.exists()) {
          setExistingEntry(entrySnapshot.data());
          setTitle(entrySnapshot.data().title);
          setPostText(entrySnapshot.data().postText);
        } else {
          setExistingEntry(null);
        }
      }
    };

    fetchExistingEntry();
  }, [selectedDate, db]);

  const createPost = async () => {
    const entryData = {
      rating,
      title,
      postText,
      timestamp: serverTimestamp(),
      selectedDate: selectedDate.toISOString(),
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    };

    if (existingEntry) {
      // Update existing entry
      await setDoc(doc(db, "entries", selectedDate.toISOString()), entryData);
    } else {
      // Create new entry
      await setDoc(doc(db, "entries", selectedDate.toISOString()), entryData);
    }

    navigate("/home");
  };

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <div className="inputGp">
        <label>Title</label>
        <input
          placeholder="My first day of..."
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        </div>
        <div className="inputGp">
          <label>Entry</label>
          <textarea
            placeholder="Write your thoughts..."
            value={postText}
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          />
        </div>
        
      </div>
      <button disabled={!title || !postText || !selectedDate || rating === 0} onClick={createPost}>
          Save
        </button>
    </div>
  );
}

export default CreateEntry;
