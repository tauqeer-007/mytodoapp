import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoList from './components/TodoList'
import './App.css';
import Login from "./components/Login";
import Register from "./components/Register";
import { Home } from "./components/Home"
import React, { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import AuthService from "./services/auth.service";

function App() {

   const [currentUser, setCurrentUser] = useState(undefined)

   useEffect(()=> {
    const user = AuthService.getCurrentUser();
    setCurrentUser(user)
   },[])

   const logOut = ()=> {
    AuthService.logout();
    setCurrentUser(undefined)
   }

   
  return (

    <div>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <Link to={"/"} className="navbar-brand">
        My Todo App
      </Link>
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to={"/home"} className="nav-link">
            Home
          </Link>
        </li>
      </div>

      {currentUser ? (
        <div className="navbar-nav ml-auto">
          
          <li className="nav-item">
            <a href="/login" className="nav-link" onClick={logOut}>
              LogOut
            </a>
          </li>
        </div>
      ) : (
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/register"} className="nav-link">
              Sign Up
            </Link>
          </li>
        </div>
      )}
    </nav>

    <div className="App">
    <ToastContainer theme='colored' position='top-center'></ToastContainer>
      <Routes>
        <Route path="/" element={<Home isLoggedIn={currentUser}/>} />
        <Route path="/home" element={<Home isLoggedIn={currentUser}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
    
    {/* <AuthVerify logOut={this.logOut}/> */}
  </div>
    // <div className="App">
    //    <ToastContainer theme='colored' position='top-center'></ToastContainer>
    //   <Routes>
    //     <Route exact path='/todo' component={TodoList} />
    //   </Routes>
   
    // </div>
  );
}
  // return (
  //   <div className="App">
  //         {/* <TodoList/> */}
  //   </div>
  // );


export default App;
