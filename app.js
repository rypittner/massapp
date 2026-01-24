const { Client, Account, ID } = Appwrite;

const client = new Client()
    .setEndpoint('https://sfo.cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('69567e050003ca751cbe');              // Your project ID

const account = new Account(client);

// Sign Up Function
async function handleSignup() {
    try {
        // 1. Check if a session already exists
        try {
            await account.get();
            // If this succeeds, user is already logged in
            window.location.href = 'dashboard.html';
            return; // Exit the function early
        } catch (authError) {
            // No session exists, proceed to login
        }
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
    // 1. Check if they are already logged in FIRST
    try {
        await account.get();
        window.location.href = 'dashboard.html';
        return; // Stop execution here
    } catch (authError) {
        // This is good! It means no session exists. Proceed to login.
        console.log("No active session. Proceeding with login...");
    }

    // 2. Grab the credentials from the UI
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // 3. Attempt to create the session
    try {
        // Use createEmailPasswordSession if on Appwrite 14+ 
        await account.createEmailPasswordSession(email, password);
        
        // 4. Redirect to dashboard
        window.location.href = 'dashboard.html';
    } catch (error) {
        alert("Login failed: " + error.message);
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
        if (window.location.pathname.endsWith('welcome.html') || window.location.pathname === '/') {
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
