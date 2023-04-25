import firebaseInfo from './firebaseConfig.js';
import { getDatabase, ref, onValue, push, get } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js';

// global variables
const database = getDatabase(firebaseInfo);
const inventoryRef = ref(database, '/inventory');
const cartRef = ref(database, '/cart');

const ulElement = document.querySelector("#inventory");

const mapToArray = (obj) => {
  return Object.keys(obj).map((key) => {
    return obj[key];
  });
}

onValue(inventoryRef, (data) => {
  const allProducts = data.val();
  const inventory = mapToArray(allProducts);

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
      addButton.innerText = "+"

      prodContainer.append(prodImage, itemTitle, itemPrice, likeButton, addButton);

      document.querySelector('#inventory').append(prodContainer);
    });
  };

  // ALL PRODUCTS DISPLAY ON LOAD

  const displayAll = inventory.filter((item) => {
    return item.category.all === true;
  });
  displayItems(displayAll);

  // ALL PRODUCTS BUTTON FILTER
  const allButton = document.querySelector('#all-button');
  allButton.addEventListener('click', (e) => {
    const allProducts = inventory.filter((item) => {
      return item.category.all === true;
    });
    displayItems(allProducts);
  });


  // FEATURED BUTTON PRODUCTS FILTER

  const featuredButton = document.querySelector('#featured-button');
  featuredButton.addEventListener('click', (e) => {
    const featuredProducts = inventory.filter((item) => {
      return item.category.featured === true && parseInt(item.stock) > 0;
    });
    displayItems(featuredProducts);
  });


  // BESTSELLER PRODUCTS FILTER

  const bestsellerButton = document.querySelector('#bestseller-button');
  bestsellerButton.addEventListener('click', (e) => {
    const bestsellerProducts = inventory.filter((item) => {
      return item.category.bestseller === true && parseInt(item.stock) > 0;
    });
    displayItems(bestsellerProducts);
  });


  // LATEST BUTTON PRODUCTS FILTER

  const latestButton = document.querySelector('#latest-button');
  latestButton.addEventListener('click', (e) => {
    const latestProducts = inventory.filter((item) => {
      return item.category.latest === true && parseInt(item.stock) > 0;
    });
    displayItems(latestProducts);
  });
});


// EVENT LISTENER FOR ADD TO CART

ulElement.addEventListener('click', (e) => {
  if (e.target.nodeName === "BUTTON") {
    addToCart(e.target.parentElement.id);
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
      alert('Item not available! Please check back at a later time!')
    } else {
      push(cartRef, showCart);
    }
  });
};


// SNAPSHOT OF NUMBER OF CART ITEMS

onValue(cartRef, (snapshot) => {
  const cartRefData = snapshot.val();
  const openCart = Object.keys(cartRefData || {}).length;

  const cart = document.getElementById("cart").innerHTML = openCart;
});


// HAMBURGER MENU

const button = document.getElementById("ham-button");
const nav = document.getElementById("main-menu");

button.addEventListener('click', () => {
  nav.classList.toggle('show');
});
