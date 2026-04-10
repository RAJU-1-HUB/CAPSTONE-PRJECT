let cart = [];
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = `
          <div class="empty-cart">
            <h2>Your Cart is Empty 🛒</h2>
            <p>Looks like you haven't added any furniture yet.</p>
            <button class="browse-btn" onclick="goToShop()">Browse</button>
          </div>
        `;
        updateSummary();
        return;
    }

    cart.forEach((item, index) => {
        const itemHTML = `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
              <h3>${item.name}</h3>
              <p class="price">₹${item.price.toLocaleString('en-IN')}</p>
              
              <div class="quantity">
                <button onclick="changeQuantity(${index}, -1)">−</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${index}, 1)">+</button>
              </div>
              
              <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
            </div>
          </div>
        `;
        cartContainer.innerHTML += itemHTML;
    });

    updateSummary();
}

function changeQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity < 1) cart[index].quantity = 1;
    saveCart();
    renderCart();
}

function removeItem(index) {
    if (confirm("Remove this item from cart?")) {
        cart.splice(index, 1);
        saveCart();
        renderCart();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateSummary() {
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    const shipping = cart.length > 0 ? 499 : 0;
    const total = subtotal + shipping;

    document.getElementById('subtotal').textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    document.getElementById('shipping').textContent = `₹${shipping}`;
    document.getElementById('total').textContent = `₹${total.toLocaleString('en-IN')}`;
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("🎉 Thank you! Proceeding to Checkout (Demo)");
}

function goToShop() {
    window.location.href = "index.html";   // Change if your main file name is different
}

window.onload = () => {
    loadCart();
    renderCart();
};
document.addEventListener('DOMContentLoaded', () => {
    const addButtons = document.querySelectorAll('.add-to-cart');

    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent.trim();
            const priceText = productCard.querySelector('.price').textContent.trim();
            const image = productCard.querySelector('img');
            const imageSrc = image.src;

            const price = parseInt(priceText.replace(/[^0-9]/g, ''));

            // ===== FLY ANIMATION =====
            const cartIcon = document.querySelector('a[href="cart.html"]');

            const imgRect = image.getBoundingClientRect();
            const cartRect = cartIcon.getBoundingClientRect();

            const flyingImg = document.createElement('img');
            flyingImg.src = imageSrc;
            flyingImg.classList.add('fly-image');

            flyingImg.style.top = imgRect.top + 'px';
            flyingImg.style.left = imgRect.left + 'px';

            document.body.appendChild(flyingImg);

            setTimeout(() => {
                flyingImg.style.top = cartRect.top + 'px';
                flyingImg.style.left = cartRect.left + 'px';
                flyingImg.style.width = '20px';
                flyingImg.style.height = '20px';
                flyingImg.style.opacity = '0.5';
            }, 50);

            setTimeout(() => {
                flyingImg.remove();
            }, 800);

            addToCart(productName, price, imageSrc);
        });
    });

    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
});