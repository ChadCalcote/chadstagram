import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FirebaseContext from './context/firebase'
import { firebaseApp, FieldValue } from './lib/firebase';
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<FirebaseContext.Provider value={{ firebaseApp, FieldValue }}><App /></FirebaseContext.Provider>);

