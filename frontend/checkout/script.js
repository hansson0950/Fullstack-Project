// Script to make the menu come down and up (hamburger)

const toggleButton = document.getElementsByClassName('toggle-button')[0];
const navbarLinks = document.getElementsByClassName('navbar-links')[0];

const orderlist = document.getElementById("order");

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
});

const table = document.getElementById("table");

window.onload = function initialize() {
    const orderID = sessionStorage.getItem("order-id")
    console.log(orderID);
    fetch("/api/orders/" + orderID, { method: "GET" })
        .then(res => res.json())
        .then(response => {
            var items = response.products;
            const count = [];
            let uniqueItems = [...new Set(items)]

            items.forEach(element => {
                count[element] = (count[element] || 0) + 1;
            });

            uniqueItems.forEach(element => {
                var row = table.insertRow(-1);
                var cell = row.insertCell(0);

                var amount = document.createElement("p");
                amount.className = "amount";
                amount.innerHTML = count[element] + "x";
                cell.appendChild(amount);

                var name = document.createElement("p");
                name.className = "name";
                name.innerHTML = element;
                cell.appendChild(name);
            });
            var row = table.insertRow(-1);
            var cell = row.insertCell(0);

            var price = document.createElement("p");
            price.className = "price";
            price.innerHTML = "$ " + response.price;
            cell.appendChild(price);

        });
}