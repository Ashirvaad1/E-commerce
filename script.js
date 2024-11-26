const firebaseConfig = {
    apiKey: "AIzaSyADJuT7UDOxpu4gaV6aRpOCzsBPBb0O368",
    authDomain: "e-commerce-6015d.firebaseapp.com",
    projectId: "e-commerce-6015d",
    storageBucket: "e-commerce-6015d.firebasestorage.app",
    messagingSenderId: "996362215179",
    appId: "1:996362215179:web:9a28af932292d45d9f0c0e",
    measurementId: "G-80XSTM8F3N"
};
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
function signupUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Signup successful! Welcome, " + userCredential.user.email);
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
}
function loginUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Login successful! Welcome back, " + userCredential.user.email);
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
}
function logoutUser() {
    auth.signOut()
        .then(() => {
            alert("You have logged out.");
            location.href = "index.html";
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
}
window.signupUser = signupUser;
window.loginUser = loginUser;
window.logoutUser = logoutUser;
