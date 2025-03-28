import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Component/Login/Login";
import UserData from "./Component/UsersList/UsersData";


const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token"); 
  return token ? children : <Navigate to="/" />; 
};

const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />

        
        <Route 
          path="/users" 
          element={
            <PrivateRoute>
              <UserData />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
