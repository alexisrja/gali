// Datos de productos
const products = [
    {
        id: 1,
        name: "Betta Crown Tail Neón",
        description: "Espectacular Betta con cola de corona y colores neón vibrantes",
        price: 45.99,
        image: "https://images.unsplash.com/photo-1520990269108-4402e1d7f48f?w=400&h=300&fit=crop"
    },
    {
        id: 2,
        name: "Betta Half Moon Galaxy",
        description: "Betta Half Moon con patrón galáctico único",
        price: 55.99,
        image: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=400&h=300&fit=crop"
    },
    {
        id: 3,
        name: "Betta Dragon Scale",
        description: "Impresionante Betta con escamas de dragón metálicas",
        price: 65.99,
        image: "https://images.unsplash.com/photo-1524704796725-9fc3044a58b1?w=400&h=300&fit=crop"
    },
    {
        id: 4,
        name: "Betta Koi Multicolor",
        description: "Betta con patrón Koi en múltiples colores brillantes",
        price: 75.99,
        image: "https://images.unsplash.com/photo-1499399496-6c3f5c1a8b90?w=400&h=300&fit=crop"
    },
    {
        id: 5,
        name: "Betta Plakat Fighter",
        description: "Betta Plakat de cola corta con temperamento fuerte",
        price: 40.99,
        image: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400&h=300&fit=crop"
    },
    {
        id: 6,
        name: "Betta Dumbo Ear",
        description: "Betta con aletas pectorales extra grandes tipo Dumbo",
        price: 85.99,
        image: "https://images.unsplash.com/photo-1567515004624-219c11d31f2e?w=400&h=300&fit=crop"
    },
    {
        id: 7,
        name: "Betta Veiltail Eléctrico",
        description: "Betta cola de velo con colores eléctricos intensos",
        price: 38.99,
        image: "https://images.unsplash.com/photo-1604874175878-370d0d8db92f?w=400&h=300&fit=crop"
    },
    {
        id: 8,
        name: "Betta Double Tail Platinum",
        description: "Betta de doble cola con acabado platino brillante",
        price: 90.99,
        image: "https://images.unsplash.com/photo-1569424894133-ebb6ede8a0ea?w=400&h=300&fit=crop"
    }
];

// Carrito de compras
let cart = [];

// Sistema de autenticación
let currentUser = null;

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    initializeCart();
    initializeAuth();
    addScrollEffects();
    checkUserSession();
});

// Cargar productos en la grid
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    
    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.style.animationDelay = `${index * 0.1}s`;
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-footer">
                <span class="product-price">$${product.price}</span>
                <button class="btn-add-cart" onclick="addToCart(${product.id})">
                    Agregar
                </button>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
}

// Agregar al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (product) {
        cart.push(product);
        updateCartUI();
        showNotification('Producto agregado al carrito');
        animateCartIcon();
    }
}

// Remover del carrito
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
    showNotification('Producto eliminado del carrito');
}

