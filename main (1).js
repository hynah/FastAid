// Function to handle geolocation
function getLocation() {
  return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
              var latitude = position.coords.latitude;
              var longitude = position.coords.longitude;
              var accuracy = position.coords.accuracy; // Accuracy of the location in meters
              // Resolve the promise with the location data
              resolve({
                  latitude: latitude,
                  longitude: longitude,
                  accuracy: accuracy
              });
          }, function(error) {
              switch(error.code) {
                  case error.PERMISSION_DENIED:
                      reject("User denied the request for Geolocation.");
                      break;
                  case error.POSITION_UNAVAILABLE:
                      reject("Location information is unavailable.");
                      break;
                  case error.TIMEOUT:
                      reject("The request to get user location timed out.");
                      break;
                  case error.UNKNOWN_ERROR:
                      reject("An unknown error occurred.");
                      break;
              }
          });
      } else {
          reject("Geolocation is not supported by this browser.");
      }
  });
}

// Add event listener to the div
document.getElementById("getLocationButton").addEventListener("click", function() {
  // Call getLocation and handle the location data
  getLocation()
      .then(locationData => {
          // Display the location data in a div
          document.getElementById("locationInfo").innerHTML = `
              Latitude: ${locationData.latitude}<br>
              Longitude: ${locationData.longitude}<br>
              Accuracy: ${locationData.accuracy} meters
          `;
      })
      .catch(error => {
          // Display any errors in a div
          document.getElementById("locationInfo").textContent = error;
      });
});

// Get the container div
var container = document.getElementById("locationInfo");

// Wait for the content to load
window.addEventListener("DOMContentLoaded", function() {
    // Add extra padding to the top
    container.style.paddingTop = "20px";
    container.style.paddingBottom = "20px";
});

function speak() {
  // Create a new speech synthesis object
  var synth = window.speechSynthesis;

  // Create a new speech synthesis utterance with the sentence you want to speak
  var utterance = new SpeechSynthesisUtterance("Hello, I am speaking this sentence.");

  // Get the list of available voices
  var voices = synth.getVoices();

  // Find a female voice (you can adjust this loop to find the specific female voice you want)
  var femaleVoice = voices.find(function(voice) {
      return voice.name.includes('female');
  });

  // Set the voice to the found female voice (or any female voice you prefer)
  utterance.voice = femaleVoice;

  // Speak the sentence
  synth.speak(utterance);
}
function executeTask() {
    console.log("Task executed.");

    const box = document.getElementById('box');

    // Add the class to trigger the animation
    box.classList.add('enlarge-shrink');

    // Stop the animation after 3 seconds
    setTimeout(() => {
        box.classList.remove('enlarge-shrink');
    }, 3000);
}

function startTaskWhenTimerExpires(targetTime) {
    console.log("Timer started.");

    const currentTime = performance.now();
    const timeUntilTarget = targetTime - currentTime;

    if (timeUntilTarget <= 0) {
        console.log("Target time already reached.");
        executeTask();
    } else {
        console.log("Waiting for target time...");
        setTimeout(executeTask, timeUntilTarget);
    }
}

// Set the time (in milliseconds) after which you want the task to execute
const targetTime = performance.now() + 3000; // Example: 3000 milliseconds = 3 seconds
startTaskWhenTimerExpires(targetTime);