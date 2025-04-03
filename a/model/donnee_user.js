export const donnee_user = {
    state: {
      isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
      user_id: localStorage.getItem("user_id") || null,
      user_pseudo: localStorage.getItem("user_pseudo") || null,
      user_prenom:  localStorage.getItem("user_prenom") || null,
      user_nom:  localStorage.getItem("user_nom") || null,
    },
    
    setLoggedIn(status) {
      this.state.isLoggedIn = status;
      localStorage.setItem("isLoggedIn", status);
    },

    setUserData(user) {
      if (!user) return;

      if (Array.isArray(user) && user.length > 0) {
          user = user[0];
      }

      this.state.user_id = user.uid;
      this.state.user_pseudo = user.pseudo;
      this.state.user_prenom = user.prenom;
      this.state.user_nom = user.nom;
      this.state.user_email = user.email;

      localStorage.setItem("user_id", user.uid);
      localStorage.setItem("user_pseudo", user.pseudo);
      localStorage.setItem("user_prenom", user.prenom);
      localStorage.setItem("user_nom", user.nom);
      localStorage.setItem("user_email", user.email);
  }

};

  window.donnee_user = donnee_user;


