// Cart
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('.close-cart');


//Open Cart
cartIcon.onclick = () => {
  cart.classList.add("active");
}

//Close Cart
closeCart.onclick = () => {
  cart.classList.remove("active");
}

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

  
function ready() {
  // Remove Items From Cart
  var removeCartButtons = document.getElementsByClassName('cart-remove');

  for (var i=0; i < removeCartButtons.length; i++) {
    let button = removeCartButtons[i];
    button.addEventListener('click', removeCartItem);
  }

  //Quantity Changes
  let quantityInputs = document.getElementsByClassName('cart-quantity');
  for (let i=0; i<quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  //Add to cart
  let addCart = document.getElementsByClassName('add-cart');
  for (let i=0; i<addCart.length; i++) {
    let button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }

  //Buy Button Work
  document.getElementsByClassName('btn-buy')[0].addEventListener("click", purchaseClicked);
  
}

// Remove Items From Cart
function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  if (document.getElementsByClassName('cart-box').length === 0) {
    document.getElementsByClassName('total-price')[0].innerText = "$0";
  }
  updatetotal(); 
}


//Quantity Changes
function quantityChanged(event) {
  var input = event.target;

  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
}

//Add to cart
function addCartClicked(event) {
  let button  = event.target;
  let shopProducts = button.parentElement;
  let title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  let price = shopProducts.getElementsByClassName("price")[0].innerText;
  let productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  updatetotal();
}

function addProductToCart(title, price, productImg) {
  let cartShopBox = document.createElement("div");
  cartShopBox.classList.add('cart-box');
  let cartItems = document.getElementsByClassName('cart-content')[0];
  let cartItemsNames = cartItems.getElementsByClassName('cart-product-title');

  for (let i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert("You have already add this item to cart !")
      return;
    } 
  }

  let cartBoxContent = `<img src="${productImg}" alt="" class="cart-img">
                            <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                            </div>
                            <!-- remove cart  -->
                            <img src="img/student1/icons/remove.png" class="cart-remove" alt="">`

  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
  cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);

}

//Update Total
function updatetotal() {
  let cartContent = document.getElementsByClassName('cart-content')[0];
  let cartBoxes = cartContent.getElementsByClassName('cart-box');
  let total = 0;

  for (let i=0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let priceElement = cartBox.getElementsByClassName('cart-price')[0];
    let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    let quantity = quantityElement.value;

    total = total + (price * quantity);
    //if price contain some cents value
    total = Math.round(total * 100) / 100;

    let totWithDel = total+10;
     
    document.getElementsByClassName('total-price')[0].innerText = "$" + totWithDel + "(with 10$ delivery charge)";
    
    document.getElementById("invoice-total").innerHTML='<span class="invoice-title">Total: $</span>' + totWithDel;

    document.getElementById("invoiceTotal").innerHTML='<span class="invoice-title">Total: $</span>'+ totWithDel;
  }
}

//  pop up windows

const overlay = document.getElementById("overlay");
const popupBtn = document.getElementById("popup-btn");
const closeBtn = document.getElementById("close-btn");
const purchaseBtn = document.getElementById("purchase-btn");

const purchaseOverlay = document.getElementById("purchase-overlay");
const purchasePopup = document.getElementById("purchase-popup");
const purchaseConfirmBtn = document.getElementById("purchase-confirm-btn");
const purchaseCancelBtn = document.getElementById("purchase-cancel-btn");

const invoiceOverlay = document.getElementById("invoice-overlay");
const invoicePopup = document.getElementById("invoice-popup");
const invoiceCloseBtn = document.getElementById("invoice-close-btn");

// payment popup

const paymentOverlay = document.getElementById("payment-overlay");
const paymentPopup = document.getElementById("payment-popup");
const payBtn = document.getElementById("pay-btn");
const backBtn = document.getElementById("back-btn");

popupBtn.addEventListener("click", () => {
  let cartContent = document.getElementsByClassName('cart-content')[0];
  let cartBoxes = cartContent.getElementsByClassName('cart-box');
  if (cartBoxes.length != 0) {
    cart.classList.remove("active");
    overlay.style.display = "block";
  } else {
    alert("Your cart is empty !");
  } 
});

closeBtn.addEventListener("click", () => {
  overlay.style.display = "none";
});

purchaseCancelBtn.addEventListener("click", () => {
  purchaseOverlay.style.display = "none";
});

// Prevent the click event from bubbling up to the overlay
purchasePopup.addEventListener("click", (event) => {
  event.stopPropagation();
});

// Add event listener to form submission
const purchaseForm = document.getElementById("purchase-form");

purchaseForm.addEventListener("submit", function(event) {
  event.preventDefault(); // prevent the form from submitting

  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let address = document.getElementById('address').value;
  let phone = document.getElementById('phone').value;

  document.getElementById('payment-name').innerHTML='<span class="invoice-title">Name: </span>'+name;
  document.getElementById('payment-email').innerHTML='<span class="invoice-title">Email: </span>'+email;
  document.getElementById('payment-address').innerHTML='<span class="invoice-title">Address: </span>'+address;
  document.getElementById('payment-phone').innerHTML='<span class="invoice-title">Phone: </span>'+phone;


  // open the payment popup
  if (purchaseForm.checkValidity()) {
    paymentOverlay.style.display = "block";
    paymentPopup.style.display = "block";
  }
});

backBtn.addEventListener("click", () => {
  paymentOverlay.style.display = "none";
});

const paymentForm = document.getElementById("payment-form");

paymentForm.addEventListener("submit", function(event) {
  event.preventDefault(); // prevent the form from submitting

  // open the purchase confirmation popup
  if (purchaseForm.checkValidity()) {
    purchaseOverlay.style.display = "block";
    purchasePopup.style.display = "block";
  }
});


//open invoice pop up
purchaseConfirmBtn.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  document.getElementById("invoice-name").innerHTML='<span class="invoice-title">Name: </span>'+name;

  const email = document.getElementById("email").value;
  document.getElementById("invoice-email").innerHTML='<span class="invoice-title">Email: </span>'+email;

  const address = document.getElementById("address").value;
  document.getElementById("invoice-address").innerHTML='<span class="invoice-title">Address: </span>'+address;

  const phone = document.getElementById("phone").value;
  document.getElementById("invoice-phone").innerHTML='<span class="invoice-title">Phone: </span>'+phone;

  document.getElementById("invoice-delivery-charge").innerHTML='<span class="invoice-title">Delivery Charge: 10$</span>';

  invoiceOverlay.style.display = "block";
  invoicePopup.style.display = "block";
});

invoicePopup.addEventListener("click", (event) => {
  event.stopPropagation();
});

invoiceCloseBtn.addEventListener("click", () => {
  location.reload();
});