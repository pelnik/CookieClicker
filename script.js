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
  } 
}

// Map IDs to resources bought ID so we don't query over and over
for (key in producers) {
  let producer = producers[key];

  boughtID = key + 'Bought';
  const score = document.querySelector(`#${key} .producerScore`);
  
  const cost = document.querySelector(`#${key} .cost`);

  producer.scoreElement = score;
  producer.costElement = cost;
}
console.log(producers)

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
  queryProducers[i].addEventListener('click', updateResource);
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

setInterval(updateResourceFromProducers, 1000);

//Set up about age listeners

function addAboutPageListeners() {
  const aboutMainPage = document.querySelector('#rightHeader');
  const aboutClosePage = document.querySelector('#closeAbout');

  const aboutPage = document.querySelector('#aboutPage');

  aboutMainPage.addEventListener('click', () => {
    console.log(aboutMainPage.style.display)
    aboutPage.style.display = 'flex';
  })

  aboutClosePage.addEventListener('click', () => {
    aboutPage.style.display = 'none';
  })
}

addAboutPageListeners();