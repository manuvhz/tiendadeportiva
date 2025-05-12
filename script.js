document.addEventListener('DOMContentLoaded', function() {
    const products = [
        {
            id: 1,
            name: "Sudadera Performance Pro",
            price: 159900,
            discount: 129900,
            image: "https://static.futbolfactory.es/products/249142_1.jpg"
        },
        {
            id: 2,
            name: "Leggings Compresión Elite",
            price: 119900,
            discount: 89900,
            image: "https://www.sportline.com.co/media/catalog/product/c/z/cz9803-013-phsfm001-1000.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:&format=jpeg"
        },
        {
            id: 3,
            name: "Zapatillas Carbon X",
            price: 359900,
            discount: 299900,
            image: "https://nikeco.vtexassets.com/arquivos/ids/720042-500-500?v=638708412465200000"
        },
        {
            id: 4,
            name: "Top Deportivo Aerobic",
            price: 79900,
            discount: 64900,
            image: "https://nikeco.vtexassets.com/arquivos/ids/659384/HF7324_629_A_PREM.jpg?v=638568224685230000"
        },
        {
            id: 5,
            name: "Playera Sportswear",
            price: 79900,
            discount: 64900,
            image: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/jnighv6j24navz8l7xa5/M+NSW+TEE+ICON+FUTURA.png"
        },
        {
            id: 6,
            name: "Brasier Deportivo Sprinter",
            price: 59900,
            discount: 34900,
            image: "https://resize.sprintercdn.com/b/1440x2160/products/0396077/nike-indy-flower_0396077_00_5_505985981.jpg?w=1440&q=75"
        }
        
    ];

    let cart = [];

    // Elementos del DOM
    const productsGrid = document.getElementById('products-grid');
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const closeCart = document.querySelector('.close-cart');

    // Mostrar productos
    function renderProducts() {
        productsGrid.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">
                        <span class="current-price">$${formatPrice(product.discount || product.price)} COP</span>
                        ${product.discount ? `<span class="original-price">$${formatPrice(product.price)} COP</span>` : ''}
                    </div>
                    <button class="add-to-cart" data-id="${product.id}">AÑADIR AL CARRITO</button>
                </div>
            `;
            productsGrid.appendChild(productCard);
        });

        // Event listeners para botones "Agregar al carrito"
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    // Formatear precio
    function formatPrice(price) {
        return new Intl.NumberFormat('es-CO').format(price);
    }

    // Agregar al carrito
    function addToCart(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const product = products.find(p => p.id === productId);
        
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        updateCart();
        animateCartIcon();
    }

    // Actualizar carrito
    function updateCart() {
        // Actualizar contador
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelector('.cart-count').textContent = totalItems;
        
        // Actualizar items del carrito
        cartItems.innerHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            const itemPrice = item.discount || item.price;
            const itemTotal = itemPrice * item.quantity;
            total += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p class="cart-item-price">$${formatPrice(itemPrice)} COP x ${item.quantity}</p>
                    </div>
                </div>
                <span class="cart-item-remove" data-id="${item.id}">✕</span>
            `;
            cartItems.appendChild(cartItem);
        });
        
        // Actualizar total
        cartTotal.textContent = `$${formatPrice(total)}`;
        
        // Event listeners para eliminar items
        document.querySelectorAll('.cart-item-remove').forEach(button => {
            button.addEventListener('click', removeFromCart);
        });
    }

    // Eliminar del carrito
    function removeFromCart(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }

    // Animación del icono del carrito
    function animateCartIcon() {
        cartIcon.classList.add('animate');
        setTimeout(() => {
            cartIcon.classList.remove('animate');
        }, 500);
    }

    // Abrir/cerrar modal del carrito
    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'flex';
    });

    closeCart.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Inicializar
    renderProducts();

    // Animación CSS para el icono del carrito
    const style = document.createElement('style');
    style.textContent = `
        .animate {
            animation: bounce 0.5s;
        }
        
        @keyframes bounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
        }
    `;
    document.head.appendChild(style);
});