// Actualizar interfaz del carrito
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    // Actualizar contador
    cartCount.textContent = cart.length;
    
    // Actualizar items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 40px; color: var(--text-secondary);">Tu carrito está vacío</p>';
    } else {
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price}</div>
                    <button class="cart-item-remove" onclick="removeFromCart(${index})">Eliminar</button>
                </div>
            </div>
        `).join('');
    }
    
    // Actualizar total
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Inicializar carrito
function initializeCart() {
    const cartIcon = document.getElementById('cartIcon');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCart');
    
    cartIcon.addEventListener('click', () => {
        cartModal.classList.add('active');
    });
    
    closeCart.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });
    
    // Cerrar al hacer click fuera
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });
}

// Animar icono del carrito
function animateCartIcon() {
    const cartIcon = document.getElementById('cartIcon');
    cartIcon.style.animation = 'none';
    setTimeout(() => {
        cartIcon.style.animation = 'pulse 0.5s ease';
    }, 10);
}

// Scroll suave a productos
function scrollToProducts() {
    document.getElementById('productos').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Efectos de scroll
function addScrollEffects() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Cambiar opacidad del header
        if (currentScroll > 100) {
            header.style.background = 'rgba(26, 31, 58, 0.95)';
        } else {
            header.style.background = 'rgba(26, 31, 58, 0.9)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Animación de aparición de elementos al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar cards de "Sobre Nosotros"
    document.querySelectorAll('.about-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// Efecto parallax para el hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const circleDecorations = document.querySelectorAll('.circle-decoration');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    circleDecorations.forEach((circle, index) => {
        const speed = 0.3 + (index * 0.1);
        circle.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Agregar animación al escribir en consola (Easter Egg)
console.log('%c🐠 Bienvenido a Bettas Cute Shop! 🐠', 
    'font-size: 20px; color: #00f6ff; font-weight: bold; text-shadow: 2px 2px 4px #7b2cbf;');
console.log('%cTienda Futurista de Peces Betta', 
    'font-size: 14px; color: #ff006e;');

// ===== SISTEMA DE AUTENTICACIÓN =====

// Inicializar sistema de autenticación
function initializeAuth() {
    const btnLogin = document.getElementById('btnLogin');
    const btnRegister = document.getElementById('btnRegister');
    const btnLogout = document.getElementById('btnLogout');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const closeLogin = document.getElementById('closeLogin');
    const closeRegister = document.getElementById('closeRegister');
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    // Abrir modal de login
    btnLogin.addEventListener('click', () => {
        loginModal.classList.add('active');
    });
    
    // Abrir modal de registro
    btnRegister.addEventListener('click', () => {
        registerModal.classList.add('active');
    });
    
    // Cerrar modales
    closeLogin.addEventListener('click', () => {
        loginModal.classList.remove('active');
    });
    
    closeRegister.addEventListener('click', () => {
        registerModal.classList.remove('active');
    });
    
    // Cambiar entre modales
    switchToRegister.addEventListener('click', () => {
        loginModal.classList.remove('active');
        registerModal.classList.add('active');
    });
    
    switchToLogin.addEventListener('click', () => {
        registerModal.classList.remove('active');
        loginModal.classList.add('active');
    });
    
    // Cerrar al hacer click fuera
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
        }
    });
    
    registerModal.addEventListener('click', (e) => {
        if (e.target === registerModal) {
            registerModal.classList.remove('active');
        }
    });
    
    // Manejar formulario de login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleLogin();
    });
    
    // Manejar formulario de registro
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleRegister();
    });
    
    // Cerrar sesión
    btnLogout.addEventListener('click', handleLogout);
}

// Manejar login
function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Obtener usuarios registrados
    const users = JSON.parse(localStorage.getItem('bettasUsers') || '[]');
    
    // Buscar usuario
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = { name: user.name, email: user.email };
        localStorage.setItem('bettasCurrentUser', JSON.stringify(currentUser));
        updateAuthUI();
        document.getElementById('loginModal').classList.remove('active');
        document.getElementById('loginForm').reset();
        showNotification(`¡Bienvenido de vuelta, ${user.name}!`);
    } else {
        showNotification('Credenciales incorrectas', true);
    }
}

// Manejar registro
function handleRegister() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    
    // Validaciones
    if (password !== confirmPassword) {
        showNotification('Las contraseñas no coinciden', true);
        return;
    }
    
    if (password.length < 6) {
        showNotification('La contraseña debe tener al menos 6 caracteres', true);
        return;
    }
    
    // Obtener usuarios existentes
    const users = JSON.parse(localStorage.getItem('bettasUsers') || '[]');
    
    // Verificar si el email ya existe
    if (users.some(u => u.email === email)) {
        showNotification('Este correo ya está registrado', true);
        return;
    }
    
    // Agregar nuevo usuario
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('bettasUsers', JSON.stringify(users));
    
    // Login automático
    currentUser = { name, email };
    localStorage.setItem('bettasCurrentUser', JSON.stringify(currentUser));
    
    updateAuthUI();
    document.getElementById('registerModal').classList.remove('active');
    document.getElementById('registerForm').reset();
    showNotification(`¡Cuenta creada exitosamente! Bienvenido, ${name}!`);
}

// Manejar cierre de sesión
function handleLogout() {
    currentUser = null;
    localStorage.removeItem('bettasCurrentUser');
    updateAuthUI();
    showNotification('Sesión cerrada exitosamente');
}

// Actualizar UI de autenticación
function updateAuthUI() {
    const btnLogin = document.getElementById('btnLogin');
    const btnRegister = document.getElementById('btnRegister');
    const userMenu = document.getElementById('userMenu');
    const userName = document.getElementById('userName');
    
    if (currentUser) {
        btnLogin.style.display = 'none';
        btnRegister.style.display = 'none';
        userMenu.style.display = 'flex';
        userName.textContent = `👋 ${currentUser.name}`;
    } else {
        btnLogin.style.display = 'block';
        btnRegister.style.display = 'block';
        userMenu.style.display = 'none';
    }
}

// Verificar sesión al cargar
function checkUserSession() {
    const savedUser = localStorage.getItem('bettasCurrentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateAuthUI();
    }
}

// Modificar la función showNotification para soportar errores
function showNotification(message, isError = false) {
    const notification = document.createElement('div');
    const bgColor = isError 
        ? 'linear-gradient(45deg, var(--accent-color), #dc3545)' 
        : 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))';
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 3000;
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
