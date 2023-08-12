let vid=document.getElementById('camera');
if(navigator.mediaDevices.getUserMedia){
    navigator.mediaDevices.getUserMedia({video:true})
    .then(function(s){
        vid.srcObject=s;
    })
    .catch(function(error){
        console.log(error);
    })
}
else{
    console.log("error");
}

function goBack() {
window.history.back();
}

document.getElementById("executeButton").addEventListener("click", executeScript);

function executeScript() {
    // Make an AJAX request to execute the Python script
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/execute-script", true);
  
    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log("Script executed successfully");
        // window.location.href = "result.html";
      } else {
        console.error("Failed to execute script");
      }
    };
  
    xhr.send();
  }
  
