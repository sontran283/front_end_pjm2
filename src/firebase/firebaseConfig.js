import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBuAbF4qnB43g6cyG2Aonv--OI6v7aX8jc", // moi may co mot key khac nhau
  authDomain: "fir-login-with-firebase-2a40f.firebaseapp.com", // ten mien
  projectId: "fir-login-with-firebase-2a40f", // id project
  storageBucket: "fir-login-with-firebase-2a40f.appspot.com",
  messagingSenderId: "259400100690",
  appId: "1:259400100690:web:7ed011cb9f07b1344a288b",
};

// khoi tao firebase
const app = initializeApp(firebaseConfig);

// dang nhap bang google
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
