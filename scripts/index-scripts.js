// Step 1: Set up our FIREBASE database. This includes initializing our database and our dbRef.

// ALSO don't forget, we're using modules, which means we'll need to turn on our Live Server!
import firebaseInfo from './firebaseConfig.js';
import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js';

const database = getDatabase(firebaseInfo);

const dbRef = ref(database)
  onValue(dbRef, (data) => {
    const allProducts = data.val();
    const inventory = Object.values(allProducts.inventory)
    //console.log(inventory)


    const displayItems = (displayCategories) => {
      const inventoryElement = document.querySelector('#inventory')
      inventoryElement.innerHTML = '';

     displayCategories.forEach((item) => {
        const prodUrl = item.url;
        const prodAlt = item.alt;
        const prodTitle = item.title;
        const prodPrice = item.price;
  

        const prodContainer = document.createElement('li');
        const prodImage = document.createElement('img');
        prodImage.src = prodUrl;
        prodImage.alt = prodAlt;

        const itemTitle = document.createElement('h4');
        itemTitle.innerHTML = prodTitle;

        const itemPrice = document.createElement('p');
        itemPrice.innerHTML = prodPrice

        const likeButton = document.createElement('button');
        likeButton.classList.add('likeButton');
        likeButton.innerText = "♥"

        const addButton = document.createElement('button');
        addButton.classList.add('addButton');
        addButton.setAttribute('id', 'addButton');
        //addButton.setAttribute('type', 'submit');
        addButton.innerText = "+"

        prodContainer.append(prodImage, itemTitle, itemPrice, likeButton, addButton);

        document.querySelector('#inventory').append(prodContainer);
      });      
    };

    // ALL PRODUCTS FILTER WITH DISPLAY ON LOAD

    const allButton = document.querySelector('#all-button');
    allButton.addEventListener('click', function (e) {
      const allProducts = inventory.filter((item) => {
        return item.category.all === true;
      });
      displayItems(allProducts);
    });

    document.addEventListener('DOMContentLoaded', (e) => {
      allButton.addEventListener('click', function (e) {
        const allProducts = inventory.filter((item) => {
          return item.category.all === true;
        });
        displayItems(allProducts);
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
    });


    // BESTSELLER PRODUCTS FILTER
    
    const bestsellerButton = document.querySelector('#bestseller-button');
    bestsellerButton.addEventListener('click', function (e) {
      const bestsellerProducts = inventory.filter((item) => {
        return item.category.bestseller === true;
      });
      displayItems(bestsellerProducts);
    });


    // LATEST PRODUCTS FILTER

    const latestButton = document.querySelector('#latest-button');
    latestButton.addEventListener('click', function (e) {
      const latestProducts = inventory.filter((item) => {
        return item.category.latest === true;
      });
      displayItems(latestProducts);
    });


   // ADD TO CARY - display/increase the number of items in the cart as they are added (+ button is clicked)
    

    const cart = document.getElementById("cart");
    document.getElementById("addButton").onclick = function add_items(){const item =cart.innerText;cart.innerText=parseInt(item, 10)+1}


 });


  // create span to run total cart tally - done
  // click event on addButton - only working on product 1 - loop
 
 // when product is added, alert 'added' somehow

// document.getElementById("addButton").addEventListener("click", myFunction);

    // function myFunction() {
    //   document.getElementById("addButton").innerHTML = "Added";
    // }




  //“Add to cart” action to move a product into the cart table.
  //Load and change the shopping cart status on each cart action.
  //Update total cart items and total price on each change.
  //Empty the cart by clearing the session.