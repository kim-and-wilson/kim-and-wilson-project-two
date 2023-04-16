// Step 1: Set up our FIREBASE database. This includes initializing our database and our dbRef.

// ALSO don't forget, we're using modules, which means we'll need to turn on our Live Server!
import firebaseInfo from './firebaseConfig.js';
import { getDatabase, ref, set, push } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js';

const database = getDatabase(firebaseInfo);
const dbRef = ref(database);

// Errors you may encounter while building firebase database
// Error #1 - missing type="module" in our HTML
  // message: Uncaught SyntaxError: import declarations may only appear at top level of a module
// Error #2 - our firebase-database and firebase-app versions didn't match
  // message: Uncaught Error: Service database is not available
// Error #3 - we tried to link to firebase.js without the js in scripts.js file
  // message: Loading module from “http://127.0.0.1:5500/day4/functional-methods-codealong-STARTER/firebaseConfig” was blocked because of a disallowed MIME type (“text/html”).


// const addToDatabase = (key, value) => {
//   // Create a function that we pass  the info we want to store and the property name under which we want to store it
//   const customRef = ref(database, key);
//   // Set our info as the value of our ref
//     set(customRef, value);
//   }
      


  // const categories = {
  //   bestseller [{
  //   merigold:'-NT4_9eUSWEqckgCGicx',
  //   susan: '-NT4_Hnaw-7wux-FQ5Fh',
  //   bleedingHeart: '-NT4_K0XYfMkOnKQnOwx',
  //   }]
  //   };

  // const categories = {
  //   all,
  //   featured, 
  //   latest, 
  //   bestseller
  // };

  // const all {
  //   '-NT4_9eUSWEqckgCGicx',
  //   '-NT4_Hnaw-7wux-FQ5Fh',

  // };

// addToDatabase("categories", categories);

// const productInventory = 
//   {
//   title: 'American Marigold',
//   url: 'assets/p2/jpeg',
//   price: 23.45,
//   stock: 20
// };
// addToDatabase("inventory", productInventory);

  // const productInventory = 
  //   {
  //    title: 'Black Eyed Susan',
  //     url: 'assets/p1.jpeg',
  //     price: 25.45,
	//     stock: 20
  //   };

  //  addToDatabase("inventory", productInventory);

  //      const productInventory = 
  //   {
  //     title: 'Bleeding Heart',
  //     url: 'assets/p3.jpeg',
  //     price: 30.45,
	//     stock: 20
  //  };

  //  addToDatabase("inventory", productInventory);

  //   const productInventory = 
  //   {
  //     title: 'Bloody Cranesbill',
  //     url: 'assets/p4.jpeg',
  //     price: 45.00,
	//     stock: 20
  //   };

  //  addToDatabase("inventory", productInventory);

  //   const productInventory = 
  //   {
  //     title: 'Butterfly Weed',
  //     url: 'assets/p5.jpeg',
  //     price: 50.45,
	//     stock: 20
  //   };
  //  addToDatabase("inventory", productInventory);

  //   const productInventory = 
  //   {
  //     title: 'Common Yarrow',
  //     url: 'assets/p6.jpeg',
  //     price: 65.00,
	//     stock: 20
  //   };
  //  addToDatabase("inventory", productInventory);

  //   const productInventory = 
  //   {
  //     title: 'Doublefile Viburnum',
  //     url: 'asssets/p7.jpeg',
  //     price: 67.45,
	//     stock: 20
  //    };
  //  addToDatabase("inventory", productInventory);
//     

  //   const productInventory = 
  //   {
  //     title: 'Feather Reed Grass',
  //     url: 'assets/p8.jpeg',
  //     price: 20.00,
	//     stock: 20
  //    };
  //  addToDatabase("inventory", productInventory);
//     
// 

