const cartItems = document.getElementById('cartItems');
    const totalValue = document.getElementById('totalValue');

    // SIDEBAR NAVIGATION
    const icons = document.querySelectorAll('.sidebar .icon');
    const tabs = document.querySelectorAll('.tab-content');

    icons.forEach(icon => {
        icon.addEventListener('click', () => {
            icons.forEach(i => i.classList.remove('active'));
            icon.classList.add('active');

            tabs.forEach(tab => tab.classList.remove('active'));

            const targetId = icon.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // CART LOGIC
    document.querySelectorAll('.add-cart').forEach(btn => {
        btn.addEventListener('click', e => {
            const card = e.target.closest('.product-card');
            const name = card.querySelector('h5').textContent;
            const price = parseFloat(card.querySelector('.product-price').textContent.replace('Rs. ', '').replace(',', ''));
            addToCart(name, price);
        });
    });

    function addToCart(name, price) {
        const existing = Array.from(cartItems.children).find(item => item.querySelector('.name').textContent === name);
        if (existing) {
            const qtyDisplay = existing.querySelector('.qty');
            qtyDisplay.textContent = parseInt(qtyDisplay.textContent) + 1;
        } else {
            const div = document.createElement('div');
            div.className = 'cart-item mb-3';
            div.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <div class="name fw-bold">${name}</div>
                        <div class="price">Rs. ${price.toFixed(2)}</div>
                        <div class="mt-1">
                            <button class="btn btn-sm btn-accent minus">-</button>
                            <span class="qty px-2">1</span>
                            <button class="btn btn-sm btn-accent plus">+</button>
                        </div>
                    </div>
                    <button class="btn btn-danger btn-sm remove">×</button>
                </div>
            `;
            cartItems.appendChild(div);
        }
        updateTotal();
        setupCartHandlers();
    }

    function updateTotal() {
        let total = 0;
        document.querySelectorAll('.cart-item').forEach(item => {
            const price = parseFloat(item.querySelector('.price').textContent.replace('Rs. ', '').replace(',', ''));
            const qty = parseInt(item.querySelector('.qty').textContent);
            total += price * qty;
        });
        totalValue.textContent = 'Rs. ' + total.toFixed(2);
    }

    function setupCartHandlers() {
        document.querySelectorAll('.plus').forEach(btn => {
            btn.onclick = () => {
                const qty = btn.parentElement.querySelector('.qty');
                qty.textContent = parseInt(qty.textContent) + 1;
                updateTotal();
            };
        });
        document.querySelectorAll('.minus').forEach(btn => {
            btn.onclick = () => {
                const qty = btn.parentElement.querySelector('.qty');
                let val = parseInt(qty.textContent);
                if (val > 1) qty.textContent = val - 1;
                updateTotal();
            };
        });
        document.querySelectorAll('.remove').forEach(btn => {
            btn.onclick = () => {
                btn.closest('.cart-item').remove();
                updateTotal();
            };
        });
    }

    // SEARCH BAR FILTER
    document.getElementById('searchBar').addEventListener('keyup', function() {
        const searchTerm = this.value.toLowerCase();
        document.querySelectorAll('#productList .product-card').forEach(card => {
            const name = card.getAttribute('data-name').toLowerCase();
            card.parentElement.style.display = name.includes(searchTerm) ? 'block' : 'none';
        });
    });

    // CATEGORY FILTER
    const categoryButtons = document.querySelectorAll('.category-btn');
    const products = document.querySelectorAll('.product-card');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.textContent.trim();

            products.forEach(product => {
                const productCategory = product.getAttribute('data-category');
                if (category === 'All' || productCategory === category) {
                    product.parentElement.style.display = 'block';
                } else {
                    product.parentElement.style.display = 'none';
                }
            });
        });
    });

// User Database (Simulated)
const users = [
    { id: 'USR001', name: 'John Admin', username: 'admin', password: '123', role: 'Admin' },
    { id: 'USR002', name: 'Sarah Reception', username: 'reception', password: 'recept123', role: 'Receptionist' },
    { id: 'USR003', name: 'Mike Manager', username: 'mike', password: 'mike123', role: 'Admin' }
];

let currentUser = null;

// Role selector styling
document.querySelectorAll('.role-option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('.role-option').forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
        this.querySelector('input[type="radio"]').checked = true;
    });
});

// Login Form Handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const role = document.querySelector('input[name="role"]:checked').value;

    // Find user
    const user = users.find(u =>
        u.username === username &&
        u.password === password &&
        u.role === role
    );

    if (user) {
        currentUser = user;
        showDashboard();
    } else {
        alert('❌ Invalid credentials or role mismatch!');
    }
});

// Show Dashboard
function showDashboard() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('mainContent').classList.add('show');
    document.getElementById('userBadge').classList.add('show');

    // Display user info
    document.getElementById('displayName').textContent = currentUser.name;
    document.getElementById('displayRole').textContent = `${currentUser.role} • ${currentUser.id}`;
}

// Logout Handler
document.getElementById('logoutBtn').addEventListener('click', function() {
    if (confirm('Are you sure you want to logout?')) {
        currentUser = null;
        document.getElementById('loginScreen').classList.remove('hidden');
        document.getElementById('mainContent').classList.remove('show');
        document.getElementById('userBadge').classList.remove('show');
        document.getElementById('loginForm').reset();
        document.querySelectorAll('.role-option').forEach(opt => opt.classList.remove('active'));
        document.querySelector('.role-option').classList.add('active');
    }
});