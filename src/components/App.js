import '../App.css';
import React, { useState, useEffect } from 'react'
import Login from "./Login"
import Admin from "./Admin/Admin"
import Homepage from "./Homepage/Homepage"
import About from "./About/About"
import Gallery from "./Portfolio/Gallery"
import Digitals from "./Portfolio/Digitals"
import Contact from "./Contact/Contact"
import PrivateRoute from './PrivateRoute'
import Nav from './Navigation/Nav'
import Footer from './Navigation/Footer'
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import firebase from 'firebase/app'

function App() {
  const adminId = "csTk3Zr6zXWjWbDsMmGx";
  const [profile, setProfile] = useState({});

  //Pulls Site Data from "Admin" firebase collection
  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('admin').doc(adminId).onSnapshot((docRef) => { setProfile(docRef.data()) });
    return unsubscribe
  }, []
  )

  return (
    <Router>
      <AuthProvider>
        <Nav />
        <div className="w-100 main-container" style={{ maxWidth: '100%' }}>
          <div className="content-wrapper">
          <Switch>
            <PrivateRoute exact path="/admin" component={Admin} profile={profile} />
            <Route path="/login" component={Login} />
            <Route exact path="/" render={(props) => (
              <Homepage {...props} profile={profile} />
            )} />
            <Route path="/about" render={(props) => (
              <About {...props} profile={profile} />
            )} />
            <Route exact path="/gallery" render={(props) => (
              <Gallery {...props} profile={profile} />
            )} />
            <Route path="/digitals" render={(props) => (
              <Digitals {...props} profile={profile} />
            )} />
            <Route path="/contact" render={(props) => (
              <Contact {...props} profile={profile} />
            )} />
          </Switch>
          </div>
        <Footer profile={profile}/>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
