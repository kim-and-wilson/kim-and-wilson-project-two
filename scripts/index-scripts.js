// Step 1: Set up our FIREBASE database. This includes initializing our database and our dbRef.

// ALSO don't forget, we're using modules, which means we'll need to turn on our Live Server!
import firebaseInfo from './firebaseConfig.js';
import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js';

const database = getDatabase(firebaseInfo);

const dbRef = ref(database)
  onValue(dbRef, (data) => {
    const allProducts = data.val();
    const inventory = Object.values(allProducts.inventory)
    console.log(inventory)


    const displayItems = (displayCategories) => {
      const inventoryElement = document.querySelector('#inventory')
      inventoryElement.innerHTML = '';

     displayCategories.forEach((item) => {
        const prodUrl = item.url;
        const prodAlt = item.alt;
        const prodTitle = item.title;
        const prodPrice = item.price;

        const prodCard = document.createElement('li');
        const prodImage = document.createElement('img');
        prodImage.src = prodUrl;
        prodImage.alt = prodAlt;

        const itemTitle = document.createElement('h4');
        itemTitle.innerHTML = prodTitle;

        const itemPrice = document.createElement('p');
        itemPrice.innerHTML = prodPrice

        const likeButton = document.createElement('button');
        likeButton.innerText = "♥"

        const addButton = document.createElement('button');
        addButton.innerText = "+"

        prodCard.append(prodImage, itemTitle, itemPrice, likeButton, addButton);

        document.querySelector('#inventory').append(prodCard);
      });      
    };

    // ALL PRODUCTS FILTER WITH DISPLAY ON LOAD
    const allButton = document.querySelector('#all-button');
    allButton.addEventListener('click', function (e) {
      const allProducts = inventory.filter((item) => {
        return item.category.all === true;
      });
      displayItems(allProducts);
      // console.log(allProducts)
    });

    document.addEventListener('DOMContentLoaded', (e) => {
      allButton.addEventListener('click', function (e) {
        const allProducts = inventory.filter((item) => {
          return item.category.all === true;
        });
        displayItems(allProducts);
        // console.log(allProducts)
      });
    })
    allButton.click();
    

    // FEATURED PRODUCTS FILTER

    const featuredButton = document.querySelector('#featured-button');
    featuredButton.addEventListener('click', function (e) {
      const featuredProducts = inventory.filter((item) => {
        return item.category.featured === true;
      });
      displayItems(featuredProducts);
      // console.log(featuredProducts)
    });


    // BESTSELLER PRODUCTS FILTER
    const bestsellerButton = document.querySelector('#bestseller-button');
    bestsellerButton.addEventListener('click', function (e) {
      const bestsellerProducts = inventory.filter((item) => {
        return item.category.bestseller === true;
      });
      displayItems(bestsellerProducts);
      // console.log(bestsellerProducts)
    });


    // LATEST PRODUCTS FILTER

    const latestButton = document.querySelector('#latest-button');
    latestButton.addEventListener('click', function (e) {
      const latestProducts = inventory.filter((item) => {
        return item.category.latest === true;
      });
      displayItems(latestProducts);
      // console.log(latestProducts)
    });
 });