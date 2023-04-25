// Step 1: Set up our FIREBASE database. This includes initializing our database and our dbRef.

// ALSO don't forget, we're using modules, which means we'll need to turn on our Live Server!
import firebaseInfo from './firebaseConfig.js';
import { getDatabase, ref, onValue, push, get } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js';
console.log("hello world!")
// global variables
const database = getDatabase(firebaseInfo);
const inventoryRef = ref(database, '/inventory');
const cartRef = ref(database, '/cart');

const ulElement = document.querySelector("#inventory");

const mapToArray = function (obj) {
  return Object.keys(obj).map(function (key) {
    return obj[key];
  });
}

onValue(inventoryRef, (data) => {
  const allProducts = data.val();
  const inventory = mapToArray(allProducts);

  console.log(inventory)

  const displayItems = (displayCategories) => {
    const inventoryElement = document.querySelector('#inventory')
    inventoryElement.innerHTML = '';

    displayCategories.forEach((item, index) => {
      const prodUrl = item.url;
      const prodAlt = item.alt;
      const prodTitle = item.title;
      const prodPrice = item.price;

      const id = item.id.split('')[1]
      const prodID = `product${id}`


      //const prodCart = item.icon
      console.log(prodID)

      const prodContainer = document.createElement('li');
      prodContainer.setAttribute('id', prodID)

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
    console.log(displayCategories)
  }

  // ALL PRODUCTS DISPLAY ON LOAD

  const displayAll = inventory.filter((item) => {
    return item.category.all === true;
  });
  console.log(displayAll)
  displayItems(displayAll);

  // ALL PRODUCTS BUTTON FILTER
  const allButton = document.querySelector('#all-button');
  allButton.addEventListener('click', function (e) {
    const allProducts = inventory.filter((item) => {
      return item.category.all === true;
    });
    console.log(allButton)
    displayItems(allProducts);
  });


  // FEATURED BUTTON PRODUCTS FILTER

  const featuredButton = document.querySelector('#featured-button');
  featuredButton.addEventListener('click', function (e) {
    const featuredProducts = inventory.filter((item) => {
      return item.category.featured === true && parseInt(item.stock) > 0;
    });
    console.log(featuredProducts)
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


  // LATEST BUTTON PRODUCTS FILTER

  const latestButton = document.querySelector('#latest-button');
  latestButton.addEventListener('click', function (e) {
    const latestProducts = inventory.filter((item) => {
      return item.category.latest === true;
    });

    displayItems(latestProducts);
  });
});


// EVENT LISTENER FOR ADD TO CART

ulElement.addEventListener('click', (e) => {
  console.log(e.target)
  // only run code if the user clicks on the BUTTON element
  if (e.target.nodeName === "BUTTON") {
    // get the id attribute value from the list item
    //  pass the id attribute value as an argument to our addToFavs function
    addToCart(e.target.parentElement.id)

  };
});


// ADD TO CART FUNCTION

const addToCart = (productID) => {

  const selectedRef = ref(database, `/inventory`);

  get(selectedRef)
    .then((snapshot) => {
      const inventory = snapshot.val()
      const addedProduct = inventory[productID]

      const showCart = {
        title: addedProduct.title,
        price: addedProduct.price,
        id: addedProduct.id,
        stock: addedProduct.stock
      }
  
    if (addedProduct.stock < 1) {
      alert('Item not available!')
    } else {
      // our new product added to cart object
      push(cartRef, showCart);
  
    }
  });
};

onValue(cartRef, (snapshot) => {
  const cartRefData = snapshot.val();
  const openCart = Object.keys(cartRefData || {}).length;

  const cart = document.getElementById("cart").innerHTML = openCart;
});
