const menuList = document.querySelector("#menu-items")

const dishImage = document.querySelector("#dish-image")
const dishName  = document.querySelector("#dish-name")
const dishDesc  = document.querySelector("#dish-description")
const dishPrice = document.querySelector("#dish-price")
const numInCart = document.querySelector("#number-in-cart")

const cartForm = document.querySelector("#cart-form")

const totalCost = document.querySelector("#total-cost")

let currentDish = {}


fetch('http://localhost:3000/menu')
    .then ((response) => response.json())
    .then ((menu) => {
        loadMenu(menu)
        loadDish(menu[0]) // Challenge 2
        addToCart()
    })

// Challenge 1
function loadMenu(menu) {
    menu.forEach(dish => {
        let newName = document.createElement("span")
        newName.innerText = dish.name
        menuList.append(newName)

        // Challenge 3
        newName.addEventListener("click", (e) => {
            loadDish(dish)
        })
    })
}

// Challenge 2
function loadDish(dish) {
    dishImage.src = dish.image
    dishName.innerText = dish.name
    dishDesc.innerText = dish.description
    dishPrice.innerText = `\$${dish.price}`
    numInCart.innerText = dish.number_in_bag

    currentDish = dish
}

// Challenge 4
// Bonus Challenge 1
function addToCart() {
    cartForm.addEventListener("submit", (e) => {
        e.preventDefault()

        // Need to convert to int for addition to work properly
        let cartAmount = parseInt(e.target['cart-amount'].value)
        currentDish.number_in_bag += cartAmount
        loadDish(currentDish)
        updateCost(cartAmount)
        patchToCart()

        cartForm.reset()
    })
}

// Bonus Challenge 2
function updateCost(cartAmount) {
    let newTotalCost = parseInt(totalCost.innerText)
    newTotalCost += currentDish.price * cartAmount
    totalCost.innerText = newTotalCost
}

// Bonus Challenge 3
function patchToCart() {
    fetch(`http://localhost:3000/menu/${currentDish.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({number_in_bag: currentDish.number_in_bag})
    })
    .then(res => res.json())
    .then(dish => console.log(dish))
}