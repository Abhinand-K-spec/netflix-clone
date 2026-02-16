import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyB9iSGOrulpO8zgPGP_lkauln5BlRMSDms",
  authDomain: "netflix-clone-d2f04.firebaseapp.com",
  projectId: "netflix-clone-d2f04",
  storageBucket: "netflix-clone-d2f04.firebasestorage.app",
  messagingSenderId: "645712468966",
  appId: "1:645712468966:web:902218224dcf5860ba1427",
  measurementId: "G-86LDZQW129"
};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, 'user'),{
            uid : user.uid,
            name,
            authProvider: 'local',
            email,
        })

    } catch (error) {

        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '))
        
    }
}


const login = async(email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}


const logout = ()=>{
    signOut(auth);
}

export {signup, login, logout, auth, db, };