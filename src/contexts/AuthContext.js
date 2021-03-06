import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import firebase from 'firebase/app'
import axios from 'axios'

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

    //Update the admin doc in the database
    function updateContent(val) {
        console.log(val);
       return firebase.firestore().collection('admin').doc(adminId).update({
           firstName: val.firstName,
           middleName: val.middleName,
           lastName: val.lastName,
           email: val.email,
           phone: val.phone,
           height: val.height,
           waist: val.waist,
           hip: val.hip,
           bust: val.bust,
           hair: val.hair,
           eyes: val.eyes,
           bio: val.bio,
           shoe: val.shoe,
           facebook: val.facebook,
           instagram: val.instagram,
           twitter: val.twitter,
           scheduling: val.scheduling
       });
    }

    function updatePhotos(val, destination, profile) {
        let obj = {
            alt: `Modeling photo of ${profile.firstName} ${profile.lastName}`,
            caption: "",
            url: val
        }
        return firebase.firestore().collection('admin').doc(adminId).update(
            {
                photos: firebase.firestore.FieldValue.arrayUnion(val)
            }
        ).then(
            addToGalleryDigitals(obj, destination)
        );
    }

    function addToGalleryDigitals(obj, destination) {
        const method = destination == "gallery" ? firebase.firestore().collection('admin').doc(adminId).update(
            {
                gallery: firebase.firestore.FieldValue.arrayUnion(obj)
            }
        ) :
        firebase.firestore().collection('admin').doc(adminId).update(
            {
                digitals: firebase.firestore.FieldValue.arrayUnion(obj)
            }
        )
        return method;
    }

    function updateGalleryDigitals(val, destination) {
        return firebase.firestore().collection('admin').doc(adminId).update(destination, val);
    }

    function deleteFromGalleryDigitals(obj, destination) {
        const method = destination == "gallery" ? firebase.firestore().collection('admin').doc(adminId).update(
            {
                gallery: firebase.firestore.FieldValue.arrayRemove(obj)
            }
        ) :
        firebase.firestore().collection('admin').doc(adminId).update(
            {
                digitals: firebase.firestore.FieldValue.arrayRemove(obj)
            }
        )
        return method
        // .then(
        //     axios.delete("http://localhost:3001/s3_delete", {
        //     fileName: obj.url
        // })
        // );
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
        updateGalleryDigitals,
        deleteFromGalleryDigitals
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}