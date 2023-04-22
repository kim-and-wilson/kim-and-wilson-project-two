// Step 1: Set up our FIREBASE database. This includes initializing our database and our dbRef.

// ALSO don't forget, we're using modules, which means we'll need to turn on our Live Server!
import firebaseInfo from './firebaseConfig.js';
import { getDatabase, ref, onValue, push } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js';

const database = getDatabase(firebaseInfo);
const dbRef = ref(database);

// global variables

// reference to the inventory in our database
const inventoryRef = ref(database, '/inventory');

// reference to our cart in firebase
const cartRef = ref(database, '/cart')
// use if we display the items in the cart (stretch)
const ulElement = document.querySelector("#inventory");



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
        const prodId = item.id;
  

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
        addButton.innerHTML = prodId;
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
    

    // const cart = document.getElementById("cart");
    // document.getElementById("addButton").onclick = function add_items(){const item =cart.innerText;cart.innerText=parseInt(item, 10)+1}

    ulElement.addEventListener('click', (event) => {

      // only run code if the user clicks on the BUTTON element
      if (event.target.tagName === "BUTTON") {
         // get the id attribute value from the list item
        //  pass the id attribute value as an argument to our addToFavs function
      addToCart(event.target.parentElement.id)
    
    }
    })
    
    // create a new object that represents a new cart
    // this new object will have some of the properties of the original inventory object
    // push this new object to a new location in firebase (/addToCart section)
    
    const addToCart = (selectedProduct) => {
    
      // create a reference to the specific product added to cart in firebase
      const chosenRef = ref(database, `/inventory/${selectedProduct}`);
    
    
    get(chosenRef)
      .then((snapshot) => {
    const allProducts = snapshot.val()
    console.log(allProducts)
    
    // our new product added to cart object
    const showCart = {
      title: allProducts.title,
      price: allProducts.price,
      id: allProducts.id
    }
    console.log(showCart)
    push(cartRef, showCart)
      })
    
    }



 });






// // display our data onto the page
// //onValue(animalRef = the location aka the node, (data))
// onValue(inventoryRef, (data) => {

//   ulElement.innerHTML= "";

//   const productData = data.val();

//   //using FOR IN, loop over each item in our data object
//   // create some html and append it to the page
//   for (let key in productData) {
//     //console.log(productData[key])

//   // start creating our html
//   const  listItem = document.createElement('li');
//   listItem.id = key;

//     // storing the img url and alt text in variable
//     const prodTitle = productData[key].title;
//     const prodPrice = productData[key].price;
//     // const imgUrl = productData[key].url;
//     // const imgAlt = productData[key].alt;


//     const itemTitle = document.createElement('h4');
//     itemTitle.innerHTML = prodTitle;

//     const itemPrice = document.createElement('p');
//     itemPrice.innerHTML = prodPrice

//     // creating the image element and adding the attributes like this instead of using listItem.innerHTML = `` like in Owen's codealong
//     // const prodImage = document.createElement('img');
//     // prodImage.src = imgUrl;
//     // prodImage.alt = imgAlt;

//     const addButton = document.createElement('button');
//     addButton.id = "button";
   
        
//     // appending the image, title and price to our list item
//     listItem.append(itemTitle, itemPrice, addButton);
//     console.log(listItem);

//     // append the list item to the ul that exisits on the page
//     ulElement.append(listItem);

    
// //     if (animalData[key].isFavourited === true) {
// // likeButton.setAttribute('disabled', "");

// //     }
//   }
// });
  
  // add event listener to <ul> and take advantage of bubbling to monitor for clicks on the <li>
ulElement.addEventListener('click', (event) => {

  // only run code if the user clicks on the BUTTON element
  if (event.target.tagName === "BUTTON") {
     // get the id attribute value from the list item
    //  pass the id attribute value as an argument to our addToFavs function
  addToCart(event.target.parentElement.id)

}
})

// create a new object that represents a new cart
// this new object will have some of the properties of the original inventory object
// push this new object to a new location in firebase (/addToCart section)

const addToCart = (selectedProduct) => {

  // create a reference to the specific product added to cart in firebase
  const chosenRef = ref(database, `${selectedProduct}`);


get(chosenRef)
  .then((snapshot) => {
const productData = snapshot.val()
console.log(productData)

// our new product added to cart object
const showCart = {
  title: productData.title,
  price: productData.price,
  id: productData.id
}
console.log(showCart)
push(cartRef, showCart)
  })

}