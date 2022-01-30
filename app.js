'use strict';

// global variables
const images = document.querySelector('section');
const results = document.getElementById('results');

let itemsArray = [];
let counter = 0;
let maxClicks = 4; //needs to be changed to 25

let resultsArray = [];

// array to hold 6 random items for display
let randomNumberArray = [];

// constructor function to create objects
function Items(views, likes, name, fileExtension) {
  this.views = views;
  this.likes = likes;
  this.name = name;
  this.fileExtension = fileExtension;
  this.src = `img/${this.name}.${fileExtension}`;
}

// create instances of objects (items)
function createItems(views, likes, name, fileExtension) {
  let itemObject = new Items(views, likes, name, fileExtension);
  itemsArray.push(itemObject);
}

// generate random number from itemArray
function randomItem() {
  //min [0] and max is [18]
  return Math.floor(Math.random() * (itemsArray.length));
}

// use random number to get images to appear randomly
// got help from Andres from class with the repl.it example in class
function renderItems() {
  let randomNumberArray = [];
  while (randomNumberArray.length < 6) {
    let item = randomItem();
    if (!randomNumberArray.includes(item)) {
      randomNumberArray.push(item);
    }
  }
  for (let i = 0; i < randomNumberArray.length; i++) {
    let item1 = randomNumberArray.shift();
    let item2 = randomNumberArray.shift();
    let item3 = randomNumberArray.shift();
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
  }
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
    renderResults();
  } else {
    renderItems();
  }
  //console.log('end eventHandler',itemsArray);
}


// create function to save new itemArray data; call in renderResults()?
function storeItems(arr) {
  // let saveItems = Key Name
  let resultsData = JSON.stringify(arr);
  localStorage.setItem('saveItems', resultsData);
  //console.log('resultsData',resultsData);
}


// create render function to retrieve result data
function renderData() {
  //check to see if there is data in localStorage
  let findData = localStorage.getItem('saveItems');
  let showData = JSON.parse(findData);
  if (findData) {
    for (let order of showData) {
      let views = order.views;
      let likes = order.likes;
      let name = order.name;
      let fileExtension = order.fileExtension;
      let src = order.src;
      createItems(views, likes, name, fileExtension, src);
      //console.log('showData',showData);
    }
  } if (!findData) {
    //get initial result if no votes have been done before
    initialResults();
  }
  renderItems();
}


function renderResults() {
  resultsArray = itemsArray;
  //console.log(resultsArray);
  storeItems(resultsArray);

  let itemNames = [];
  let itemViews = [];
  let itemLikes = [];

  for (let i = 0; i < itemsArray.length; i++) {
    itemNames.push(itemsArray[i].name);
    itemViews.push(itemsArray[i].views);
    itemLikes.push(itemsArray[i].likes);
  }

  // chart to show results after 25 clicks have been done
  const data = {
    labels: itemNames,
    datasets: [{
      label: 'No. of views',
      data: itemViews,
      backgroundColor: [
        'rgba(255, 205, 86, 0.4)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
      ],
      borderWidth: 1
    },
    {
      label: 'No. of likes',
      data: itemLikes,
      backgroundColor: [
        'rgba(153, 102, 255, 0.6)'
      ],
      borderColor: [
        'rgb(0, 0, 0)'
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
          beginAtZero: true,
        },
      },
      layout: {
        padding: {
          bottom: 10
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Most Popular Items',
          font: {
            size: 20
          }
        },
        legend: {
          labels: {
            font: {
              size: 15
            }
          }
        },
        tooltip: {
          yAlign: 'bottom',
          displayColors: false,
        },
      },
    },
  };

  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
}

function initialResults() {
  createItems(0,0,'bag','jpg');
  createItems(0,0,'banana','jpg');
  createItems(0,0,'bathroom','jpg');
  createItems(0,0,'boots','jpg');
  createItems(0,0,'breakfast','jpg');
  createItems(0,0,'bubblegum','jpg');
  createItems(0,0,'chair','jpg');
  createItems(0,0,'cthulhu','jpg');
  createItems(0,0,'dog-duck','jpg');
  createItems(0,0,'dragon','jpg');
  createItems(0,0,'pen','jpg');
  createItems(0,0,'pet-sweep','jpg');
  createItems(0,0,'scissors','jpg');
  createItems(0,0,'shark','jpg');
  createItems(0,0,'sweep', 'png');
  createItems(0,0,'tauntaun','jpg');
  createItems(0,0,'unicorn','jpg');
  createItems(0,0,'water-can','jpg');
  createItems(0,0,'wine-glass','jpg');
}

renderData();

// add eventListener to images
images.addEventListener('click', handleLikes);
