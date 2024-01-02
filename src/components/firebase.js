
import { initializeApp } from "firebase/app";
// import {getStorage} from  'firebase/firestore';
// import {fires} 'firebase/storage';
import {getStorage} from 'firebase/storage'
// import firebase from 'firebase/app';
import { getFirestore } from "firebase/firestore";
// import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBl-r1tzHc4_LCFntz-frFI9_ZVuNoDXyo",
    authDomain: "hackathon1-87fa3.firebaseapp.com",
    projectId: "hackathon1-87fa3",
    storageBucket: "hackathon1-87fa3.appspot.com",
    messagingSenderId: "182196942429",
    appId: "1:182196942429:web:8bb8faed2bad0e33b13fb4"
};
const app = initializeApp(firebaseConfig);
 const db = getFirestore(app);
// export const storage = firebase.storage();
const storage = getStorage(app);
// export const storageRef = storage.ref('images'); 
export {db,storage}