import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import LiveDate from '../components/LiveDate';
import MainButton from '../components/MainButton';
import Title from '../components/Title';
import YearInPixels from '../components/YearInPixels';
import YearSelector from '../components/YearSelector';
import { db } from "../config/firebase-config";
import { getDocs, collection } from "firebase/firestore";
import Sentiment from "sentiment"; // Import Sentiment package
import '../styles/pages/Home.css';
import '../styles/index.css';

function Home({ isAuth }) {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Ensure it's initialized to current year
  const [sentimentStats, setSentimentStats] = useState({ positive: 0, negative: 0, neutral: 0 });
  const [personalizedAdvice, setPersonalizedAdvice] = useState("");
  
  const postsCollectionRef = collection(db, "entries");
  const sentiment = new Sentiment(); // Initialize Sentiment instance

  const analyzeSentiment = (text) => {
    const result = sentiment.analyze(text);
    return result.score > 0 ? "positive" : result.score < 0 ? "negative" : "neutral";
  };

  // Helper function to get posts from the last week
  const filterLastWeekPosts = (posts) => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago

    return posts.filter(post => {
      const postDate = post.timestamp.toDate(); // Assuming timestamp is a Firestore Timestamp
      return postDate >= oneWeekAgo;
    });
  };

  // Fetch posts and calculate sentiment stats for the last week
  const getPosts = async () => {
    try {
      const data = await getDocs(postsCollectionRef);
      const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      // Filter posts from the last week
      const lastWeekPosts = filterLastWeekPosts(posts);

      // Calculate sentiment stats
      const stats = { positive: 0, negative: 0, neutral: 0 };
      lastWeekPosts.forEach((post) => {
        const sentimentAnalysis = analyzeSentiment(post.postText);
        if (sentimentAnalysis === "positive") stats.positive++;
        if (sentimentAnalysis === "negative") stats.negative++;
        if (sentimentAnalysis === "neutral") stats.neutral++;
      });

      setSentimentStats(stats);
      generatePersonalizedAdvice(stats);
    } catch (error) {
      console.error(error);
    }
  };

  // Generate personalized advice based on sentiment stats
  const generatePersonalizedAdvice = (stats) => {
    const total = stats.positive + stats.negative + stats.neutral;
    const positiveRatio = (stats.positive / total) * 100;
    const negativeRatio = (stats.negative / total) * 100;

    if (positiveRatio > 60) {
      setPersonalizedAdvice("You're feeling quite positive this week! Keep up the good vibes and continue focusing on the things that bring you joy.");
    } else if (negativeRatio > 60) {
      setPersonalizedAdvice("It seems like you've been going through a tough time. It might be a good idea to talk things through with someone or take some time for self-care.");
    } else {
      setPersonalizedAdvice("Your week has been balanced. Try to focus on maintaining that equilibrium and set some small goals for the week ahead.");
    }
  };

  // Ensure the YearInPixels component renders when selectedYear is updated
  useEffect(() => {
    getPosts();
  }, []);

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  return (
    <div className="Home">
      <header className="Home-header">
        <Title />
        <LiveDate />
        <MainButton />
        <div className="yearSelector">
          <YearSelector selectedYear={selectedYear} onYearChange={handleYearChange} />
        </div>
        
        {/* Ensure YearInPixels is always rendered correctly */}
        <YearInPixels selectedYear={selectedYear} />

        <div className="personalizedAdvice">
          <p className="adviceText">{personalizedAdvice}</p>
        </div>
      </header>
    </div>
  );
}

export default Home;
