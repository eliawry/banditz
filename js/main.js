
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
      slotStuffContainer,
      slotImageContainer,
      slotImage,
      slotName,
      pointCountContainer,
      pointCount;
  slotStuffContainer  = document.createElement("div");
  slotContainer  = document.createElement("div");
  slotImageContainer = document.createElement("div");
  slotImage = document.createElement("img");
  pointCountContainer = document.createElement("div");
  pointCount = 0;

  slotContainer.classList.add("slotMachineContainer");
  var width = 100.0 / numSlotMachines; 
  slotStuffContainer.style.width = width.toString() +  "%";
  slotStuffContainer.style.height = "325px";
  slotStuffContainer.id = "slot" + i;

  slotName = document.createElement("h4");
  slotName.innerHTML = "<br>slot machizzle " + i.toString();
  slotContainer.appendChild(slotName);
  
  pointCountContainer = document.createElement("h4");
  pointCountContainer.id = "points " + i.toString();
  pointCountContainer.innerHTML = "points" + pointCount.toString();
  slotContainer.appendChild(pointCountContainer);

  slotImage.src = "img/slots" + i.toString() + ".png";
  slotImage.classList.add("img-responsive");
  slotImageContainer.appendChild(slotImage);
  slotContainer.appendChild(slotImageContainer);

  slotStuffContainer.classList.add("slotMachineStuffContainer");
  slotStuffContainer.appendChild(slotContainer);
  slotStuffContainer.pointCount = 0;


  return slotStuffContainer;
};


function addSlotMachine(i) {
  var slotMachine = slotMachineGenerator(i);
  slotMachine.addEventListener('click', (function(machineNum) {
        return function() {
            slotMachine.pointCount += Math.random() < payoffProbability[i] 
              ? payoffAmount[i]
              : 0;
            $("#points" + i.toString())[0].innerHTML = "points " + slotMachine.pointCount;
        };
    })(i));
  $("#slots").append(slotMachine); 
}

window.onload = function() {
    for (var i = 1; i <= numSlotMachines; i++) {
        addSlotMachine(i);
    }}
