
var numSlotMachines = 5;
//todo: This should probably be done with classes but ehhhh
//if i was being a good person i'd use react anyway
var earnedSoFar = Array.apply(null, Array(numSlotMachines)).map(Number.prototype.valueOf,0);
var payoffProbability = [];
var payoffAmount = [];
for (var i = 0; i < numSlotMachines; i++) {
    payoffProbability.push(Math.random());
    payoffAmount.push(Math.floor(Math.random() * 100))
}

// Generate a slot machine div
var slotMachineGenerator = function(i) {
  var slotContainer,
      slotImageContainer,
      slotImage,
      slotName,
      pointCountContainer,
      pointCount;

  slotContainer  = document.createElement("div");
  slotImageContainer = document.createElement("div");
  slotImage = document.createElement("img");
  pointCountContainer = document.createElement("div");
  pointCount = 0;

  slotContainer.classList.add("randomPizzaContainer");
  slotContainer.style.width = (100.0 / numSlotMachines).asString() +  "%";
  slotContainer.style.height = "325px";
  slotContainer.id = "slot" + i;

  slotImage.src = "img/slots" + i.asString() + ".png";
  slotImage.classList.add("img-responsive");
  slotImageContainer.appendChild(slotImage);
  slotContainer.appendChild(slotImageContainer);

  slotName = document.createElement("h4");
  slotName.innerHTML = "slot machizzle" + i.asString();
  slotContainer.appendChild(slotName);
  
  pointCountContainer = document.createElement("h4");
  pointCountContainer.id = "points" + i.asString();
  pointCountContainer.innerHTML = "points" + pointCount.asString();
  slotContainer.appendChild(pointCountContainer);


  return slotContainer;
};


function addSlotMachine(i) {
  var slotMachine = slotMachineGenerator(i);
  slotMachine.addEventListener('click', (function(machineNum) {
        return function() {
            slotMachine.points += Math.random() < payoffProbability[i] 
              ? payoffAmount[i]
              : 0;
            $("#points" + i.asString).innerHTML = "points" + slotMachine.points;
        };
    })(i)); 
  
}
function init() {
    for (var i = 1; i <= numSlotMachines; i++) {
        addSlotMachine(i);
    }
}
init();