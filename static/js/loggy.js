console.log('Loggy JS Loaded!')

var currentName = null;
var currentLocation = null;

function setLog(element) {
    currentName = element.dataset.name;
    currentLocation = element.dataset.location;
    this.getLog(currentName, currentLocation);
}

function getLog(name, location) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("log-name").innerText = name;
            document.getElementById("log-content").innerHTML = this.responseText;

            console.log('Updated log!')
            var element = document.getElementById("table-body");
            element.scrollTop = element.scrollHeight;
        }
    };
    xhttp.open("GET", "/logs/"+location, true);
    xhttp.send();
}

function updateLog() {
    if (currentName == null) {
        return;
    }
    getLog(currentName, currentLocation);
}

setInterval(updateLog, 15*1000)
