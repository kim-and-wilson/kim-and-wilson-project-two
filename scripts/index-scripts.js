// Step 1: Set up our FIREBASE database. This includes initializing our database and our dbRef.

// ALSO don't forget, we're using modules, which means we'll need to turn on our Live Server!
import firebaseInfo from './firebaseConfig.js';
import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js';

const database = getDatabase(firebaseInfo);
const dbRef = ref(database);

// Errors you may encounter while building firebase database
// Error #1 - missing type="module" in our HTML
  // message: Uncaught SyntaxError: import declarations may only appear at top level of a module
// Error #2 - our firebase-database and firebase-app versions didn't match
  // message: Uncaught Error: Service database is not available
// Error #3 - we tried to link to firebase.js without the js in scripts.js file
  // message: Loading module from “http://127.0.0.1:5500/day4/functional-methods-codealong-STARTER/firebaseConfig” was blocked because of a disallowed MIME type (“text/html”).


const addToDatabase = (key, value) => {
  // Create a function that we pass  the info we want to store and the property name under which we want to store it
  const customRef = ref(database, key);
  // Set our info as the value of our ref
    onValue (customRef, value);
};

// FEATURED PRODUCT FILTER

const featuredButton = document.getElementById('featured-button');
featuredButton.addEventListener('click', (e) => {
  onValue(dbRef, function (data) {
    const allProducts = data.val();
    const inventory = Object.values(allProducts.inventory)
    const featuredProducts = inventory.filter((item) => {
      return item.category.featured === true;
    });
    // console.log(featuredProducts); 
  

    const displayFeaturedItems = (displayFeatured) => {

      const inventoryElement = document.querySelector('#inventory')
      inventoryElement.innerHTML = '';


      featuredProducts.forEach((item) => {
        console.log(item)
        const newLi = document.createElement('li');
        const imgElement = document.createElement('img');
        newLi.innerHTML = `
        <img src=${item.url} alt="${item.alt}" />
        <h4>${item.title}</h4>
        <p>${item.price}<p>
        `
        newLi.append(imgElement);
        inventoryElement.append(newLi)
      });
    }
    displayFeaturedItems();
  });
});


// BESTSELLER PRODUCT FILTER

const bestsellerButton = document.getElementById('bestseller-button');
bestsellerButton.addEventListener('click', (e) => {
  onValue(dbRef, function (data) {
    const allProducts = data.val();
    const inventory = Object.values(allProducts.inventory)
    const bestsellerProducts = inventory.filter((item) => {
      return item.category.bestseller === true;
    });
    // console.log(bestsellerProducts); filter completed

    const displayBestsellerItems = (displayFeatured) => {

      const inventoryElement = document.querySelector('#inventory')
      inventoryElement.innerHTML = '';


      bestsellerProducts.forEach((item) => {
        console.log(item)
        const newLi = document.createElement('li');
        const imgElement = document.createElement('img');
        newLi.innerHTML = `
        <img src=${item.url} alt="${item.alt}" />
        <h4>${item.title}</h4>
        <p>${item.price}<p>
        `
        newLi.append(imgElement);
        inventoryElement.append(newLi)
      });
    }
    displayBestsellerItems();
  });
});


// LATEST PRODUCT FILTER
      
const latestButton = document.getElementById('latest-button');
latestButton.addEventListener('click', (e) => {
  onValue(dbRef, function (data) {
    const allProducts = data.val();
    const inventory = Object.values(allProducts.inventory)
    const latestProducts = inventory.filter((item) => {
      return item.category.latest === true;
    });
    console.log(latestProducts);

    const displayLatestItems = (displayLatest) => {

      const inventoryElement = document.querySelector('#inventory')
      inventoryElement.innerHTML = '';


      latestProducts.forEach((item) => {
        console.log(item)
        const newLi = document.createElement('li');
        const imgElement = document.createElement('img');
        newLi.innerHTML = `
        <img src=${item.url} alt="${item.alt}" />
        <h4>${item.title}</h4>
        <p>${item.price}<p>
        `
        newLi.append(imgElement);
        inventoryElement.append(newLi)
      });
    }
    displayLatestItems();
  });
});


