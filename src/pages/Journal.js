import React, { useEffect, useState, useCallback } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase-config";
import "../styles/pages/Journal.css";

function Journal() {
  const [postLists, setPostList] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const postsCollectionRef = collection(db, "entries");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const getClassName = (color) => {
    if (color == 0) {
      return 'moodDiv-0';
    } else if (color == 1) {
      return 'angry'; 
    } else if (color == 2) {
      return 'sad'; 
    } else if (color == 3) {
      return 'tiring'; 
    } else if (color == 4) {
      return 'normal'; 
    } else if (color == 5) {
      return 'good'; 
    } else if (color ==6) {
      return 'amazing'; 
    }
  };

  const filteredPosts = postLists.filter((post) => {
    const postDate = new Date(post.selectedDate);
    const postYear = postDate.getFullYear();
    const postMonth = postDate.getMonth() + 1;

    if (selectedMonth === 13) {
      return postYear === selectedYear;
    }
    return postYear === selectedYear && postMonth === selectedMonth;
  });

  function convertISOStringToDateString(isoString, needDayOfWeek) {
    const date = new Date(isoString);
    const options = { weekday: 'long' };
    const optionsForMonth = { month: 'long' }; 
    const dayOfWeek = date.toLocaleDateString(undefined, options);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const monthAsLong = date.toLocaleDateString(undefined, optionsForMonth); 
    const year = date.getFullYear().toString();
    
    const dateString = needDayOfWeek ? 
    `${dayOfWeek}, ${day} ${monthAsLong} ${year}` 
    : `${day} ${month} ${year}`;

    return dateString; 
    
  }

  const deletePost = useCallback(async (id) => {
    const postDoc = doc(db, "entries", id);
    await deleteDoc(postDoc);

    setPostList((prevPostList) =>
      prevPostList.filter((post) => post.id !== id)
    );
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

  const openPostModal = (post) => {
    setSelectedPost(post);
    document.body.style.overflow = "hidden"; // Disable scrolling on the background
  };

  const closePostModal = () => {
    setSelectedPost(null);
    document.body.style.overflow = "auto"; // Enable scrolling on the background
  };

  return (
    <div className="journalPage"> 
    <div className="filter">
      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(Number(e.target.value))}
      >
        <option value={2021}>2021</option>
        <option value={2022}>2022</option>
        <option value={2023}>2023</option>
        {/* Add more options for different years */}
      </select>

      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(Number(e.target.value))}
      >
        <option value={13}>All</option>
        <option value={1}>January</option>
        <option value={2}>February</option>
        <option value={3}>March</option>
        <option value={4}>April</option>
        <option value={5}>May</option>
        <option value={6}>June</option>
        <option value={7}>July</option>
        <option value={8}>August</option>
        <option value={9}>September</option>
        <option value={10}>October</option>
        <option value={11}>November</option>
        <option value={12}>December</option>
        
      </select>
      </div>
    <div className="homePage">
      
      {filteredPosts.map((post) => {
        return (
          <div className='postContainer'> 
          
          <div className={getClassName(post.rating)}>
            <div className="deletePost"> 
            {convertISOStringToDateString(post.selectedDate, false)} 
                <button onClick={() => deletePost(post.id)}>x</button>
                
               
              </div>
              </div>
          <div className="post" key={post.id} onClick={() => openPostModal(post)}>
            
            
            <div className="postHeader">
              <div className="title">
                {post.title}
              </div>
             
              
            </div>
            <div className="postTextContainer">{post.postText}</div>
          </div>
          </div>
        );
      })}

      {selectedPost && (
        <div className="postModal" onClick={closePostModal}>
          <div className="postModalContent" onClick={(e) => e.stopPropagation()}>
            <div className="deleteModal"> 
            <button onClick={closePostModal}>Close</button>
            </div>
            <div className="dateAndMood">
            {convertISOStringToDateString(selectedPost.selectedDate, true)} 
              <div className="moodAndLabelDiv"> 
              <div className={`moodCircle circle-${selectedPost.rating}`}></div>
                  {getClassName(selectedPost.rating)} 
              </div>
              </div> 
            <h1 className="postModalTitle">{selectedPost.title}</h1>
            <div className="postModalPost">{selectedPost.postText}</div>
            
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default Journal;
