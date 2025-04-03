// ArtistController.js
const ArtistController = {
    state: {
      artist: null,
      img: null
    },
  
    async onMounted() {
      const data = window.selectedArtist;
      if (!data) return;
  
      this.state.img = data.img;
  
      try {
        // Appel à la fonction model pour récupérer les données de l'artiste depuis l'API ou Firebase
        this.state.artist = await window.artistModel.fetchArtist(data.id);
        this.update();
      } catch (e) {
        console.error("Erreur chargement artiste :", e);
      }
    }
  };
  
  // Exposer le contrôleur globalement pour qu'il soit accessible dans le fichier .riot
  window.ArtistController = ArtistController;
  