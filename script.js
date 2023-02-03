const clicker = document.querySelector('#clicker');
const DOMScore = document.querySelector('#score');
let queryProducers = document.querySelectorAll('.sidebarEntry');
let resource = 0;
let scaling = 2.5; // How much the cost goes up after each buy, 2.5 seems good

// Amount resources will raise score per second
const producers = {
  producer1: {
      yield: 1,
      bought: 0,
      cost: 1
  },
  producer2: {
      yield: 5,
      bought: 0,
      cost: 40
  },
  producer3: {
    yield: 20,
    bought: 0,
    cost: 200
  },
  producer4: {
    yield: 100,
    bought: 0,
    cost: 1000
  },
  producer5: {
    yield: 500,
    bought: 0,
    cost: 4000
  },
  producer6: {
    yield: 1500,
    bought: 0,
    cost: 12000
  },
  producer7: {
    yield: 6000,
    bought: 0,
    cost: 36000
  },
  producer8: {
    yield: 60000,
    bought: 0,
    cost: 60000
  }
}

// Map elments to object so we don't need toq uery constantly
for (key in producers) {
  let producer = producers[key];

  boughtID = key + 'Bought';
  const score = document.querySelector(`#${key} .producerScore`);
  
  const cost = document.querySelector(`#${key} .cost`);

  producer.scoreElement = score;
  producer.costElement = cost;
}


function updateDomScore() {
  DOMScore.textContent = `Score: ${resource}`;
}


// Add event listeners
function updateScoreOnClick() {
  resource = resource + 1;
  updateDomScore();
}

clicker.addEventListener('click', updateScoreOnClick);


function updateResource(evt) {
  let resourceID = evt.currentTarget.id;
  let producer = producers[resourceID];

  if (resource >= producer.cost) {
    resource = resource - producer.cost;
    updateDomScore();

    producer.cost = Math.round(scaling * producer.cost,);
    producer.costElement.textContent = `Cost: ${producer.cost}`;

    producer.bought += 1;
    producer.scoreElement.textContent = producer.bought;
  }
}

for (let i = 0; i < queryProducers.length; i++) {
  const producerElement = queryProducers[i];
  producerElement.addEventListener('click', updateResource);


  const producerID = producerElement.id;
  producers[producerID].producerElement = producerElement;

}


// Interval for producer checks
function producerIntervals() {
  updateResourceFromProducers();
  checkShowProducer();
}

function updateResourceFromProducers() {
  let resourcesToAdd = 0;
  for (key in producers) {
    const producer = producers[key];

    amountToAdd = producer.yield * producer.bought;
    resourcesToAdd += amountToAdd;
  }

  resource += resourcesToAdd;
  updateDomScore();
}

const hiddenProducers = [...document.querySelectorAll('.producerHidden')];

function checkShowProducer() {
  for (let i = 0; i < hiddenProducers.length; i++) {
    let hiddenProducer = hiddenProducers[i];
    let producerID = hiddenProducer.id;
    let producerCost = producers[producerID].cost;


    if (resource >= producerCost / 2) {
      hiddenProducer.classList.remove('producerHidden');
      hiddenProducers.splice(i, 1);
      i--;
    }
  }
}


function checkBuyProducer() {
  for (key in producers) {
    let producer = producers[key];
    let producerElementClasses = producer.producerElement.classList;
    let containsCanBuy = producerElementClasses.contains('producerCanBuy');

    if (resource >= producer.cost && !containsCanBuy) {
      producerElementClasses.add('producerCanBuy');
    } else if (resource < producer.cost && containsCanBuy) {
      producerElementClasses.remove('producerCanBuy');
    }
  }
}

setInterval(producerIntervals, 1000);
// test interval
// setInterval(producerIntervals, 100);

setInterval(checkBuyProducer,100);


//Set up about page listeners
function addAboutPageListeners() {
  const aboutMainPage = document.querySelector('#rightHeader');
  const aboutClosePage = document.querySelector('#closeAbout');

  const aboutPage = document.querySelector('#aboutPage');

  aboutMainPage.addEventListener('click', () => {
    aboutPage.style.display = 'flex';
  })

  aboutClosePage.addEventListener('click', () => {
    aboutPage.style.display = 'none';
  })
}

addAboutPageListeners();
