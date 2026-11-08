// Update this address to the pastry chef's real order inbox before publishing.
const ORDER_EMAIL = "hello@sweetwhisk.com";

const products = [
  { id: "vanilla-cake", name: "Classic Vanilla Cake", category: "cakes", price: 0, description: "Soft vanilla sponge with silky buttercream.", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85", tag: "Bestseller", sizes: [{label:"Cupcake", detail:"single cupcake", price:5}, {label:"Personal cake", detail:"4-inch cake", price:18}, {label:"Full-size cake", detail:"8-inch cake · serves 10–12", price:48}] },
  { id: "chocolate-cake", name: "Decadent Chocolate Cake", category: "cakes", price: 0, description: "Rich chocolate cake with chocolate frosting.", image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=900&q=85", sizes: [{label:"Cupcake", detail:"single cupcake", price:5}, {label:"Personal cake", detail:"4-inch cake", price:20}, {label:"Full-size cake", detail:"8-inch cake · serves 10–12", price:52}] },
  { id: "red-velvet", name: "Red Velvet Cake", category: "cakes", price: 0, description: "Velvety cocoa cake with cream cheese frosting.", image: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&w=900&q=85", sizes: [{label:"Cupcake", detail:"single cupcake", price:5}, {label:"Personal cake", detail:"4-inch cake", price:20}, {label:"Full-size cake", detail:"8-inch cake · serves 10–12", price:52}] },
  { id: "lemon-cake", name: "Lemon Sunshine Cake", category: "cakes", price: 0, description: "Bright lemon sponge with a fresh lemon finish.", image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=900&q=85", sizes: [{label:"Cupcake", detail:"single cupcake", price:5}, {label:"Personal cake", detail:"4-inch cake", price:18}, {label:"Full-size cake", detail:"8-inch cake · serves 10–12", price:48}] },
  { id: "strawberry-cheesecake", name: "Strawberry Cheesecake", category: "cheesecakes", price: 42, description: "Creamy baked cheesecake topped with strawberries.", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=85", tag: "Customer favorite" },
  { id: "cookies-cream-cheesecake", name: "Cookies & Cream Cheesecake", category: "cheesecakes", price: 44, description: "Vanilla cheesecake loaded with chocolate cookie pieces.", image: "https://images.unsplash.com/photo-1567171466295-4afa63d45416?auto=format&fit=crop&w=900&q=85" },
  { id: "cherry-cheesecake", name: "Cherry Cheesecake", category: "cheesecakes", price: 44, description: "Classic creamy cheesecake with a cherry topping.", image: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?auto=format&fit=crop&w=900&q=85" },
  { id: "choc-chip-cookies", name: "Chocolate Chip Cookies", category: "cookies", price: 0, description: "Golden edges, soft centers, and plenty of chocolate.", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=85", tag: "Fresh baked", quantities: [{label:"3 cookies", qty:3, price:8}, {label:"6 cookies", qty:6, price:15}, {label:"12 cookies", qty:12, price:28}] },
  { id: "double-choc-cookies", name: "Double Chocolate Cookies", category: "cookies", price: 0, description: "Deep cocoa cookies with melty chocolate chunks.", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85", quantities: [{label:"3 cookies", qty:3, price:9}, {label:"6 cookies", qty:6, price:17}, {label:"12 cookies", qty:12, price:32}] },
  { id: "sugar-cookies", name: "Vanilla Sugar Cookies", category: "cookies", price: 0, description: "Buttery, tender cookies with a delicate vanilla flavor.", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=900&q=85", quantities: [{label:"3 cookies", qty:3, price:7}, {label:"6 cookies", qty:6, price:13}, {label:"12 cookies", qty:12, price:24}] },
  { id: "peach-cobbler", name: "Homestyle Peach Cobbler", category: "cobblers", price: 0, description: "Juicy peaches under a buttery golden cobbler crust.", image: "https://images.unsplash.com/photo-1621743478914-cc8f86d0a6f5?auto=format&fit=crop&w=900&q=85", sizes: [{label:"Personal", detail:"individual portion", price:9}, {label:"Small pan", detail:"serves 4–6", price:26}, {label:"Large pan", detail:"serves 10–12", price:48}] },
  { id: "cherry-cobbler", name: "Cherry Cobbler", category: "cobblers", price: 0, description: "Sweet-tart cherries baked beneath a golden crust.", image: "https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=900&q=85", sizes: [{label:"Personal", detail:"individual portion", price:9}, {label:"Small pan", detail:"serves 4–6", price:28}, {label:"Large pan", detail:"serves 10–12", price:50}] }
];

const cart = [];
const money = value => `$${value.toFixed(2)}`;
const grid = document.getElementById("product-grid");

function productCard(product) {
  const options = product.sizes
    ? `<div><span class="option-label">Choose your size</span><select class="product-choice" aria-label="Choose size">${product.sizes.map((s,i) => `<option value="${i}">${s.label} — ${s.detail} · ${money(s.price)}</option>`).join("")}</select></div>`
    : product.quantities
      ? `<div><span class="option-label">Choose your quantity</span><select class="product-choice" aria-label="Choose cookie quantity">${product.quantities.map((q,i) => `<option value="${i}">${q.label} · ${money(q.price)}</option>`).join("")}</select></div>`
      : `<div><span class="option-label">Price</span><div class="product-price">${money(product.price)} <span style="font-size:.7rem;color:#607779;font-weight:400">/ whole cheesecake</span></div></div>`;
  const defaultPrice = product.sizes ? product.sizes[0].price : product.quantities ? product.quantities[0].price : product.price;
  return `<article class="product-card" data-category="${product.category}">
    <div class="product-image"><img src="${product.image}" alt="${product.name}" loading="lazy"><span class="product-tag">${product.tag || product.category}</span></div>
    <div class="product-content">
      <div class="product-top"><h3>${product.name}</h3>${product.sizes || product.quantities ? `<span class="product-price">${money(defaultPrice)}+</span>` : ""}</div>
      <p class="product-description">${product.description}</p>
      <div class="product-options">${options}</div>
      <button class="add-button" data-add="${product.id}">Add to order · ${money(defaultPrice)}</button>
    </div>
  </article>`;
}

function renderProducts(filter = "all") {
  grid.innerHTML = products.filter(p => filter === "all" || p.category === filter).map(productCard).join("");
}
function selectedVariant(product, card) {
  const select = card.querySelector(".product-choice");
  const index = select ? Number(select.value) : 0;
  if (product.sizes) return { label: product.sizes[index].label, detail: product.sizes[index].detail, price: product.sizes[index].price };
  if (product.quantities) return { label: product.quantities[index].label, detail: "", price: product.quantities[index].price };
  return { label: "Whole cheesecake", detail: "", price: product.price };
}
function addToCart(product, card) {
  const variant = selectedVariant(product, card);
  const key = `${product.id}-${variant.label}`;
  const existing = cart.find(item => item.key === key);
  if (existing) existing.quantity += 1;
  else cart.push({ key, id: product.id, name: product.name, variant: variant.label, detail: variant.detail, price: variant.price, quantity: 1 });
  renderCart();
  const button = card.querySelector(".add-button");
  button.textContent = "Added ✓";
  setTimeout(() => { button.textContent = `Add to order · ${money(variant.price)}`; }, 1000);
}
function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById("cart-count").textContent = count;
  document.getElementById("cart-total").textContent = money(total);
  if (!cart.length) {
    cartItems.innerHTML = '<p class="empty-cart">Your order is waiting for something delicious.</p>';
    return;
  }
  cartItems.innerHTML = cart.map(item => `<div class="cart-item">
    <div><strong>${item.name}</strong><small>${item.variant}${item.detail ? ` · ${item.detail}` : ""} · Qty ${item.quantity}</small></div>
    <div style="text-align:right"><strong>${money(item.price * item.quantity)}</strong><br><button class="remove-item" data-remove="${item.key}">Remove</button></div>
  </div>`).join("");
}

grid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");
  if (!button) return;
  const product = products.find(p => p.id === button.dataset.add);
  addToCart(product, button.closest(".product-card"));
});
grid.addEventListener("change", event => {
  if (!event.target.matches(".product-choice")) return;
  const card = event.target.closest(".product-card");
  const product = products.find(p => p.id === card.querySelector("[data-add]").dataset.add);
  const variant = selectedVariant(product, card);
  card.querySelector(".add-button").textContent = `Add to order · ${money(variant.price)}`;
  const priceLabel = card.querySelector(".product-top .product-price");
  if (priceLabel) priceLabel.textContent = `${money(variant.price)}+`;
});
document.getElementById("cart-items").addEventListener("click", event => {
  const button = event.target.closest("[data-remove]");
  if (!button) return;
  const index = cart.findIndex(item => item.key === button.dataset.remove);
  if (index >= 0) cart.splice(index, 1);
  renderCart();
});
document.querySelectorAll(".category-tab").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".category-tab.active").classList.remove("active");
    button.classList.add("active");
    renderProducts(button.dataset.filter);
  });
});
document.getElementById("order-form").addEventListener("submit", event => {
  event.preventDefault();
  if (!cart.length) {
    alert("Please add at least one treat to your order first.");
    return;
  }
  const form = new FormData(event.currentTarget);
  const lines = cart.map(item => `• ${item.name} — ${item.variant}${item.detail ? ` (${item.detail})` : ""} x${item.quantity}: ${money(item.price * item.quantity)}`);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const body = [
    "Hello Sweet Whisk! I'd like to request this order:",
    "",
    ...lines,
    "",
    `Estimated total: ${money(total)}`,
    `Name: ${form.get("name")}`,
    `Contact: ${form.get("contact")}`,
    `Fulfillment: ${form.get("fulfillment")}`,
    `Notes: ${form.get("notes") || "None"}`,
    "",
    "Please confirm availability and final details. Thank you!"
  ].join("\n");
  window.location.href = `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent("New Sweet Whisk order request")}&body=${encodeURIComponent(body)}`;
});
document.getElementById("year").textContent = new Date().getFullYear();
renderProducts();
renderCart();
