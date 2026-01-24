const { Client, Account, ID } = Appwrite;

const client = new Client()
    .setEndpoint('https://sfo.cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('69567e050003ca751cbe');              // Your project ID

const account = new Account(client);

// Sign Up Function
async function handleSignup() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        await account.create(ID.unique(), email, password);
        alert("Account created! Now you can log in.");
    } catch (error) {
        alert(error.message);
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
