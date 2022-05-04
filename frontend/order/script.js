// Script to make the menu come down and up (hamburger)

const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
});

const table = document.getElementById("table");

window.onload = function initialize() {
    fetch("/api/products", { method: "GET" })
    .then(res => res.json())
    .then(response => {
        JSON.stringify(response);
        for (let i = 0; i < response.length; i++) {
            if (i % 3 == 0) var row = table.insertRow(-1);
            
            var cell1 = row.insertCell(0);
            cell1.innerHTML = response[i].name;

            var minBtn = document.createElement("input");
            minBtn.value = "-";
            minBtn.className = "submit";
            minBtn.id = "minBtn" + i;
            minBtn.type = "button";
            cell1.appendChild(minBtn)

            var counter = document.createElement("input");
            counter.value = "0"
            counter.className = "counter";
            counter.id = "counter" + i;
            counter.type = "text"
            cell1.appendChild(counter)

            var plusBtn = document.createElement("input");
            plusBtn.value = "+";
            plusBtn.className = "submit";
            plusBtn.id = "plusBtn" + i;
            plusBtn.type = "button";
            cell1.appendChild(plusBtn)
        }
    });
}