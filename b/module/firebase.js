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

// 🔧 Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCuENdiLjldpLXzzZexBvR00Tjve0_nbgY",
  authDomain: "riot-discogs.firebaseapp.com",
  projectId: "riot-discogs",
  storageBucket: "riot-discogs.firebasestorage.app",
  messagingSenderId: "336467607719",
  appId: "1:336467607719:web:f2ea12c75eb0fbe2b31b82",
  measurementId: "G-PZHT982N86"
};

// 🚀 Initialisation
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 🔐 UID persistant
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("✅ Utilisateur connecté :", user.uid);
    if (!localStorage.getItem("user_id")) {
      localStorage.setItem("user_id", user.uid);
    }
  } else {
    console.log("🚫 Aucun utilisateur connecté");
  }
});

// 📌 Récupération UID (toujours après onAuthStateChanged)
const getCurrentUserId = () => {
  const uid = localStorage.getItem("user_id");
  if (!uid) console.warn("⚠️ Aucun UID trouvé dans localStorage !");
  return uid;
};

// 🔐 Connexion
export async function loginUser(email, password) {
  try {
    console.log("🔑 Connexion de :", email);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("✅ Connexion réussie :", userCredential.user.uid);
    return userCredential.user;
  } catch (e) {
    console.error("❌ Échec connexion :", e);
    throw e;
  }
}

// 🟢 Inscription
export async function signin(email, password, prenom, nom, pseudo) {
  try {
    console.log("🆕 Inscription de :", email);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("✅ Compte créé :", user.uid);
    await addUserToFirestore(user, email, prenom, nom, pseudo);
    return user;
  } catch (e) {
    console.error("❌ Échec inscription :", e);
    throw e;
  }
}

// 👤 Ajout user Firestore
export async function addUserToFirestore(user, email, prenom, nom, pseudo) {
  try {
    console.log("📝 Ajout user Firestore :", user.uid);
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      email,
      prenom,
      nom,
      pseudo
    });
  } catch (e) {
    console.error("❌ Erreur ajout utilisateur Firestore :", e);
    throw e;
  }
}

// ⭐ Ajout favori
export async function addFavorite(item_id, item_type, item_img, item_title) {
  const userId = getCurrentUserId();
  if (!userId) return;

  try {
    console.log(`➕ Ajout favori : ${item_id} (${item_type}) pour user ${userId}`);
    const favoritesCollectionRef = collection(db, "users", userId, "favorites");
    const docRef = await addDoc(favoritesCollectionRef, {
      item_id,
      item_type,
      item_img,
      item_title,
      created_at: serverTimestamp()
    });
    console.log("✅ Favori ajouté avec ID :", docRef.id);
    return { id: docRef.id };
  } catch (e) {
    console.error("❌ Erreur ajout favori :", e);
    throw e;
  }
}

// 🗑 Suppression favori
export async function removeFavorite(favDocId) {
  const userId = getCurrentUserId();
  if (!userId) return;

  try {
    console.log(`🗑 Suppression favori docId : ${favDocId}`);
    const favRef = doc(db, "users", userId, "favorites", favDocId);
    await deleteDoc(favRef);
    console.log("✅ Favori supprimé");
  } catch (e) {
    console.error("❌ Erreur suppression favori :", e);
    throw e;
  }
}

// 📚 Récupération favoris
export async function getFavorites() {
  const userId = getCurrentUserId();
  if (!userId) return [];

  try {
    console.log("📦 Récupération des favoris pour :", userId);
    const favoritesCollection = collection(db, "users", userId, "favorites");
    const requete = await getDocs(favoritesCollection);
    const favorites = [];

    requete.forEach((doc) => {
      favorites.push({
        id: doc.id,
        ...doc.data()
      });
    });

    console.log(`✅ ${favorites.length} favori(s) trouvé(s)`);
    return favorites;
  } catch (e) {
    console.error("❌ Erreur récupération favoris :", e);
    throw e;
  }
}

// ℹ️ Récupération infos utilisateur
export async function getUserData(uid) {
  try {
    console.log("📋 Récupération données utilisateur :", uid);
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
  } catch (e) {
    console.error("❌ Erreur récupération données utilisateur :", e);
    throw e;
  }
}

// 🌍 Exposition globale
window.auth = auth;
window.db = db;
window.signin = signin;
window.loginUser = loginUser;
window.addUserToFirestore = addUserToFirestore;
window.addFavorite = addFavorite;
window.getFavorites = getFavorites;
window.getUserData = getUserData;
window.removeFavorite = removeFavorite;
