const clicker = document.querySelector('#clicker');
const DOMScore = document.querySelector('#score');
let queryResources = document.querySelectorAll('.sidebarEntry');
let resource = 0;

// Amount resources will raise score per second
resourceQuantities = {
  resource1: 1,
  resource2: 5,
  resource3: 20,
}

resourcesBought = {
  resource1: 0,
  resource2: 0,
  resource3: 0,
}

// Map IDs to resources bought ID so we don't quert over and over
resourceIDtoBought = {};
for (let i = 0; i < queryResources.length; i++) {
  idOfSelector = queryResources[i].id;

  boughtID = idOfSelector + 'Bought';
  const score = document.querySelector(`#${boughtID}`);

  resourceIDtoBought[idOfSelector] = score;
}
console.log(resourceIDtoBought)




// Add functionality
function updateScore() {
  resource = resource + 1;
  DOMScore.textContent = `Score: ${resource}`;
}

clicker.addEventListener('click', updateScore);

function updateResource(evt) {
  resourceID = evt.target.id;

  resourcesBought[resourceID] += 1;
  console.log('event target', evt.target)
  console.log('ID', resourceID)
  console.log('object', resourceIDtoBought)
  resourceIDtoBought[resourceID].textContent = resourcesBought[resourceID];
}

for (let i = 0; i < queryResources.length; i++) {
  queryResources[i].addEventListener('click', updateResource);
}