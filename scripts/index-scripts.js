// Step 1: Set up our FIREBASE database. This includes initializing our database and our dbRef.

// ALSO don't forget, we're using modules, which means we'll need to turn on our Live Server!
import firebaseInfo from './firebaseConfig.js';
import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js';

const database = getDatabase(firebaseInfo);


// ALL DISPLAY ON PAGE LOAD

const inventoryRef = ref(database, '/inventory');
//console.log(inventoryRef); success

onValue(inventoryRef, (data) => {
//console.log(data.val()); success

  const inventoryData = data.val();
// console.log(inventoryData);

  for (let key in inventoryData) {
  //  console.log(inventoryData[key]); success

    const prodUrl = inventoryData[key].url
    const prodAlt = inventoryData[key].alt
    const prodTitle = inventoryData[key].title
    const prodPrice = inventoryData[key].price 
    //console.log (prodUrl, prodAlt, prodTitle, prodPrice) success

    const prodCard = document.createElement('li');
    prodCard.id = key
    //console.log(listItem) success

    const prodImage = document.createElement('img');
    prodImage.src = prodUrl
    prodImage.alt = prodAlt

    const itemTitle = document.createElement('h4');
    itemTitle.innerHTML = prodTitle

    const itemPrice = document.createElement('p');
    itemPrice.innerHTML = prodPrice

    const likeButton = document.createElement('button');
    likeButton.innerText = "♥"

    const addButton = document.createElement('button');
    addButton.innerText = "+"

    prodCard.append(prodImage, itemTitle, itemPrice, likeButton, addButton);

    document.querySelector('#inventory').append(prodCard)
  }
})


// BUTTON FILTER SECTION

const dbRef = ref(database);

const addToDatabase = (key, value) => {
  // Create a function that we pass  the info we want to store and the property name under which we want to store it
  const customRef = ref(database, key);
  // Set our info as the value of our ref
    onValue (customRef, value);
};

// ALL PRODUCT FILTER BUTTON

const allButton = document.getElementById('all-button');
allButton.addEventListener('click', (e) => {
  onValue(dbRef, function (data) {
    const allProducts = data.val();
    const inventory = Object.values(allProducts.inventory)
    const allFilterProducts = inventory.filter((item) => {
      return item.category.all === true;
    });
    console.log(allFilterProducts); 


    const displayAllItems = (displayAll) => {

      const inventoryElement = document.querySelector('#inventory')
      inventoryElement.innerHTML = '';


      allFilterProducts.forEach((item) => {
        console.log(item)
        const newLi = document.createElement('li');
        const imgElement = document.createElement('img');
        newLi.innerHTML = `
        <img src=${item.url} alt="${item.alt}" />
        <h4>${item.title}</h4>
        <p>${item.price}<p>
        <button>${item.heartIcon}</button>
        <button>${item.plusIcon}</button>
        `
        newLi.append(imgElement);
        inventoryElement.append(newLi)
      });
    }
    displayAllItems();
  });
});

// FEATURED PRODUCT FILTER BUTTON



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
        <button>${item.heartIcon}</button>
        <button>${item.plusIcon}</button>
        `
        newLi.append(imgElement);
        inventoryElement.append(newLi)
      });
    }
    displayFeaturedItems();
  });
});


// BESTSELLER PRODUCT FILTER BUTTON

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
        <button>${item.heartIcon}</button>
        <button>${item.plusIcon}</button>
        `
        newLi.append(imgElement);
        inventoryElement.append(newLi)
      });
    }
    displayBestsellerItems();
  });
});


// LATEST PRODUCT FILTER BUTTON
      
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
        <button>${item.heartIcon}</button>
        <button>${item.plusIcon}</button>
        `
        newLi.append(imgElement);
        inventoryElement.append(newLi)
      });
    }
    displayLatestItems();
  });
});



