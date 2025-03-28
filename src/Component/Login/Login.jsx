import { useState } from "react";
import styles from "./login.module.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [user , setUser] = useState({ email :"" , password :""});

  const onChange = (e) => {
  setUser({...user , [e.target.name]: e.target.value});
   }

   const handleLogin = async () => {
    try{ 
      const res = await axios.post("https://reqres.in/api/login" , {
        email: "eve.holt@reqres.in", // default value given to us
        password: "cityslicka"  // default given to us
      })

      // now to catch the token recieved to us by the API after providing the credentials 
      localStorage.setItem("token" , res.data.token )
      alert("Login Sucessfully");
      setUser({email :"" , password :""});
  navigate("/users");
    }catch(err){
      alert("Invalid credentials. Please try again.");
      console.error("Login Error:", err);
    }
      
   }

  return (
    <div className={styles.mainDiv}>
      <div className={styles.loginDiv}>

        <h2>Email id</h2>
        <input
          type="email"
          name="email"
          placeholder="Enter your mail id"
          value={user.email}
          onChange={onChange}
        />

        <h2>Password</h2>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={user.password}
          onChange={onChange}
        />

        <button onClick={handleLogin}>Login</button>
       
      </div>
    </div>
  );
};

export default Login;
