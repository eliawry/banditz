$(function(){
    var model = {
        init: function() {
          if (!localStorage.data) {
            var data = {};
            data.numSlotMachines = 5;
            data.slotMachines = [];
            for (var i = 0; i < data.numSlotMachines; i++) {
              data.slotMachines.push({
                'id': i,
                'payoffProbability': Math.random(),
                'payoffAmount': Math.floor(Math.random() * 100),
                'points': 0,
                'clicks': 0
              });
            }
            localStorage.data = JSON.stringify(data);
          }
        },
        addPoints: function(points, i) {
            var data = JSON.parse(localStorage.data);
            data.slotMachines[i].points += points;
            localStorage.data = JSON.stringify(data);
        },
        allSlotMachines: function() {
          return JSON.parse(localStorage.data).slotMachines;
        },
        slotMachine: function(i){
          return JSON.parse(localStorage.data).slotMachines[i];
        }
    };

    var controller = {
        spin: function(i) {
          var machine = model.slotMachine(i);
          if (Math.random() < machine.payoffProbability) {
              model.addPoints(machine.payoffAmount, i);
             }
            view.render();
        },

        init: function() {
            model.init();
            view.init();
        },

        getSlotMachines: function() {
          return model.allSlotMachines();
        },

        numSlotMachines: function() {
          return model.allSlotMachines().length;
        }
    };

    var view = {
        slotMachineGenerator: function(machine) {
          var i = machine.id;
          var name = (machine.id + 1).toString();
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

          slotContainer.classList.add("slotMachineContainer");
          slotStuffContainer.id = "slot" + i;
          var width = 100.0 / controller.numSlotMachines(); 
          slotStuffContainer.style.width = width.toString() +  "%";

          slotName = document.createElement("h4");
          slotName.innerHTML = "<br>slot machizzle " + (i + 1).toString();
          slotContainer.appendChild(slotName);
          
          pointCountContainer = document.createElement("h4");
          pointCountContainer.id = "points" + i.toString();
          pointCountContainer.innerHTML = "points 0";
          slotContainer.appendChild(pointCountContainer);

          slotImage.src = "img/slots" + name + ".png";
          slotImage.classList.add("img-responsive");
          slotImageContainer.appendChild(slotImage);
          slotContainer.appendChild(slotImageContainer);

          slotStuffContainer.classList.add("slotMachineStuffContainer");
          slotStuffContainer.appendChild(slotContainer);

          return slotStuffContainer;
        },
        init: function() {
            var slotMachines = controller.getSlotMachines();
            [].forEach.call(slotMachines, (function(m){
              var machine = view.slotMachineGenerator(m);
              machine.addEventListener('click', (function(machineNum) {
                    return function() {
                      controller.spin(machineNum);
                      view.render();
                    };
                })(m.id));
              $("#slots").append(machine);
            }));
            view.render();
        },
        render: function(){
            var slotMachines = controller.getSlotMachines();
            [].forEach.call(slotMachines, function(machine) {
              $("#points" + machine.id.toString())[0].innerHTML = "points " + machine.points;
            })
        }
    };
    controller.init();
});