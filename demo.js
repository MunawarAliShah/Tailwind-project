// SELECT ELEMENTS
const productsEl = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");
document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
// RENDER PRODUCTS
function renderProdcuts() {
  products.forEach((product) => {
    productsEl.innerHTML += `
            <div class="flex bg-gray-200 text-black font-bold">
                <div class="item-container display: inline-grid">
                    <div class="item-img h-64 w-64 display: inline-flex pb-8">
                        <img class="h-64 w-64" src="${product.imgSrc}" alt="${product.name}">
                    </div>
                    <div class="desc display: inline-block">
                        <h2>${product.name}</h2>
                        <h2><small class="rs">Rs=</small>${product.price}</h2>
                    </div>
                    <div class="add-to-cart display: inline-grid bg-blue-200 hover:bg-blue-400" onclick="addToCart(${product.id})">
                        <button class="display: inline-grid bg-blue-200 hover:bg-blue-400"><img src="./Images/bag-plus.png" alt="add to cart"></button>
                    </div>
                </div>
            </div>
        `;
  });
}
renderProdcuts();

// cart array
let cart = JSON.parse(localStorage.getItem("")) || [];
updateCart();




// ADD TO CART
function addToCart(id) {
  // check if prodcut already exist in cart
  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id);
  } else {
    const item = products.find((product) => product.id === id);

    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }

  updateCart();
}

function purchaseClicked() {
  alert('Thank you for your purchase')
}
updateCart()


// update cart
function updateCart() {
  renderCartItems();
  renderSubtotal();

  // save cart to local storage
  localStorage.setItem("CART", JSON.stringify(cart));
}

// calculate and render subtotal
function renderSubtotal() {
  let totalPrice = 0,
    totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  subtotalEl.innerHTML = `Subtotal (${totalItems} items): Rs=${totalPrice.toFixed(2)}`;
  totalItemsInCartEl.innerHTML = totalItems;
}

function doSomething(event){
  event.preventDefault();
}
function showcart(){
    document.querySelector(".cart").style.display = "block"
  }
  function removecart(){
    // alert("here")
    document.querySelector(".cart").style.display = "none"
  }

// render cart items
function renderCartItems() {
  cartItemsEl.innerHTML = ""; // clear cart element
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
        <div class="flex bg-gray-400 h-36">
            <div class="item-info h-32 w-28" onclick="removeItemFromCart(${item.id})">
                <img class="h-24 w-full" src="${item.imgSrc}" alt="${item.name}">

                <h4>${item.name}</h4><button class="bg-yellow-300 hover:bg-yellow-700 w-32">REMOVE ITEM</button>
          
            </div>
            <div class="unit-price ml-3 text-2xl mt-12">
                <small>Rs=</small>${item.price}
            </div>
            <div class="units flex">
                <button><div class="btn minus ml-10 text-3xl hover:bg-yellow-700" onclick="changeNumberOfUnits('minus', ${item.id})">-</div></button>
                <div class="number ml-4 text-3xl mt-14">${item.numberOfUnits}</div>
                <button><div class="btn plus ml-4 text-3xl hover:bg-yellow-700" onclick="changeNumberOfUnits('plus', ${item.id})">+</div></button>
            </div>
        </div>
      `;
  });
}

// remove item from cart
function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id);

  updateCart();
}

// change number of units for an item
function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.instock) {
        numberOfUnits++;
      }
    }

    return {
      ...item,
      numberOfUnits,
    };
  });

  updateCart();
}