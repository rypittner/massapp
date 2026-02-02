const { Client, Account, ID } = Appwrite;

const client = new Client()
    .setEndpoint('https://sfo.cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('69567e050003ca751cbe');              // Your project ID

const account = new Account(client);

// Sign Up Function
async function handleSignup() {
    checkSession();

    // 2. The Main Signup Logic (One single try block)
    try {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const fullname = document.getElementById('fullname').value;
        const username = document.getElementById('username').value;

        // Create account
        await account.create(username, email, password, fullname);
        
        // Log in
        await account.createEmailSession(email, password);
        
        window.location.href = 'database.html';
    } catch (error) {
        // This catches ANY error in step 2 (missing fields, weak password, etc.)
        alert("Signup failed: " + error.message);
    }
}

// Log In Function
async function handleLogin() {
    checkSession();

    // 2. Grab the credentials from the UI
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // 3. Attempt to create the session
    try {
        // Use createEmailPasswordSession if on Appwrite 14+ 
        await account.createEmailSession(email, password);
        
        // 4. Redirect to database
        window.location.href = 'database.html';
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

async function checkSession() {
    try {
        // Attempt to get the current user session
        await account.get();

        // SUCCESS: The user is logged in.
        // If they are NOT already on the database, send them there.
        if (!window.location.pathname.endsWith('database.html')) {
            window.location.href = 'database.html';
        }

    } catch (error) {
        // FAILURE: No active session.
        // If they try to access the database, kick them back to the start.
        if (window.location.pathname.endsWith('database.html')) {
            window.location.href = 'welcome.html'; // Or your main index page
        }
        console.log("Logged out: Access to public pages allowed.");
    }
}

// Call it immediately
checkSession();
