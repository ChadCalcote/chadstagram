import './wdyr';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FirebaseContext from './context/firebase'
import { firebaseApp, FieldValue, auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from './lib/firebase';
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<FirebaseContext.Provider value={{ firebaseApp, FieldValue, auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile }}><App /></FirebaseContext.Provider>);

