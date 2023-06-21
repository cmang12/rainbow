import React, {useEffect, useState, useCallback} from "react"; 
import {getDocs, collection, deleteDoc, doc} from "firebase/firestore"; 
import {db} from '../config/firebase-config'; 
import '../styles/pages/Journal.css'; 

function Journal() {
    const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "entries");

  const deletePost = useCallback(async (id) => {
    const postDoc = doc(db, "entries", id);
    await deleteDoc(postDoc);
  }, []);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getDocs(postsCollectionRef);
        setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, [deletePost]);

  return (
    <div className="homePage">
      {postLists.map((post) => {
        return (
          <div className="post">
            <div className="postHeader">
              <div className="title">
                <h1> {post.title}</h1>
              </div>
              <div className="deletePost">
                  <button
                    onClick={() => {
                      deletePost(post.id);
                    }}
                  >
                    &#128465;
                  </button>

              </div>
            </div>
            <div className="postTextContainer"> {post.postText} </div>
            <h3>@helo</h3>
          </div>
        );
      })}
    </div>
  );
}

export default Journal; 