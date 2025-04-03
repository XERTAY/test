const key = "bfPcZjwMsQkdFSStUvaW"; 
const secret = "AuYDddTAbHlGRFsdWZhGfrgwhFCtUVqR";
const main_page = "Zz top"

export async function searchDiscogs(query, recherchetype) {
    const réponses = await fetch(`https://api.discogs.com/database/search?q=${query}&type=${recherchetype}&key=${key}&secret=${secret}`);
    return réponses.json();
}

export async function dernierTitre(page = 1) {
    const réponses = await fetch(`https://api.discogs.com/database/search?q=${main_page}&type=release&page=${page}&key=${key}&secret=${secret}`);
    return réponses.json(); 
}


export async function dernierArtiste() {
    const réponses = await fetch(`https://api.discogs.com/database/search?q=&type=artists&key=${key}&secret=${secret}`);
    return réponses.json(); 
}

export async function dernierMasters() {
    const réponses = await fetch(`https://api.discogs.com/database/search?q=&type=masters&key=${key}&secret=${secret}`);
    return réponses.json(); 
}

export async function masterdiscogs(master_id) {    
    const réponses = await fetch(`https://api.discogs.com/masters/${master_id}`);
    return réponses.json(); 
}

export async function releasediscogs(release_id) {    
    const réponses = await fetch(`https://api.discogs.com/releases/${release_id}`);
    return réponses.json(); 
}

export async function artistDiscogs(artists_id) {    
    const réponses = await fetch(`https://api.discogs.com/artists/${artists_id}`);
    return réponses.json(); 
}

window.searchDiscogs = searchDiscogs;
window.masterdiscogs = masterdiscogs;
window.artistDiscogs = artistDiscogs;
window.dernierTitre = dernierTitre;
window.dernierArtiste = dernierArtiste;
window.dernierMasters = dernierMasters;
window.releasediscogs = releasediscogs;
