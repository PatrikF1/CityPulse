import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, query, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyCJYmbXZcj2TlWeAzaEfMqJMbwQ6gZPrVA",
    authDomain: "citypulse-82e2c.firebaseapp.com",
    projectId: "citypulse-82e2c",
    storageBucket: "citypulse-82e2c.appspot.com",
    messagingSenderId: "727326593200",
    appId: "1:727326593200:web:45f4ec68ec565a20f0eb75"
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)


export const checkIfAdmin = async (email) => {
    try {
      const docRef = doc(db, 'admins', email);
      const docSnap = await getDoc(docRef);
  
      console.log('Dokument za admina:', docSnap.data());

      if (docSnap.exists()) {
        const adminData = docSnap.data();
        return adminData.role === 'admin';
      } else {
        return false;
      }
    } catch (error) {
      console.error('Greška pri provjeri admina:', error);
      return false;
    }
  };
  

  export const addAdmin = async (email) => {
    try {
      await setDoc(doc(db, 'admins', email), {
        email: email,
        role: 'admin'
      });
      console.log('Admin je uspješno dodan');
    } catch (error) {
      console.error('Greška pri dodavanju admina:', error);
    }
  };
  

  export const deleteUser = async (userId) => {
    try {
      await deleteDoc(doc(db, 'users', userId));
      console.log('Korisnik je uspješno obrisan');
    } catch (error) {
      console.error('Greška pri brisanju korisnika:', error);
    }
  };
  

  export const deleteEvent = async (eventId) => {
    try {
      await deleteDoc(doc(db, 'Events', eventId));
      console.log('Event je uspješno obrisan');
    } catch (error) {
      console.error('Greška pri brisanju eventa:', error);
    }
  };

  export const getAllUsers = async () => {
    try {
      const q = query(collection(db, 'users'));
      const querySnapshot = await getDocs(q);
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      return users;
    } catch (error) {
      console.error('Greška pri dohvaćanju korisnika:', error);
      return [];
    }
  };
  

  export const getAllEvents = async () => {
    try {
      const q = query(collection(db, 'Events'));
      const querySnapshot = await getDocs(q);
      const events = [];
      querySnapshot.forEach((doc) => {
        events.push({ id: doc.id, ...doc.data() });
      });
      return events;
    } catch (error) {
      console.error('Greška pri dohvaćanju eventa:', error);
      return [];
    }
  };
  

export { auth, db, storage };
