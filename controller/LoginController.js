// ==================== USER DATABASE (SIMULATED) ==================== //
const users = [
    { id: 'USR001', name: 'Imasha Dewmi', username: 'imashadewmi557@gmail.com', password: 'id20041003@', role: 'Admin' },
    { id: 'USR002', name: 'Sarah Reception', username: 'reception', password: 'recept123', role: 'Receptionist' },
    { id: 'USR003', name: 'Mike Manager', username: 'mike', password: 'mike123', role: 'Admin' }
];

let currentUser = null;

// ==================== ROLE SELECTOR STYLING ==================== //
document.querySelectorAll('.role-option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('.role-option').forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
        this.querySelector('input[type="radio"]').checked = true;
    });
});

// ==================== LOGIN FORM HANDLER ==================== //
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const roleInput = document.querySelector('input[name="role"]:checked');

    if (!roleInput) {
        alert("⚠️ Please select your role before logging in!");
        return;
    }

    const role = roleInput.value;

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

// ==================== SHOW DASHBOARD ==================== //
function showDashboard() {
    const loginScreen = document.getElementById('loginScreen');
    const mainContent = document.getElementById('mainContent');
    const userBadge = document.getElementById('userBadge');

    // Hide login screen and show dashboard
    if (loginScreen) loginScreen.classList.add('hidden');
    if (mainContent) mainContent.classList.add('show');
    if (userBadge) userBadge.classList.add('show');

    // Display user info
    const displayName = document.getElementById('displayName');
    const displayRole = document.getElementById('displayRole');

    if (displayName && currentUser) displayName.textContent = currentUser.name;
    if (displayRole && currentUser) displayRole.textContent = `${currentUser.role} • ${currentUser.id}`;
}

// ==================== LOGOUT HANDLER ==================== //
document.getElementById('logoutBtn').addEventListener('click', function() {
    if (confirm('Are you sure you want to logout?')) {
        currentUser = null;

        const loginScreen = document.getElementById('loginScreen');
        const mainContent = document.getElementById('mainContent');
        const userBadge = document.getElementById('userBadge');

        if (loginScreen) loginScreen.classList.remove('hidden');
        if (mainContent) mainContent.classList.remove('show');
        if (userBadge) userBadge.classList.remove('show');

        // Reset form and role selection
        const loginForm = document.getElementById('loginForm');
        if (loginForm) loginForm.reset();

        document.querySelectorAll('.role-option').forEach(opt => opt.classList.remove('active'));
        const firstRole = document.querySelector('.role-option');
        if (firstRole) firstRole.classList.add('active');
    }
});