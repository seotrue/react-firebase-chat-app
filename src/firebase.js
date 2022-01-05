import firebase from "firebase/compat";
import "firebase/auth";
import "firebase/database";
import "firebase/storage"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBXtzjFF4WkPgQI41zaHHBunsXr7mrQmGg",
    authDomain: "react-firebase-chat-app-64d4a.firebaseapp.com",
    projectId: "react-firebase-chat-app-64d4a",
    storageBucket: "react-firebase-chat-app-64d4a.appspot.com",
    messagingSenderId: "313419005360",
    appId: "1:313419005360:web:76c11fceb81196910c6a75",
    measurementId: "G-J4LX0TRRJN"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);