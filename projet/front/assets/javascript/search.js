// Récup des éléments du DOM
const searchInput = document.getElementById('research');
const cards = document.querySelectorAll('.card');

// Fonction de recherche
function research() {
    const search = searchInput.value; // Récupérer la valeur au moment de la recherche
    
    if (search === '') {
        // Si vide, afficher toutes les cartes
        cards.forEach(card => {
            card.style.display = "flex";
        });
        return;
    }

    cards.forEach(card => {
        const title = card.querySelector(".title");
        const members = card.querySelectorAll('.member');

        let isResearch = false;


        // Regarder si le titre est recherché
        if (title.innerText.toLowerCase().includes(search.toLowerCase())) {
            isResearch = true;
        }

        // Parcourir tous les membres pour voir si le texte cherché correspond à un membre
        members.forEach (member => {
            if (member.innerText.toLowerCase().includes(search.toLowerCase())) {
                isResearch = true;
            }
        });

        // Si recherché => affiche sinon non
        if (isResearch == true) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });    
}

// Recherche temps réel
searchInput.addEventListener('input', research);