import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyCidLxVC0qy4jbO08RybPm5v6OxvVUnZds",
//   authDomain: "reddit-44570.firebaseapp.com",
//   projectId: "reddit-44570",
//   storageBucket: "reddit-44570.appspot.com",
//   messagingSenderId: "1076268213796",
//   appId: "1:1076268213796:web:8f07bf2a96b3ea1e3d5ab1"
// };

const firebaseConfig = {
  apiKey: "AIzaSyCCUH34AUvN-IvKSrVejURcZ792XHRvgzs",
  authDomain: "reddit-clone-4a6ca.firebaseapp.com",
  projectId: "reddit-clone-4a6ca",
  storageBucket: "reddit-clone-4a6ca.appspot.com",
  messagingSenderId: "575291513087",
  appId: "1:575291513087:web:e664a5b0fb1ffc261594ca",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
