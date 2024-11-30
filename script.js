import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
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
const provider = new GoogleAuthProvider();
function signupUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert(`Signup successful! Welcome, ${userCredential.user.email}`);
        })
        .catch((error) => {
            alert(`Error: ${error.message}`);
        });
}
function loginUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert(`Login successful! Welcome back, ${userCredential.user.email}`);
        })
        .catch((error) => {
            alert(`Error: ${error.message}`);
        });
}
function logoutUser() {
    signOut(auth)
        .then(() => {
            alert("You have logged out.");
            location.href = "index.html";
        })
        .catch((error) => {
            alert(`Error: ${error.message}`);
        });
}
function signInWithGoogle() {
    signInWithPopup(auth, provider)
        .then((result) => {
            alert(`Welcome, ${result.user.displayName}`);
        })
        .catch((error) => {
            alert(`Error: ${error.message}`);
        });
}
const db = getFirestore(app);
async function addProduct(event) {
    event.preventDefault();
    const shopName = document.getElementById('shopName').value;
    const productName = document.getElementById('productName').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;
    try {
        const shopRef = doc(db, "shops", shopName);
        await setDoc(shopRef, { name: shopName }, { merge: true });
        const productRef = doc(collection(db, `shops/${shopName}/products`));
        await setDoc(productRef, {
            productName,
            price: parseFloat(price),
            quantity: parseInt(quantity),
        });
        alert("Product added successfully!");
        document.getElementById('productForm').reset();
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}
async function displayShops() {
    const shopList = document.getElementById('shops');
    shopList.innerHTML = '';
    try {
        const querySnapshot = await getDocs(collection(db, "shops"));
        querySnapshot.forEach((doc) => {
            const li = document.createElement('li');
            li.textContent = doc.data().name;
            li.addEventListener('click', () => viewProducts(doc.id));
            shopList.appendChild(li);
        });
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}
window.addProduct = addProduct;
window.signupUser = signupUser;
window.loginUser = loginUser;
window.logoutUser = logoutUser;
window.signInWithGoogle = signInWithGoogle;
window.displayShops = displayShops;
window.onload = displayShops;
