
// import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";
//
// // Initialize Firebase
// const app = initializeApp ({
//     apiKey: <apiKey>,
//     authDomain: <authDomain>,
//     projectId: <projectId>,
//     storageBucket: <storageBucket>,
//     messagingSenderId: <messagingSenderId>,
//     appId: <appId>,
//     measurementId: <measurementId>,
// });
//
// // Firebase storage reference
// const storage = getStorage(app);
// export default storage;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCQRK1cVxCoBMqMw9s6bBHM-FaB9ArmPxQ",
    authDomain: "usersimage-5dc03.firebaseapp.com",
    projectId: "usersimage-5dc03",
    storageBucket: "usersimage-5dc03.appspot.com",
    messagingSenderId: "636676680888",
    appId: "1:636676680888:web:05edee78c401620665184d",
    measurementId: "G-6P93S2GHZN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
// const analytics = getAnalytics(app);

export default storage;