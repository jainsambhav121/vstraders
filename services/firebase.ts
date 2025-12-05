import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBG5MLR7rokS5FDsTdZhl1diKMRlvuhzw",
  authDomain: "vstraders-35456.firebaseapp.com",
  projectId: "vstraders-35456",
  storageBucket: "vstraders-35456.appspot.com",
  messagingSenderId: "1019700173571",
  appId: "1:1019700173571:web:2c4cc3aa2e3848f07c6736"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
