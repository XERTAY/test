// PageModel.js
const PageModel = {
    async fetchPageData(type, id) {
      let url;
      switch(type) {
        case 'artist':
          url = `https://api.discogs.com/artists/${id}`;
          break;
        case 'master':
          url = `https://api.discogs.com/masters/${id}`;
          break;
        case 'release':
          url = `https://api.discogs.com/releases/${id}`;
          break;
        default:
          throw new Error('Type inconnu');
      }
  
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }
  };
  
  // Exposition globale pour l'utiliser dans le contrôleur
  window.PageModel = PageModel;
  