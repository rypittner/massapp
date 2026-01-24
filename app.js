const { Client, Account, ID } = Appwrite;

const client = new Client()
    .setEndpoint('https://sfo.cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('69567e050003ca751cbe');              // Your project ID

const account = new Account(client);

// Sign Up Function
async function handleSignup() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const fullname = document.getElementById('fullname').value;
    const username = document.getElementById('username').value;

    try {
        // ID.unique() is usually used, but we will use 'username' as the ID
        // Format: account.create(ID, email, password, name)
        await account.create(username, email, password, fullname);
        
        alert("Account created successfully!");
        // Now log them in automatically
        await account.createEmailSession(email, password);
        window.location.href = 'dashboard.html';
    } catch (error) {
        alert("Signup failed: " + error.message);
    }
}

// Log In Function
async function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        await account.createEmailSession(email, password);
        showApp();
    } catch (error) {
        alert(error.message);
    }
}

// Show/Hide UI
function showApp() {
    document.getElementById('auth-container').style.display = 'none';
    document.getElementById('app-content').style.display = 'block';
}

async function handleLogout() {
    await account.deleteSession('current');
    location.reload();
}

// Check Session on Page Load
async function checkSession() {
    try {
        // Attempt to get the current user's details
        const user = await account.get();
        
        // If successful, and user is on the landing/login page, redirect to dashboard
        if (window.location.pathname.endsWith('welcome') || window.location.pathname === '/') {
            window.location.href = 'dashboard.html';
        }
        
        // Optional: If you have elements meant for logged-in users only
        console.log("Logged in as:", user.name);
        
    } catch (error) {
        // If this fails, the user is not logged in.
        // If they are trying to access a protected page (like dashboard.html), 
        // you might want to redirect them back to the login page.
        if (window.location.pathname.endsWith('dashboard.html')) {
            window.location.href = 'index.html';
        }
    }
}

// Call it immediately
checkSession();
