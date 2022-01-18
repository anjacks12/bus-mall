'use strict';

// global variables
const images = document.querySelector('section');
const results = document.getElementById('results');

let itemsArray = [];
let counter = 0;
let maxClicks = 4; //needs to be changed to 25

// constructor function to create objects
function Items(name, fileExtension = 'jpg') {
  this.views = 0;
  this.likes = 0;
  this.name = name;
  this.src = `img/${this.name}.${fileExtension}`;
  itemsArray.push(this);
}

// generate random number from itemArray
function randomItem() {
  //min [0] and max is [18]
  return Math.floor(Math.random() * (itemsArray.length));
}

// use random number to get images to appear randomly
function renderItems() {
  let item1 = randomItem();
  let item2 = randomItem();
  let item3 = randomItem();
  // set conditions so item1 !== item2 !== item3
  // do i need includes() ?
  while (item1 === item2) {
    item2 = randomItem();
  }
  // need to display 3 different items on page
  let image1 = document.getElementById('item1');
  image1.src = itemsArray[item1].src;
  image1.alt = itemsArray[item1].name;
  let image2 = document.getElementById('item2');
  image2.src = itemsArray[item2].src;
  image2.alt = itemsArray[item2].name;
  let image3 = document.getElementById('item3');
  image3.src = itemsArray[item3].src;
  image3.alt = itemsArray[item3].name;
  //counting how many times the items were viewed
  itemsArray[item1].views++;
  itemsArray[item2].views++;
  itemsArray[item3].views++;
}

//event handler for items
function handleLikes(event) {
  counter++;
  for (let i = 0; i < itemsArray.length; i++) {
    if (event.target.alt === itemsArray[i].name) {
      itemsArray[i].likes++;
      break;
    }
  }
  console.log(itemsArray);
  if (counter === maxClicks) {
    images.removeEventListener('click', handleLikes);
  }
  renderItems();
}

//event handler for results
function handleResults(event) {
  
}

new Items('bag');
new Items('banana');
new Items('bathroom');
new Items('boots');
new Items('breakfast');
new Items('bubblegum');
new Items('chair');
new Items('cthulhu');
new Items('dog-duck');
new Items('dragon');
new Items('pen');
new Items('pet-sweep');
new Items('scissors');
new Items('shark');
new Items('sweep', 'png');
new Items('tauntaun');
new Items('unicorn');
new Items('water-can');
new Items('wine-glass');

renderItems();

// add eventListener to images
images.addEventListener('click', handleLikes);

// add eventListener for results
results.addEventListener('click',handleResults);

/*
//create an array with random numbers to prevent same items from showing up?
let shuffledArray = [];
for (let i = 0; i < itemsArray.length; i++) {
  // run random numbers
  let num1 = randomItem();
  //push random numbers up to shuffledArray
  shuffledArray.push(num1);
  //use includes() method to check if random number is already there; if not then push to array; if already there then get another number?
}
//console.log(shuffledArray);
*/