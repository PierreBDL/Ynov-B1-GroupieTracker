const btnFilters = document.getElementById('btn_filters'); 
const filtersDiv = document.getElementById('filters');

// Cache les filtres au chargement
filtersDiv.style.display = 'none';

// Evénement
btnFilters.addEventListener('click', () => {
    if (filtersDiv.style.display === 'none') {
        /* afficher */
        filtersDiv.style.display = 'flex';
        /* class */
        filtersDiv.classList.toggle('filters_active');
        /* Btn anim */
        btnFilters.textContent = '<';
    } else {
        /* cacher */
        filtersDiv.style.display = 'none';
        /* class */
        filtersDiv.classList.toggle('filters_active');
        /* Btn anim */
        btnFilters.textContent = '>';
    }
});






// MAJ du texte avec la valeur des barres

// Membres
const filter_membres = document.getElementById('filter_membres');
const value_membres = document.getElementById('value_membres');
const number_membres = document.getElementById('number_membres');

filter_membres.addEventListener('input', () => {
    value_membres.textContent = filter_membres.value;
    number_membres.value = filter_membres.value;
});

number_membres.addEventListener('input', () => {
    filter_membres.value = number_membres.value;
    value_membres.textContent = filter_membres.value;
});






// Application des filtres


// Reset des filtres
const btn_reset_filters = document.getElementById('btn_reset_filters');

btn_reset_filters.addEventListener('click', () => {
    // Membres
    filter_membres.value = filter_membres.min;
    value_membres.textContent = filter_membres.min;
    number_membres.value = filter_membres.min;

    // Années
    const annee_selectionnee_radios = document.querySelectorAll('input[name="annee"]');

    annee_selectionnee_radios.forEach(radio => 
        radio.checked = false
    );

    // Date premier album
    const premier_album_filtre = document.getElementById("filter_album");
    premier_album_filtre.value = "";
});




// Vérif si on clique sur le bouton appliquer
const btn_apply_filters = document.getElementById('btn_apply_filters');

// Récup de toutes les cartes
const groupes = document.querySelectorAll('.card');

btn_apply_filters.addEventListener('click', () => {

    // Vérif de chaque carte
    groupes.forEach(groupe => {
        // Affichage de base
        let annee = true;
        let membres = true;
        let album = true;

        // Années
        const annee_debut = parseInt(groupe.querySelector('.annee_debut').textContent);
        const annee_selectionnee_radio = document.querySelector('input[name="annee"]:checked');
        let annee_selectionnee = undefined;

        if (annee_selectionnee_radio != null) {
            // Récup de l'année sélectionnée + conversion en int
            annee_selectionnee = parseInt(annee_selectionnee_radio.value);
            
            // Vérif si l'année est dans la décennie
            if (annee_debut >= annee_selectionnee && annee_debut < annee_selectionnee + 10) {
                // Garde bool à true
                annee = true;
            } else {
                // Passe le bool à false
                annee = false;
            }
        }

        // Nombre de membres
        const nb_membres_card = groupe.querySelector(".nb_member");
        const nb_members_filtre = document.getElementById("filter_membres");

        if (nb_members_filtre.value != nb_members_filtre.min) {
            if (parseInt(nb_members_filtre.value) === parseInt(nb_membres_card.textContent)) {
                // Garde la carte
                membres = true;
            } else {
                // Passe le bool à false
                membres = false;
            }
        };


        // Date premier album
        const premier_album_card = groupe.querySelector(".premier_album")
        const premier_album_filtre = document.getElementById("filter_album")

        if (premier_album_filtre.value != "") {
            if (premier_album_card.innerHTML.toLocaleLowerCase().includes(premier_album_filtre.value.toLocaleLowerCase())) {
                // Garde la carte
                album = true;
            } else {
                // Passe le bool à false
                album = false;
            }
        }

        // Garde la carte si tous les bool sont toujours à true
        if (annee == true && membres == true && album == true) {
            // Affiche la carte
            groupe.style.display = "flex";
        } else {
            // Cache la carte
            groupe.style.display = "none";
        }
    });
});