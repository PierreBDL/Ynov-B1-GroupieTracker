// Récup des éléments du DOM
const searchInput = document.getElementById('research');
const cards = document.querySelectorAll('.card');

// Eviter autocomplétion en boucle
let isDeleting = false;
let isAutoCompleting = false;

// Recommandations
const recommandations = document.querySelector('.recommandations');
const recommandations_ul = document.getElementById('liste_recommandations');

// Fonction de recherche
function research() {
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

    // Recommandations noms groupes
    let nomGroupesRecommandations = [];

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

        // Nom Groupe
        let groupName = title.innerText;

        // Regarder si le titre est recherché
        if (title. innerText.toLowerCase().includes(search.toLowerCase())) {
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
            
            // Ajouter le nom du groupe
            if (nomGroupesRecommandations.includes(groupName) == false && isTitle == true) {
                nomGroupesRecommandations.push(groupName);
            }
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

    // Sinon mettre les correspondances dans le tableaupour les recommandations
    if (correspondances.length > 1) {
        // Réinitialisation du tableau + affichage
        recommandations_ul.innerHTML = "";
        recommandations.style.display = "block";

        // Remplissage
        correspondances.forEach(correspondance => {
            recommandations_ul.innerHTML += "<li>" + correspondance.split('-')[0] + "</li>";
        });
        
        if (nomGroupesRecommandations.length > 0) {
            nomGroupesRecommandations.forEach(nomGroupe => {
                recommandations_ul.innerHTML += "<li>" + nomGroupe + "</li>";
            });
        }
    } else {
        // Cacher le tableau
        recommandations.style.display = "none";
    }
}

// Vérification si on appuie sur "suppr"
searchInput.addEventListener('keydown', (event) => {
    if (event.key === "Backspace" || event.key === "Delete") {
        isDeleting = true;
        isAutoCompleting = false;
    } else {
        isDeleting = false;
    }
});

// Clique sur les recommandations
recommandations_ul.addEventListener('click', (event) => {
    const target = event.target;
    if (target && target.tagName === 'LI') {
        searchInput.value = target.innerText;
        recommandations.style.display = "none";
        recommandations_ul.innerHTML = "";
        research();
    }
});

// Fermer les recommandations quand on clique en dehors de la div
document.addEventListener('click', (event) => {
    if (! recommandations. contains(event.target) && event.target !== searchInput) {
        recommandations.style.display = "none";
    }
});

// Recherche temps réel
searchInput.addEventListener('input', research);

