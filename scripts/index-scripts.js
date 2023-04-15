// Step 1: Set up our FIREBASE database. This includes initializing our database and our dbRef.

// ALSO don't forget, we're using modules, which means we'll need to turn on our Live Server!
import firebaseInfo from "./firebaseConfig.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js"

const database = getDatabase(firebaseInfo);
const dbRef = ref(database);

// Errors you may encounter while building firebase database
// Error #1 - missing type="module" in our HTML
  // message: Uncaught SyntaxError: import declarations may only appear at top level of a module
// Error #2 - our firebase-database and firebase-app versions didn't match
  // message: Uncaught Error: Service database is not available
// Error #3 - we tried to link to firebase.js without the js in scripts.js file
  // message: Loading module from “http://127.0.0.1:5500/day4/functional-methods-codealong-STARTER/firebaseConfig” was blocked because of a disallowed MIME type (“text/html”).