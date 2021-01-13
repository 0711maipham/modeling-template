import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import firebase from 'firebase/app'

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const adminId = "csTk3Zr6zXWjWbDsMmGx";

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    //Update a field of the admin doc in the database
    function updateContent(field, val) {
       return firebase.firestore().collection('admin').doc(adminId).update(field, val);
    }

    function updatePhotos(val) {
        return firebase.firestore().collection('admin').doc(adminId).update(
            {
                photos: firebase.firestore.FieldValue.arrayUnion(val)
            }
        );
    }

    function updateGallery(val) {
        return firebase.firestore().collection('admin').doc(adminId).update("gallery", val);
    }

    function updateDigitals(val) {
        return firebase.firestore().collection('admin').doc(adminId).update("digitals", val);
    }



    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        updateContent,
        updatePhotos,
        updateGallery,
        updateDigitals,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}