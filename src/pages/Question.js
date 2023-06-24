import React, {useEffect} from "react"; 
import RatingInput from '../components/RatingInput'; 
import CreateEntry from '../components/CreateEntry'; 
import '../styles/pages/Question.css'; 
import { useNavigate } from "react-router-dom";
import {RatingProvider} from '../components/RatingContext'; 

function Question({isAuth}) {

    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuth) {
             navigate("/login"); 
        }
    }, []); 

    return (
        <RatingProvider>
        <div className="Home">
            <RatingInput/> 
            <CreateEntry/>

        </div>
        </RatingProvider>
      );
  };
  
  export default Question;