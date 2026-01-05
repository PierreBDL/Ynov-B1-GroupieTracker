const localisations = document.querySelectorAll('.localisation');

localisations.forEach(localisation => {
    // Découpe du texte au niveau de -
    let lieu = localisation.textContent.split('-');

    // Majuscule pour la ville et le pays
    lieu[0] = lieu[0][0].toUpperCase() + lieu[0].slice(1);
    lieu[1] = lieu[1][0].toUpperCase() + lieu[1].slice(1);

    // Recollage du texte
    localisation.textContent = lieu[0] + ', ' + lieu[1];

    // Espace au lieu de _ + majuscule
    if (localisation.textContent.split('_').length == 2) {
        let espace = localisation.textContent.split('_');
        espace[0] = espace[0][0].toUpperCase() + espace[0].slice(1);
        espace[1] = espace[1][0].toUpperCase() + espace[1].slice(1);
        localisation.textContent = espace[0] + ' ' + espace[1];
    } else if (localisation.textContent.split('_').length == 3) {
        let espace = localisation.textContent.split('_');
        espace[0] = espace[0][0].toUpperCase() + espace[0].slice(1);
        espace[1] = espace[1][0].toUpperCase() + espace[1].slice(1);
        espace[2] = espace[2][0].toUpperCase() + espace[2].slice(1);
        localisation.textContent = espace[0] + ' ' + espace[1] + ' ' + espace[2];
    }
});