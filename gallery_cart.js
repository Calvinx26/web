document.addEventListener('DOMContentLoaded', function () {
    // --- Cart from sessionStorage ---
    let cart = [];
    if (sessionStorage.getItem('cart')) {
        try {
            cart = JSON.parse(sessionStorage.getItem('cart'));
        } catch (e) {
            cart = [];
        }
    }

    // Select all add to cart buttons and product titles
    const addToCartButtons = document.querySelectorAll('.gallery-card .action-btn');
    const productTitles = document.querySelectorAll('.gallery-card .product-title');

    // Create Cart button (top right corner for demo)
    let cartBtn = document.createElement('button');
    cartBtn.textContent = 'Cart';
    cartBtn.className = 'cart-view-btn';
    cartBtn.style.position = 'fixed';
    cartBtn.style.top = '30px';
    cartBtn.style.right = '30px';
    cartBtn.style.zIndex = '1000';
    cartBtn.style.padding = '10px 18px';
    cartBtn.style.fontSize = '1.2rem';
    cartBtn.style.borderRadius = '6px';
    cartBtn.style.background = '#4461de';
    cartBtn.style.color = '#fff';
    cartBtn.style.border = 'none';
    cartBtn.style.cursor = 'pointer';
    document.body.appendChild(cartBtn);

    // Add to cart functionality
    addToCartButtons.forEach(function (btn, index) {
        btn.addEventListener('click', function () {
            let itemName = productTitles[index].textContent.trim();
            cart.push(itemName);
            sessionStorage.setItem('cart', JSON.stringify(cart)); // Save to sessionStorage
            alert('Item added to the cart');
        });
    });

    // --- Modal Popup Creation ---
    let modal = document.createElement('div');
    modal.id = 'cart-modal';
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.4)';
    modal.style.zIndex = '2000';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.transition = 'all 0.2s';

    // Modal inner content
    let modalContent = document.createElement('div');
    modalContent.style.background = '#fff';
    modalContent.style.padding = '32px';
    modalContent.style.borderRadius = '14px';
    modalContent.style.width = '95%';
    modalContent.style.maxWidth = '400px';
    modalContent.style.margin = '60px auto';
    modalContent.style.position = 'relative';

    // Close button
    let closeBtn = document.createElement('span');
    closeBtn.textContent = '×';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '18px';
    closeBtn.style.right = '24px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.fontSize = '1.6rem';
    closeBtn.style.color = '#888';
    modalContent.appendChild(closeBtn);

    // Title
    let modalTitle = document.createElement('h2');
    modalTitle.textContent = 'Your Cart';
    modalTitle.style.marginBottom = '18px';
    modalContent.appendChild(modalTitle);

    // Cart items list
    let cartList = document.createElement('ul');
    cartList.style.listStyle = 'none';
    cartList.style.padding = '0';
    cartList.style.margin = '0 0 16px 0';
    modalContent.appendChild(cartList);

    // Clear Cart button
    let clearCartBtn = document.createElement('button');
    clearCartBtn.textContent = 'Clear Cart';
    clearCartBtn.style.marginRight = '12px';
    clearCartBtn.style.background = '#f04444';
    clearCartBtn.style.color = '#fff';
    clearCartBtn.style.padding = '8px 18px';
    clearCartBtn.style.border = 'none';
    clearCartBtn.style.borderRadius = '6px';
    clearCartBtn.style.cursor = 'pointer';

    // Process Order button
    let processOrderBtn = document.createElement('button');
    processOrderBtn.textContent = 'Process Order';
    processOrderBtn.style.background = '#14aa6b';
    processOrderBtn.style.color = '#fff';
    processOrderBtn.style.padding = '8px 18px';
    processOrderBtn.style.border = 'none';
    processOrderBtn.style.borderRadius = '6px';
    processOrderBtn.style.cursor = 'pointer';

    // Buttons container
    let btnsDiv = document.createElement('div');
    btnsDiv.style.marginTop = '18px';
    btnsDiv.appendChild(clearCartBtn);
    btnsDiv.appendChild(processOrderBtn);
    modalContent.appendChild(btnsDiv);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Helper: Render cart items in modal
    function renderCart() {
        cartList.innerHTML = '';
        if (cart.length === 0) {
            let li = document.createElement('li');
            li.textContent = 'Your cart is empty.';
            li.style.color = '#888';
            cartList.appendChild(li);
        } else {
            cart.forEach(function (item, idx) {
                let li = document.createElement('li');
                li.textContent = `${idx + 1}. ${item}`;
                li.style.marginBottom = '6px';
                cartList.appendChild(li);
            });
        }
    }

    // Cart button click - open modal
    cartBtn.addEventListener('click', function () {
        // Load the cart from sessionStorage every time modal opens
        if (sessionStorage.getItem('cart')) {
            try {
                cart = JSON.parse(sessionStorage.getItem('cart'));
            } catch (e) {
                cart = [];
            }
        } else {
            cart = [];
        }
        renderCart();
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'start';
        document.body.style.overflow = 'hidden';
    });

    // Close modal
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    });

    // Click outside to close
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Clear Cart
    clearCartBtn.addEventListener('click', function () {
        cart = [];
        sessionStorage.removeItem('cart');
        renderCart();
        alert('Cart cleared');
    });

    // Process Order
    processOrderBtn.addEventListener('click', function () {
        if (cart.length > 0) {
            cart = [];
            sessionStorage.removeItem('cart');
            renderCart();
            alert('Thank you for your order');
        } else {
            alert('Cart is empty');
        }
    });
});
