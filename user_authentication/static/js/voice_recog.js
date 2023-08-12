document.getElementById("EXECUTEButton").addEventListener("click", executeScript);

function executeScript() {
    // Make an AJAX request to execute the Python script
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/execute-voice-script", true);
  
    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log("Script executed successfully");
      } else {
        console.error("Failed to execute script");
      }
    };
  
    xhr.send();
  }

function goBack() {
window.history.back();
}