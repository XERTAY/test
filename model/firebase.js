import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, where, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyCET0lrNo4YmUrySQQEWj6HBZe4LsNkQXA",
    authDomain: "mini-proj-s4.firebaseapp.com",
    projectId: "mini-proj-s4",
    storageBucket: "mini-proj-s4.firebasestorage.app",
    messagingSenderId: "168150495868",
    appId: "1:168150495868:web:6592b808eff10891bfcff9",
    measurementId: "G-ZZ5D9EC044"
  };
  
  
const userId = localStorage.getItem("user_id");
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export async function signin(email, password, prenom, nom, pseudo) {

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await addUserToFirestore(user, email, prenom, nom, pseudo);

        return user; 
    
}

export async function getFavorites() {

    const favoritesCollection = collection(db, "users", userId, "favorites");
    const q = query(favoritesCollection, where("user_id", "==", userId));
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

export async function removeFavorite(item_id) {

    const aSupp = doc(db, "users", userId, "favorites", item_id);
    await deleteDoc(aSupp);
  }



export async function addFavorite(item_id, item_type, item_img, item_title) {

    const favoritesCollectionRef = collection(db, "users", userId, "favorites");

    const querySnapshot = await getDocs(favoritesCollectionRef);

    await addDoc(querySnapshot, {
        item_id: item_id,
        item_type: item_type,
        item_img: item_img,
        item_title: item_title,
        created_at: serverTimestamp()
      });    
  
  }
  
  

export async function addUserToFirestore(user, email, prenom, nom, pseudo) {

        await addDoc(collection(db, 'users'), {
            uid: user.uid,
            email: email,
            prenom: prenom,
            nom: nom,
            pseudo: pseudo
        });
        
}



export async function loginUser(email, password) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
}


window.signin = signin;
window.addUserToFirestore = addUserToFirestore;
window.loginUser = loginUser;
window.addFavorite = addFavorite;
window.getFavorites = getFavorites;
window.getUserData = getUserData;
window.removeFavorite = removeFavorite;



