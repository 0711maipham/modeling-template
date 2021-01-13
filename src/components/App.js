import '../App.css';
import React, { useState, useEffect } from 'react'
import Login from "./Login"
import Upload from "./Upload"
import PrivateRoute from './PrivateRoute'
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import firebase from 'firebase/app'

function App() {
  const adminId = "csTk3Zr6zXWjWbDsMmGx";
  const [profile, setProfile] = useState({});

  //Pulls Site Data from "Admin" firebase collection
  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('admin').doc(adminId).get().then((docRef) => { setProfile(docRef.data()) });
    return unsubscribe
  }, []
  )

  return (
    <Router>
      <AuthProvider>
        <div className="w-100" style={{ maxWidth: '100%' }}>
          <Switch>
            <PrivateRoute exact path="/" component={Upload} profile={profile} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
