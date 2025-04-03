import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Configuration Firebase (⚠️ cette partie doit être adaptée à ton projet)
const firebaseConfig = {
  apiKey: "AIzaSyCuENdiLjldpLXzzZexBvR00Tjve0_nbgY",
  authDomain: "riot-discogs.firebaseapp.com",
  projectId: "riot-discogs",
  storageBucket: "riot-discogs.firebasestorage.app",
  messagingSenderId: "336467607719",
  appId: "1:336467607719:web:f2ea12c75eb0fbe2b31b82",
  measurementId: "G-PZHT982N86"
};

// Initialisation
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Persistance UID (optionnel mais utile en cas de F5)
onAuthStateChanged(auth, (user) => {
  if (user && !localStorage.getItem("user_id")) {
    localStorage.setItem("user_id", user.uid);
  }
});

const userId = localStorage.getItem("user_id");

// 🟢 INSCRIPTION
export async function signin(email, password, prenom, nom, pseudo) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  await addUserToFirestore(user, email, prenom, nom, pseudo);
  return user;
}

// 🔐 CONNEXION
export async function loginUser(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

// 🧾 ENREGISTREMENT DE L’UTILISATEUR DANS Firestore
export async function addUserToFirestore(user, email, prenom, nom, pseudo) {
  await addDoc(collection(db, "users"), {
    uid: user.uid,
    email,
    prenom,
    nom,
    pseudo
  });
}

// ⭐ AJOUT FAVORI
export async function addFavorite(item_id, item_type, item_img, item_title) {
  const favoritesCollectionRef = collection(db, "users", userId, "favorites");
  await addDoc(favoritesCollectionRef, {
    item_id,
    item_type,
    item_img,
    item_title,
    created_at: serverTimestamp()
  });
}

// 🗑 SUPPRESSION FAVORI
export async function removeFavorite(item_id) {
  const favRef = doc(db, "users", userId, "favorites", item_id);
  await deleteDoc(favRef);
}

// 📚 RÉCUPÉRATION DES FAVORIS
export async function getFavorites() {
  const favoritesCollection = collection(db, "users", userId, "favorites");
  const q = query(favoritesCollection, where("user_id", "==", userId)); // Optionnel (tu peux aussi supprimer ce where)
  const requete = await getDocs(q);
  const favorites = [];

  requete.forEach((doc) => {
    favorites.push({
      id: doc.id,
      ...doc.data()
    });
  });

  return favorites;
}

// 👤 RÉCUPÉRATION DES INFOS USER
export async function getUserData(uid) {
  const userColl = collection(db, "users");
  const q = query(userColl, where("uid", "==", uid));
  const requete = await getDocs(q);
  const data = [];

  requete.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data()
    });
  });

  return data;
}

// 🪄 Exposition globale (pour accès via window depuis Riot.js)
window.auth = auth;
window.db = db;
window.signin = signin;
window.loginUser = loginUser;
window.addUserToFirestore = addUserToFirestore;
window.addFavorite = addFavorite;
window.getFavorites = getFavorites;
window.getUserData = getUserData;
window.removeFavorite = removeFavorite;
