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
                if (i % 4 == 0) var row = table.insertRow(-1);

                var cell = row.insertCell(0);

                var name = document.createElement("p");
                name.className = "prodName";
                name.id = "prodName" + i;
                name.innerHTML = response[i].name;
                cell.appendChild(name);

                var img = document.createElement("img");
                img.className = "img";
                img.src = response[i].imgLink;
                cell.appendChild(img);

                var price = document.createElement("p");
                price.className = "prodPrice";
                price.id = "prodPrice" + i;
                price.innerHTML = "$ " + response[i].price;
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
        var productNr = element.id.substring(7);
        var counter = document.getElementById("counter" + productNr);
        var amount = parseInt(counter.value);
        counter.value = amount + 1;
    } else if (element.id.substring(0, 6) == "minBtn") {
        var productNr = element.id.substring(6);
        var counter = document.getElementById("counter" + productNr);
        var amount = parseInt(counter.value);
        if (amount > 0) counter.value = amount - 1;
    }
});

table.addEventListener("change", e => {
    var element = e.target;
    if (element.type != "text") return;

    var productNr = element.id.substring(7);
    var counter = document.getElementById("counter" + productNr);
    counter.value = parseInt(counter.value) || 0;
});

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

function checkout() {
    var tokenJSON = parseJwt(localStorage.getItem("auth-token"))
    const user = tokenJSON._id;
    const rows = table.rows.length;
    var cells = 0;

    for (let i = 0; i < rows; i++) {
        const x = table.rows[i].cells.length;
        cells += x;
    };

    var products = [];
    let index = 0;
    var totalPrice = 0;

    for (let i = 0; i < cells; i++) {
        var counter = document.getElementById("counter" + i);
        if (counter.value == 0) continue;

        var prodName = document.getElementById("prodName" + i).innerHTML;
        var prodPrice = document.getElementById("prodPrice" + i).innerHTML.substring(2);
        var price = prodPrice * counter.value;
        totalPrice += price;

        for (let j = 0; j < counter.value; j++) {
            products[index] = prodName;
            index++;
        };
    };

    const orderDetails = {
        user: user,
        products: products,
        price: totalPrice
    };

    fetch("/api/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderDetails)
    })
        .then(res => res.json())
        .then(response => {
            sessionStorage.setItem("order-id", response._id);
            window.location.href = "/checkout";
        });
};