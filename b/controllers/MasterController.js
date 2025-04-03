// MasterController.js
const MasterController = {
    state: {
      master: null,
      img: null
    },
  
    async onMounted() {
      const data = window.selectedMaster;
      if (!data) return;
  
      this.state.img = data.img;
  
      try {
        // Appel à la fonction modèle pour récupérer les données du master depuis l'API ou Firebase
        this.state.master = await window.masterModel.fetchMaster(data.id);
        this.update();
      } catch (e) {
        console.error("Erreur chargement master :", e);
      }
    }
  };
  
  // Exposer le contrôleur globalement pour qu'il soit accessible dans le fichier .riot
  window.MasterController = MasterController;
  