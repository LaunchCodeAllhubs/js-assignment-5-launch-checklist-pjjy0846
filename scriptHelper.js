// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   let missionTarget = document.getElementById ("missionTarget");
   missionTarget.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name} </li>
                    <li>Diameter: ${diameter} </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">
                 `
}

function validateInput(testInput) {
    if (testInput === "" || testInput === null || testInput === 0) {
        return "Empty";
    } else if ((!isNaN(Number(testInput)))) {
        return "Is a Number";
    } else {
        return "Not a Number";
    }
}


function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
   let pilotStatus = document.getElementById ("pilotStatus");
   let copilotStatus = document.getElementById ("copilotStatus");
   let fuelStatus = document.getElementById ("fuelStatus");
   let launchStatus = document.getElementById ("launchStatus");
   let cargoStatus = document.getElementById ("cargoStatus");

   // Making sure all fields are filled
   if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || 
   validateInput(fuelLevel) === "Empty" || validateInput(cargoMass) === "Empty"){
    alert ("All fields are required");
   }
   else if (validateInput(fuelLevel) === "Not a Number" || validateInput(cargoMass)==="Not a Number"){
    alert ("Enter numerical values for Fuel level and Cargo mass")
   } else if (validateInput(pilot)=== "Is a Number" || validateInput(copilot) === "Is a Number"){
    alert ("Do not enter numbers for name of pilot or co-pilot");
   } else {
    pilotStatus.innerHTML = "Pilot " + pilot + " is ready";
    copilotStatus.innerHTML = "Co-pilot " + copilot + " is ready";
    list.style.visibility = "hidden";
   }

   if (Number(fuelLevel) < 10000){
    fuelStatus.innerHTML = "Not enough fuel";
    launchStatus.innerHTML = "Shuttle not ready for launch";
    launchStatus.style.color = "red"
    list.style.visibility = "visible";
   } if (Number(cargoMass) > 10000){
    cargoStatus.innerHTML = "Cargo too heavy for takeoff";
    launchStatus.innerHTML = "Shuttle not ready for launch";
    launchStatus.style.color = "red";
    list.style.visibility = "visible";
   } if (Number(fuelLevel) >= 10000 && Number(cargoMass) <= 10000){
    fuelStatus.innerHTML = "Enough fuel for journey";
    cargoStatus.innerHTML = "Cargo light enough for takeoff";
    launchStatus.innerHTML = "Shuttle ready for launch";
    launchStatus.style.color = "green";
    list.style.visibility = "visible";
   }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json()

        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let index = Math.floor(Math.random() * planets.length);
    return planets [index];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
