// ReleaseController.js
const ReleaseController = {
    state: {
      release: null,
      img: null
    },
  
    async onMounted() {
      const data = window.selectedRelease;
      if (!data) return;
  
      this.state.img = data.img;
  
      try {
        // Appel à la fonction modèle pour récupérer les données de la release depuis l'API ou Firebase
        this.state.release = await window.releaseModel.fetchRelease(data.id);
        this.update();
      } catch (e) {
        console.error("Erreur chargement release :", e);
      }
    }
  };
  
  // Exposer le contrôleur globalement pour qu'il soit accessible dans le fichier .riot
  window.ReleaseController = ReleaseController;
  