import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {auth} from "../config/firebase-config.js"
import LiveDate from "../components/LiveDate";
import MainButton from "../components/MainButton";
import Title from "../components/Title";
import YearInPixels from "../components/YearInPixels";
import YearSelector from "../components/YearSelector";
import "../styles/pages/Home.css";
import "../styles/index.css";

function Home({ isAuth }) {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [sentimentStats, setSentimentStats] = useState({
    positive: 0,
    negative: 0,
    neutral: 0,
  });
  const [personalizedAdvice, setPersonalizedAdvice] = useState("");

  const userId = auth.currentUser.uid; 

  // Fetch sentiment stats from the backend
  const fetchSentimentStats = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/sentiment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch sentiment stats");
      }

      const data = await response.json();
      setSentimentStats(data.stats);
      generatePersonalizedAdvice(data.stats);
      console.log(data.stats)
    } catch (error) {
      console.error("Error fetching sentiment stats:", error);
    }
  };

  // Generate personalized advice based on sentiment stats
  const generatePersonalizedAdvice = (stats) => {
    const total = stats.positive + stats.negative + stats.neutral;
    const positiveRatio = (stats.positive / total) * 100;
    const negativeRatio = (stats.negative / total) * 100;

    if (positiveRatio > 60) {
      setPersonalizedAdvice(
        "You're feeling quite positive this week! Keep up the good vibes and continue focusing on the things that bring you joy."
      );
    } else if (negativeRatio > 60) {
      setPersonalizedAdvice(
        "It seems like you've been going through a tough time. It might be a good idea to talk things through with someone or take some time for self-care."
      );
    } else {
      setPersonalizedAdvice(
        "Your week has been balanced. Try to focus on maintaining that equilibrium and set some small goals for the week ahead."
      );
    }
  };

  useEffect(() => {
    fetchSentimentStats();
  }, []);

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  return (
    <div className="Home">
      <header className="Home-header">
        <Title />
        <LiveDate />
        <div className="personalizedAdvice">
  <p className="adviceText">{personalizedAdvice}</p>
</div>
        <MainButton />
        
        <div className="yearSelector">
          <YearSelector selectedYear={selectedYear} onYearChange={handleYearChange} />
        </div>
        <YearInPixels selectedYear={selectedYear} />
        
      </header>
    </div>
  );
}

export default Home;
