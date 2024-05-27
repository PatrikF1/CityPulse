import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCJYmbXZcj2TlWeAzaEfMqJMbwQ6gZPrVA",
    authDomain: "citypulse-82e2c.firebaseapp.com",
    projectId: "citypulse-82e2c",
    storageBucket: "citypulse-82e2c.appspot.com",
    messagingSenderId: "727326593200",
    appId: "1:727326593200:web:45f4ec68ec565a20f0eb75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
