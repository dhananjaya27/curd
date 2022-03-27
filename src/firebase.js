




//firebae configuration


// import firebase from "firebase";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
    apiKey: "AIzaSyBRxvpiRkvNlub5O6lS4gtfHLEE6ZouymQ",
    authDomain: "curd-application-cd696.firebaseapp.com",
    databaseURL: "https://curd-application-cd696-default-rtdb.firebaseio.com",
    projectId: "curd-application-cd696",
    storageBucket: "curd-application-cd696.appspot.com",
    messagingSenderId: "613667056387",
    appId: "1:613667056387:web:f0106664deeb386fc2d736",
    measurementId: "G-99QRHVHG41"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
//   firebase.initializeApp(firebaseConfig)
//   const analytics = getAnalytics(app);
export const db = getDatabase(app);
  export default app;
  