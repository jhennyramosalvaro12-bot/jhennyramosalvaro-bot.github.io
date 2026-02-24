document.addEventListener("DOMContentLoaded", () => {
  fetch('header.html') // path to your header file
    .then(response => response.text())
    .then(data => {
      document.getElementById('header-container').innerHTML = data;
      // optional: re-run any functions that need the header
    })
    .catch(err => console.error('Error loading header:', err));
});
document.addEventListener("DOMContentLoaded", () => {
  fetch('listofPerfume.html') // path to your header file
    .then(response => response.text())
    .then(data => {
      document.getElementById('perfume-container').innerHTML = data;
      // optional: re-run any functions that need the header
    })
    .catch(err => console.error('Error loading list of perfume:', err));
});
document.addEventListener("DOMContentLoaded", () => {
  fetch('listofCologne.html') // path to your header file
    .then(response => response.text())
    .then(data => {
      document.getElementById('cologne-container').innerHTML = data;
      // optional: re-run any functions that need the header
    })
    .catch(err => console.error('Error loading list of cologne:', err));
});

document.addEventListener("DOMContentLoaded", () => {
  fetch('listofBodyMist.html') // path to your header file
    .then(response => response.text())
    .then(data => {
      document.getElementById('bodymist-container').innerHTML = data;
      // optional: re-run any functions that need the header
    })
    .catch(err => console.error('Error loading list of Body Mist:', err));
});
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;
function scrollToSection(id){
document.getElementById(id).scrollIntoView({behavior:"smooth"});
}

function filterProducts(type){
const products=document.querySelectorAll(".product");

products.forEach(product=>{
if(type==="all"){
product.style.display="block";
}
else if(type==="best"){
product.style.display=product.dataset.tag==="best"?"block":"none";
}
else if(type==="new"){
product.style.display=product.dataset.tag==="new"?"block":"none";
}
});
}

function toggleDescription(button){
const desc=button.nextElementSibling;
if(desc.style.display==="block"){
desc.style.display="none";
button.textContent="Read More";
}else{
desc.style.display="block";
button.textContent="Read Less";
}
}

function addToCart(name, price){
    const existing = cart.find(item => item.name === name);
    if(existing) existing.quantity++;
    else cart.push({name, price, quantity:1});
    updateCart();

    // Show tooltip
    const tooltip = document.getElementById('tooltip');
    tooltip.classList.add('show');

    // Hide after 2 seconds
    setTimeout(() => {
        tooltip.classList.remove('show');
    }, 2000);
}


function removeFromCart(name){
cart=cart.filter(item=>item.name!==name);
updateCart();
}

function updateCart(){
const cartItems=document.getElementById("cartItems");
const cartCount=document.getElementById("cartCount");
const totalPrice=document.getElementById("totalPrice");

cartItems.innerHTML="";
total=0;

cart.forEach(item=>{
total+=item.price*item.quantity;
const div=document.createElement("div");
div.classList.add("cart-item");
div.innerHTML=`
<span>${item.name} x ${item.quantity}</span>
<button class="remove-btn" onclick="removeFromCart('${item.name}')">✕</button>
`;

cartItems.appendChild(div);
});

cartCount.textContent=cart.reduce((sum,item)=>sum+item.quantity,0);
totalPrice.textContent=total;
localStorage.setItem("cart", JSON.stringify(cart));
}

function toggleCart(){
document.getElementById("cartPanel").classList.toggle("active");
}

function searchProducts(){
    const query = document.getElementById('searchInput').value.toLowerCase();
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const title = product.querySelector('h3').textContent.toLowerCase();
        const gender = product.dataset.gender; // men or women

        let show = false;

        // Match by name
        if(title.includes(query)){
            show = true;
        }

        // Match by gender keywords
        const menKeywords = ["men","man","boy"];
        const womenKeywords = ["women","woman","girl"];

        if(menKeywords.includes(query) && gender === "men"){
            show = true;
        }
        if(womenKeywords.includes(query) && gender === "women"){
            show = true;
        }

        // Show or hide product
        product.style.display = show ? "block" : "none";
    });
}
function renderRatings() {
    const ratingDivs = document.querySelectorAll('.rating');

    ratingDivs.forEach(div => {
        const rating = parseFloat(div.dataset.rating);
        const fullStars = Math.floor(rating);
        const halfStar = rating - fullStars >= 0.5;
        let starsHTML = '';

        // Full stars
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '★';
        }
        // Half star (using ☆ to represent half for simplicity)
        if (halfStar) starsHTML += '☆';
        // Empty stars to complete 5
        for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) {
            starsHTML += '✩';
        }

        // Add stars and numeric rating
        div.innerHTML = `<span>${starsHTML}</span><span class="rating-number">${rating.toFixed(1)}</span>`;
    });
}

// Call it once after DOM is ready
renderRatings();

function toggleMenu() {
    document.getElementById("sideMenu").classList.toggle("active");
}
document.addEventListener("click", function(event) {
    const menu = document.getElementById("sideMenu");
    const toggle = document.querySelector(".menu-toggle");

    if (!toggle.contains(event.target) && !menu.contains(event.target)) {
        menu.classList.remove("active");
    }
});
function scrollToProducts() {
  document.getElementById("featuredProducts")
          .scrollIntoView({ behavior: "smooth" });
}
// Create floating perfume particles
const particlesContainer = document.querySelector(".particles");

for (let i = 0; i < 25; i++) {
  let span = document.createElement("span");
  span.style.left = Math.random() * 100 + "%";
  span.style.animationDuration = 5 + Math.random() * 10 + "s";
  span.style.width = span.style.height =
    5 + Math.random() * 20 + "px";
  particlesContainer.appendChild(span);
}

document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const formMessage = document.getElementById("formMessage");

  if (name === "" || email === "" || message === "") {
    formMessage.style.color = "red";
    formMessage.textContent = "Please fill in all fields.";
    return;
  }

  if (!validateEmail(email)) {
    formMessage.style.color = "red";
    formMessage.textContent = "Please enter a valid email address.";
    return;
  }

  formMessage.style.color = "green";
  formMessage.textContent = "Thank you! Your message has been sent 💌";

  document.getElementById("contactForm").reset();
});

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

localStorage.setItem("cart", JSON.stringify(cart));
document.addEventListener("DOMContentLoaded", function(){
    updateCart();
});