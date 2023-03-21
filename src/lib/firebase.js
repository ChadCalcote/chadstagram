import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

const config = {
    apiKey: "AIzaSyA_x7Hx2IejXry-h357EFM5ShfQFSCyJas",
    authDomain: "chadstagram-c12e0.firebaseapp.com",
    projectId: "chadstagram-c12e0",
    storageBucket: "chadstagram-c12e0.appspot.com",
    messagingSenderId: "1035873086619",
    appId: "1:1035873086619:web:3c79f8239b1bcb95116a3e"
};

const firebaseApp = initializeApp(config);
const db = getFirestore(firebaseApp);
const FieldValue = db.FieldValue
const auth = getAuth(firebaseApp)


export { firebaseApp, db, FieldValue, auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile };