// ArtistModel.js
const ArtistModel = {
    async fetchArtist(id) {
      // Appel à l'API ou Firebase pour récupérer les informations de l'artiste
      const response = await fetch(`https://api.discogs.com/artists/${id}`);
      const data = await response.json();
      return data;
    }
  };
  
  // Exposer le modèle globalement pour l'utiliser dans les contrôleurs
  window.artistModel = ArtistModel;
  