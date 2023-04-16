  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDa93oAfc8snkghcMGF9H-r5_OWuT0chB4",
    authDomain: "project-pronia.firebaseapp.com",
    databaseURL: "https://project-pronia-default-rtdb.firebaseio.com",
    projectId: "project-pronia",
    storageBucket: "project-pronia.appspot.com",
    messagingSenderId: "431516586380",
    appId: "1:431516586380:web:6218957a71d4bee98106a9"
  };

// Initialize Firebase
const firebaseInfo = initializeApp(firebaseConfig);

  export default firebaseInfo;