import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyADJuT7UDOxpu4gaV6aRpOCzsBPBb0O368",
    authDomain: "e-commerce-6015d.firebaseapp.com",
    projectId: "e-commerce-6015d",
    storageBucket: "e-commerce-6015d.firebasestorage.app",
    messagingSenderId: "996362215179",
    appId: "1:996362215179:web:9a28af932292d45d9f0c0e",
    measurementId: "G-80XSTM8F3N"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
function signupUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    createUserWithEmailAndPassword(auth, email, password)
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
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Login successful! Welcome back, " + userCredential.user.email);
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
}
function logoutUser() {
    signOut(auth)
        .then(() => {
            alert("You have logged out.");
            location.href = "index.html";
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
}
const provider = new firebase.auth.GoogleAuthProvider();
function signInWithGoogle() {
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            alert(`Welcome, ${user.displayName}!`);
        })
        .catch((error) => {
            console.error("Error during Google Sign-In:", error.message);
            alert("Failed to sign in: " + error.message);
        });
}
window.signupUser = signupUser;
window.loginUser = loginUser;
window.logoutUser = logoutUser;
