// Récup des éléments du DOM
const searchInput = document.getElementById('research');
const cards = document.querySelectorAll('.card');

// Eviter autocomplétion en boucle
let isDeleting = false;
let isAutoCompleting = false;

// Fonction de recherche
function research() {
    // Vérification si on appuie sur "suppr"
    searchInput.addEventListener('keydown', (event) => {
        if (event.key === "Backspace" || event.key === "Delete") {
            isDeleting = true;
            isAutoCompleting = false;
        } else {
            isDeleting = false;
        }
    });

    // S'il y a une autocompletion, on ne recherche pas
    if (isAutoCompleting) {
        return;
    }

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
        const creationDate = card.querySelector(".annee_debut");
        const firstAlbum = card.querySelector(".premier_album");

        let isTitle = false;
        let isMember = false;
        let isCreationDate = false;
        let isFirstAlbum = false;

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

        // Regarder si la date de création est recherchée
        if (creationDate.innerText.toLowerCase().includes(search.toLowerCase())) {
            isCreationDate = true;
            NomResult = creationDate.innerText;
            typeResult = "Création";
        }

        // Regarder si le premier album est recherché
        if (firstAlbum.innerText.toLowerCase().includes(search.toLowerCase())) {
            isFirstAlbum = true;
            NomResult = firstAlbum.innerText;
            typeResult = "Premier album";
        }

        // Si recherché => affiche sinon non
        if (isTitle == true || isMember == true || isCreationDate == true || isFirstAlbum == true) {
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
        isAutoCompleting = true;
    }
}

// Recherche temps réel
searchInput.addEventListener('input', research);

