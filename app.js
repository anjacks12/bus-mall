'use strict';
// global variables
const images = document.querySelector('section');

let itemsArray = [];
// constructor function to create objects
function Items(name,fileExtension = 'jpg') {
  this.views = 0;
  this.likes = 0;
  this.name = name;
  this.src = `img/${this.name}.${fileExtension}`;
  itemsArray.push(this);
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
new Items('sweep','png');
new Items('tauntaun');
new Items('unicorn');
new Items('water-can');
new Items('wine-glass');

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
  for (let i = 0; i < itemsArray.length; i++) {
    // need to display 3 different items on page
    //let image1 = document.getElementById('image1');
    image1.src = itemsArray[item1].src;
    //let image2 = document.getElementById('image2');
    image2.src = itemsArray[item2].src;
    //let image3 = document.getElementById('image3');
    image3.src = itemsArray[item3].src;
  }
}
renderItems();
