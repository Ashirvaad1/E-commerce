const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore();
const supabase = createClient(https://izvdtpdjsnwerogmrwiv.supabase.co, eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6dmR0cGRqc253ZXJvZ21yd2l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxNjIwNDMsImV4cCI6MjA0ODczODA0M30.2PlstYR2Bg8tZnwcgKj8nblnpHLNZQIXAon8kBx90Yw);
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

auth.onAuthStateChanged((user) => {
    if (!user) {
        window.location.href = "login.html";
    }
});

const db = getFirestore(app);

async function addProduct(event) {
    event.preventDefault();
    const user = auth.currentUser;
    if (!user) {
        alert("You must be logged in to add products.");
        window.location.href = "login.html";
        return;
    }
    const productName = document.getElementById("productName").value.trim();
    const price = parseFloat(document.getElementById("price").value);
    const quantity = parseInt(document.getElementById("quantity").value);
    if (!productName || isNaN(price) || isNaN(quantity) || quantity < 0 || price < 0) {
        alert("Please provide valid product details.");
        return;
    }
    try {
        const shopkeeperEmail = user.email;
        console.log("Adding product for:", shopkeeperEmail);
        const userRef = collection(db, shopkeeperEmail);
        const productRef = doc(userRef, productName);
        await setDoc(productRef, {
            price,
            quantity,
        });
        alert("Product added successfully!");
        document.getElementById("productForm").reset();
    } catch (error) {
        console.error("Error adding product:", error.message);
        alert(`Error adding product: ${error.message}`);
    }
}

function displayShops() {
    const shopElement = document.getElementById("shops");
    if (shopElement) {
        shopElement.innerHTML = "Shops list";
    } else {
        console.error("Element 'shops' not found!");
    }
}

async function viewProducts(shopId) {
    localStorage.setItem('currentShop', shopId);
    location.href = 'view-products.html';
}

async function displayProducts() {
    const shopId = localStorage.getItem('currentShop');
    const productList = document.getElementById('products');
    productList.innerHTML = '';
    try {
        const querySnapshot = await getDocs(collection(db, `shops/${shopId}/products`));
        querySnapshot.forEach((doc) => {
            const li = document.createElement('li');
            li.textContent = `Name: ${doc.data().productName}, Price: ${doc.data().price}, Quantity: ${doc.data().quantity}`;
            productList.appendChild(li);
        });
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

if (location.pathname.includes('view-products.html')) {
    window.onload = displayProducts;
}
const SUPABASE_URL = "https://izvdtpdjsnwerogmrwiv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6dmR0cGRqc253ZXJvZ21yd2l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxNjIwNDMsImV4cCI6MjA0ODczODA0M30.2PlstYR2Bg8tZnwcgKj8nblnpHLNZQIXAon8kBx90Yw";
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const form = document.getElementById("product-form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const price = parseFloat(document.getElementById("price").value);
  const quantity = parseInt(document.getElementById("quantity").value);
  const imageFile = document.getElementById("image").files[0];
  if (!imageFile) {
    alert("Please select an image file.");
    return;
  }
  try {
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(`public/${imageFile.name}`, imageFile, {
        cacheControl: "3600",
        upsert: true,
      });
    if (uploadError) {
      console.error("Image upload error:", uploadError.message);
      alert("Failed to upload image.");
      return;
    }
    const { data: publicURLData } = supabase.storage
      .from("product-images")
      .getPublicUrl(`public/${imageFile.name}`);
    const imageURL = publicURLData.publicUrl;
      const { error: insertError } = await supabase.from("products").insert([
      {
        name: name,
        price: price,
        quantity: quantity,
        image_url: imageURL,
      },
    ]);
    if (insertError) {
      console.error("Product insert error:", insertError.message);
      alert("Failed to add product.");
      return;
    }
    alert("Product added successfully!");
    form.reset();
  } catch (err) {
    console.error("Error:", err.message);
    alert("An error occurred. Please try again.");
  }
});



window.addProduct = addProduct;
window.signupUser = signupUser;
window.loginUser = loginUser;
window.logoutUser = logoutUser;
window.signInWithGoogle = signInWithGoogle;
window.displayShops = displayShops;
window.onload = displayShops;
