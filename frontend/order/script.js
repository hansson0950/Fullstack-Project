// Script to make the menu come down and up (hamburger)

const toggleButton = document.getElementsByClassName('toggle-button')[0];
const navbarLinks = document.getElementsByClassName('navbar-links')[0];

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
});

const table = document.getElementById("table");

window.onload = function initialize() {
    fetch("/api/products", { method: "GET" })
        .then(res => res.json())
        .then(response => {
            JSON.stringify(response);
            for (let i = 0; i < response.length; i++) {
                if (i % 3 == 0) var row = table.insertRow(-1);

                var cell = row.insertCell(0);

                var name = document.createElement("p");
                name.className = "prodName";
                name.innerHTML = response[i].name;
                cell.appendChild(name);

                var img = document.createElement("img");
                img.className = "img";
                img.src = response[i].imgLink;
                cell.appendChild(img);

                var price = document.createElement("p");
                price.innerHTML = response[i].price;
                cell.appendChild(price);

                var minBtn = document.createElement("input");
                minBtn.value = "-";
                minBtn.className = "submit";
                minBtn.id = "minBtn" + i;
                minBtn.type = "button";
                cell.appendChild(minBtn);

                var counter = document.createElement("input");
                counter.value = "0"
                counter.className = "counter";
                counter.id = "counter" + i;
                counter.type = "text";
                cell.appendChild(counter);

                var plusBtn = document.createElement("input");
                plusBtn.value = "+";
                plusBtn.className = "submit";
                plusBtn.id = "plusBtn" + i;
                plusBtn.type = "button";
                cell.appendChild(plusBtn);
            }
        });
}

table.addEventListener("click", e => {
    var element = e.target;
    if (element.type != "button") return;

    if (element.id.substring(0, 7) == "plusBtn") {
        var productNr = element.id.charAt(7);
        var counter = document.getElementById("counter" + productNr);
        var amount = parseInt(counter.value);
        counter.value = amount + 1;
    } else if (element.id.substring(0, 6) == "minBtn") {
        var productNr = element.id.charAt(6);
        var counter = document.getElementById("counter" + productNr);
        var amount = parseInt(counter.value);
        if (amount > 0) counter.value = amount - 1;
    }
});

table.addEventListener("change", e => {
    var element = e.target;
    if (element.type != "text") return;

    var productNr = element.id.charAt(7);
    var counter = document.getElementById("counter" + productNr);
    counter.value = parseInt(counter.value) || 0;
});