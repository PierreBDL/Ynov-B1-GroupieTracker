// Récup des éléments du DOM
const searchInput = document.getElementById('research');
const titles = document.querySelectorAll('.card-title');

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
        // Transforme le texte en minuscules et recherche si le titre contient le texte recherché
        if (!titles[i].innerText.toLowerCase().includes(search.toLowerCase())) {
            titles[i].parentElement.style.display = "none"; // Cache la carte si pas de correspondance
        } else {
            titles[i].parentElement.style.display = "flex"; // Affiche la carte si correspondance
        }
    }
}

// Recherche temps réel
searchInput.addEventListener('input', research);