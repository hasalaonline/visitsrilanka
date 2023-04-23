// slideshow
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
  slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
      slideIndex = 1
      }
  slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}



// popup image begin here
// Get the images and popup window
var smallImages = document.querySelectorAll("img.myImg");
var modal = document.getElementById("modal");
var modalImage = document.getElementById("modal-image");
var modalDescription = document.getElementById("modal-description");

// When an image is clicked, show the popup window
smallImages.forEach(function(smallImage) {
smallImage.onclick = function() {
 modalImage.src = this.src.replace("small", "large");
 modalDescription.innerHTML = this.getAttribute("data-description");
 modal.style.display = "flex";
}
});

// When the user clicks the close button, hide the popup window
var closeButton = document.querySelector(".close-button");
closeButton.onclick = function() {
modal.style.display = "none";
}

// Handle button clicks to change font size
var buttons = document.querySelector('.buttons');
var btn = document.querySelectorAll('.btn');
for (var i = 0; i < btn.length; i++) {
btn[i].addEventListener('click', function() {
 var current = document.getElementsByClassName('active');
 current[0].className = current[0].className.replace("active", "");
 this.className += " active";

 var targetElement = document.getElementById('modal-description');
 targetElement.classList.remove('large', 'larger');
 if (this.innerHTML === 'A') {
   targetElement.classList.add('large');
 } else if (this.innerHTML === 'AA') {
   targetElement.classList.add('larger');
 }
});

// Update font size of targetElement when button is clicked
btn[i].addEventListener('click', function() {
 var targetElement = document.getElementById('modal-description');
 if (this.innerHTML === 'A') {
   targetElement.style.fontSize = '1em';
 } else if (this.innerHTML === 'A A') {
   targetElement.style.fontSize = '1.5em';
 } else if (this.innerHTML === 'A A A') {
   targetElement.style.fontSize = '2em';
 }
});
}

// color changing button
function color(elem) {
 var bgColor = window.getComputedStyle(elem).backgroundColor;
 document.body.style.backgroundColor = bgColor;
}

// random color button

const button = document.querySelector("#random-color-button");

const changeBackgroundRandomColor = () => {
 const hexVal = Math.floor(Math.random() * 0xffffff).toString(16);
 document.body.style.backgroundColor = `#${hexVal}`;
}

button.addEventListener("click", changeBackgroundRandomColor);
