console.log('Loggy JS Loaded!')

function setLog(element) {
    let name = element.dataset.name
    let location = element.dataset.location
    this.getLog(name, location)
}

function getLog(name, location) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("log-name").innerText = name;
            document.getElementById("log-content").innerHTML = this.responseText;
            
            let tablebody = document.getElementById("tablebody");
            tablebody.scrollTop = tablebody.scrollHeight;
        }
    };
    xhttp.open("GET", "/logs/"+location, true);
    xhttp.send();
}
