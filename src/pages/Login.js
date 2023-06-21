import React from "react"; 
import {auth, provider} from "../config/firebase-config"; 
import { signInWithPopup } from "firebase/auth";
import {useNavigate} from "react-router-dom";
import Title from "../components/Title";
import '../styles/pages/Login.css'; 

function Login({setIsAuth}) {

    let navigate = useNavigate(); 
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth", true);
            setIsAuth(true); 
            navigate("/");
        })
    }
    return (<div className= "loginPage"> 
    <Title/>
    <p> Sign in to My Virtual Diary </p>
    <button className="login-with-google-btn" onClick={signInWithGoogle}> Log in with Google </button>
    </div>
    ); 
}

export default Login; 