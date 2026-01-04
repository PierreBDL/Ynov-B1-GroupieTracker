// Récup des éléments du DOM
const searchInput = document.getElementById('research');
const cards = document.querySelectorAll('.card');

// Eviter autocomplétion en boucle
let isDeleting = false;

// Autocomplétion désactivée si correspondance unique


// Fonction de recherche
function research() {
    // Vérification si on appuie sur "suppr"
    searchInput.addEventListener('keydown', (event) => {
        if (event.key === "Backspace" || event.key === "Delete") {
            isDeleting = true;
        } else {
            isDeleting = false;
        }
    });

    const search = searchInput.value; // Récupérer la valeur au moment de la recherche
    let correspondances = []; // Correspondances recherches
    
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

        let isTitle = false;
        let isMember = false;

        // Correspondances
        let NomResult = "";
        let typeResult = "";

        // Regarder si le titre est recherché
        if (title.innerText.toLowerCase().includes(search.toLowerCase())) {
            isTitle = true;
            NomResult = title.innerText;
            typeResult = "Groupe";
        }

        // Parcourir tous les membres pour voir si le texte cherché correspond à un membre
        members.forEach (member => {
            if (member.innerText.toLowerCase().includes(search.toLowerCase())) {
                isMember = true;
                NomResult = member.innerText;
                typeResult = "Membre";
            }
        });

        // Si recherché => affiche sinon non
        if (isTitle == true || isMember == true) {
            card.style.display = "flex";

            // Ajouter aux correspondances
            correspondances.push(NomResult + " - " + typeResult);
        } else {
            // Ne pas cacher la carte quand on supprime du texte => UI
            if (isDeleting == false) {
                card.style.display = "none";
            }
        }
    });   
    
    // Si une seule correspondance
    if (correspondances.length == 1 && isDeleting == false) {
        searchInput.value = correspondances[0];
    }
}

// Recherche temps réel
searchInput.addEventListener('input', research);

