// Step 1: Set up our FIREBASE database. This includes initializing our database and our dbRef.

// ALSO don't forget, we're using modules, which means we'll need to turn on our Live Server!
import firebaseInfo from './firebaseConfig.js';
import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js';

const database = getDatabase(firebaseInfo);


const inventoryRef = ref(database, '/inventory');

//console.log(inventoryRef); success

onValue(inventoryRef, (data) => {
//console.log(data.val()); success

const inventoryData = data.val();
console.log(inventoryData);

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

const itemTitle = document.createElement('h3');
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