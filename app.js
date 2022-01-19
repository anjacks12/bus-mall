'use strict';

// global variables
const images = document.querySelector('section');
const results = document.getElementById('results');

let itemsArray = [];
let counter = 0;
let maxClicks = 4; //needs to be changed to 25
// array to hold 6 random items for display
let randomNumberArray = [];

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
// got help from Andres from class with the repl.it example in class
function renderItems() {
  while (randomNumberArray.length < 6) {
    let item = randomItem();
    if (!randomNumberArray.includes(item)) {
      randomNumberArray.push(item);
    }
  }
  //console.log(randomNumberArray);

  let item1 = randomNumberArray.shift();
  let item2 = randomNumberArray.shift();
  let item3 = randomNumberArray.shift();

  //console.log('item1', item1, 'item2', item2, 'item3', item3);
  // // need to display 3 different items on page
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

  // chart to show results after 25 clicks have been done
  // for (let i = 0; i < itemsArray.length; i++) {
  //   let itemNames = [];
  //   let itemViews = [];
  //   let itemLikes = [];

  //   itemNames.push(itemsArray[i].name);
  //   console.log(itemNames);
  //}
  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];
  const data = {
    labels: labels,
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };

  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
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
  if (counter === maxClicks) {
    images.removeEventListener('click', handleLikes);
    //results.className = 'view-results';
  } else {
    renderItems();
  }
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
