// PageController.js
const PageController = {
    state: {
      data: null,
      img: null,
      type: null
    },
  
    async onMounted() {
      const { type, id, img } = window.selectedPageData; // On passe ces infos depuis la vue
      if (!type || !id) return;
  
      this.state.img = img;
      this.state.type = type;
  
      try {
        // Récupération des données depuis le modèle en fonction du type (artist, master, release)
        this.state.data = await window.PageModel.fetchPageData(type, id);
        this.update();
      } catch (e) {
        console.error(`Erreur lors du chargement des données ${type}:`, e);
      }
    }
  };
  
  // Exposer le contrôleur globalement pour l'utiliser dans le fichier .riot
  window.PageController = PageController;
  