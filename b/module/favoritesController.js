import {
    getFirestore,
    collection,
    getDocs,
    doc,
    deleteDoc,
    addDoc,
    serverTimestamp
  } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
  
  const db = window.db || getFirestore();
  
  async function getUserId() {
    return window.auth?.currentUser?.uid || localStorage.getItem("user_id") || null;
  }
  
  export async function getUserFavorites() {
    const userId = await getUserId();
    if (!userId) return [];
  
    const favoritesRef = collection(db, "users", userId, "favorites");
    const snapshot = await getDocs(favoritesRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
  
  export async function toggleFavorite(item) {
    const userId = await getUserId();
    if (!userId) return { status: "error", message: "Vous devez être connecté." };
  
    const favoritesRef = collection(db, "users", userId, "favorites");
    const snapshot = await getDocs(favoritesRef);
  
    const existing = snapshot.docs.find(doc => doc.data().item_id === item.id);
  
    if (existing) {
      await deleteDoc(doc(db, "users", userId, "favorites", existing.id));
      return { status: "removed", message: "❌ Retiré des favoris" };
    } else {
      await addDoc(favoritesRef, {
        item_id: item.id,
        item_type: item.type,
        item_img: item.cover_image,
        item_title: item.title,
        created_at: serverTimestamp()
      });
      return { status: "added", message: "⭐ Ajouté aux favoris !" };
    }
  }
  
  window.favGetUserFavorites = getUserFavorites;
  window.favToggleFavorite = toggleFavorite;
  