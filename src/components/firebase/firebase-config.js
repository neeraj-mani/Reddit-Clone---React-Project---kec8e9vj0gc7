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

//my firebase

// const firebaseConfig = {
//   apiKey: "AIzaSyCCUH34AUvN-IvKSrVejURcZ792XHRvgzs",
//   authDomain: "reddit-clone-4a6ca.firebaseapp.com",
//   projectId: "reddit-clone-4a6ca",
//   storageBucket: "reddit-clone-4a6ca.appspot.com",
//   messagingSenderId: "575291513087",
//   appId: "1:575291513087:web:e664a5b0fb1ffc261594ca",
// };

const firebaseConfig = {
  apiKey: "AIzaSyBSbK9JyjTyaDYs6QhzJyEaLVU49-cpIlM",
  authDomain: "reddit-clone-7bb54.firebaseapp.com",
  projectId: "reddit-clone-7bb54",
  storageBucket: "reddit-clone-7bb54.appspot.com",
  messagingSenderId: "988772507032",
  appId: "1:988772507032:web:e9023870ebc587f1499fed",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
