import React, { useEffect, useState } from "react";
import RatingInput from "../components/RatingInput";
import CreateEntry from "../components/CreateEntry";
import "../styles/pages/Question.css";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RatingProvider } from "../components/RatingContext";

function Question({ isAuth }) {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  return (
    <div className="page-container">
      <div className="question-container">
        <RatingProvider>
          <div className="datePicker">
            <label>Date:</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="yyyy-MM-dd"
            />
          </div>
          <div className="home-content">
            <RatingInput selectedDate={selectedDate} />
            <CreateEntry selectedDate={selectedDate} />
          </div>
        </RatingProvider>
      </div>
    </div>
  );
}

export default Question;
