// ReleaseModel.js
const ReleaseModel = {
    async fetchRelease(id) {
      // Appel à l'API ou Firebase pour récupérer les informations de la release
      const response = await fetch(`https://api.discogs.com/releases/${id}`);
      const data = await response.json();
      return data;
    }
  };
  
  // Exposer le modèle globalement pour l'utiliser dans le contrôleur
  window.releaseModel = ReleaseModel;
  