// Récup des éléments du DOM
const searchInput = document.getElementById('research');
const titles = document.querySelectorAll('.title');

// Fonction de recherche
function research() {
    const search = searchInput.value; // Récupérer la valeur au moment de la recherche
    
    if (search === '') {
        // Si vide, afficher toutes les cartes
        titles.forEach(title => {
            title.parentElement.style.display = "flex";
        });
        return;
    }
    
    // Parcourir tous les titres
    for (let i = 0; i < titles.length; i++) {
        // Transformer le texte en minuscules et recherche si le titre contient le texte cherché
        if (titles[i].innerText.toLowerCase().includes(search.toLowerCase()) == false) {
            titles[i].parentElement.style.display = "none"; // Cache la carte si pas de correspondance
        } else {
            titles[i].parentElement.style.display = "flex"; // Affiche la carte si correspondance
        }
    }
}

// Recherche temps réel
searchInput.addEventListener('input', research);