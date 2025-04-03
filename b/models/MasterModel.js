// MasterModel.js
const MasterModel = {
    async fetchMaster(id) {
      // Appel à l'API ou Firebase pour récupérer les informations du master
      const response = await fetch(`https://api.discogs.com/masters/${id}`);
      const data = await response.json();
      return data;
    }
  };
  
  // Exposer le modèle globalement pour l'utiliser dans le contrôleur
  window.masterModel = MasterModel;
  