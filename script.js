const products = [
  { name: "Iphone 16 pro", description: "Latest smartphone with advanced features.", price: 799.99, category: "phones", available: true, image: "iphone16.jfif" },
  { name: "Galaxy s24", description: "Affordable smartphone with great battery.", price: 399.99, category: "phones", available: true, image: "s2.jfif" },
  { name: "macBook Pro", description: "High performance laptop for professionals.", price: 1200.0, category: "computers", available: true, image: "mac.jfif" },
  { name: "ASUS ROG Strix G17 ", description: "Powerful laptop for gaming enthusiasts.", price: 1500.0, category: "computers", available: false, image: "game.jfif" },
  { name: "Samsung 55", description: "Stunning 4K TV with HDR support.", price: 999.99, category: "tv", available: true, image: "tv.jfif" },
  { name: "6000 series", description: "Smart TV with built-in apps.", price: 650.0, category: "tv", available: true, image: "tvd.jfif" },
  { name: "Wireless Headphones", description: "Noise-cancelling wireless headphones.", price: 199.99, category: "audio", available: true, image: "h.jfif" },
  { name: "Beats pill", description: "Portable Bluetooth speaker with deep bass.", price: 89.99, category: "audio", available: true, image: "b.jfif" },
  { name: "Apple iWatch", description: "Track your fitness and notifications.", price: 299.99, category: "wearables", available: true, image: "w.jfif" },
  { name: " Garmin Swim watch", description: "Monitor your daily activity and sleep.", price: 99.99, category: "wearables", available: true, image: "t.jfif" },
    { name: "salat", description: "Monitor your daily activity and sleep.", price: 99.99, category: "salat", available: true, image: "t.jfif" },

];

let cart = [];

function displayProducts(filteredProducts) {
  const container = document.querySelector(".products");
  container.innerHTML = ""; 

  if (filteredProducts.length === 0) {
    container.innerHTML = `<p style="text-align:center; width:100%;">No products found.</p>`;
    return;
  }
  filteredProducts.forEach((product, index) => {
    const card = document.createElement("div");
    
    card.className = "product-card";
    card.setAttribute("tabindex", "0");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p class="price">$${product.price.toFixed(2)}</p>
      <p class="availability ${product.available ? "" : "unavailable"}">
        ${product.available ? "Available" : "Out of stock"}
      </p>
      <button ${product.available ? "" : "disabled"} onclick="addToCart(${index})" aria-label="Add ${product.name} to cart">
        Add to Cart
      </button>
    `;

    container.appendChild(card);
  });
}

function addToCart(productIndex) {
  const product = products[productIndex];

  if (!product.available) return;

  cart.push(product);
  updateCartUI();
}

function showCart() {
  document.querySelector(".products").style.display = "none"; 
  const cartSection = document.getElementById("cart-section");
  cartSection.style.display="block";

  const cartList = document.getElementById("cart-items");
  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML = "<li>Cart is empty</li>";
    return;
  }

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "delete";
    removeBtn.onclick = () => {
      cart.splice(index, 1);
      showCart(); 
    };

    li.appendChild(removeBtn);
    cartList.appendChild(li);
  });
}
function checkoutCart() {
  if (cart.length === 0) {
    alert("Your cart is empty. Add items before checking out.");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const confirmCheckout = confirm(`Total: $${total.toFixed(2)}\nDo you want to proceed to checkout?`);

  if (confirmCheckout) {
    alert("Thank you for your purchase!");
    
    cart = [];
    updateCartUI();
document.querySelector(".products").style.display = "flex";
document.getElementById("cart-section").style.display = "block";

  }
}

  
function filterCategory(category) {
 
  document.getElementById("cart-section").style.display = "none";
  document.querySelector(".products").style.display = "flex";

  if (category === "all") {
   
    const availableProducts = products.filter((p) => p.available);
    displayProducts(availableProducts);
  } else {
    const filtered = products.filter(
      (p) => p.category === category && p.available
    );
    displayProducts(filtered);
  }
}


function searchProducts() {
  const query = document.getElementById("search-bar").value.toLowerCase();
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)||
      p.price.toString().includes(query)
      
  );
  displayProducts(filtered);

}

window.onload = () => {
  displayProducts(products);
  updateCartUI();
};
