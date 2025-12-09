const btnFilters = document.getElementById('btn_filters'); 
const filtersDiv = document.getElementById('filters');

// Reset du style au démarrage
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

// Albums
const filter_album = document.getElementById('filter_album');
const value_album = document.getElementById('value_album');
const number_album = document.getElementById('number_album');

filter_album.addEventListener('input', () => {
    value_album.textContent = filter_album.value;
    number_album.value = filter_album.value;
});

number_album.addEventListener('input', () => {
    filter_album.value = number_album.value;
    value_album.textContent = filter_album.value;
});