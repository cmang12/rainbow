import React, {useEffect} from "react"; 
import RatingInput from '../components/RatingInput'; 
import '../styles/pages/Question.css'; 
import { useNavigate } from "react-router-dom";

function Question({isAuth}) {

    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuth) {
             navigate("/login"); 
        }
    }, []); 

    return (
        <div className="Home">
            <RatingInput/> 
        </div>
      );
  };
  
  export default Question;