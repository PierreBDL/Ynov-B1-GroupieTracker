const localisations = document.querySelectorAll('.localisation');

localisations.forEach(localisation => {

    // Remplace les tirets en virgules et les tirets du bas en espaces
    let lieu = localisation.textContent.replaceAll('-', ', ').replaceAll('_', ' ');

    // Découpe du texte au niveau de -
    lieu = lieu.split(', ');

    // Majuscule pour la ville et le pays
    lieu[0] = lieu[0][0].toUpperCase() + lieu[0].slice(1);
    lieu[1] = lieu[1].toUpperCase();

    // Recollage du texte
    localisation.textContent = lieu[0] + ', ' + lieu[1];

    // Majuscule à chaque espace
    let texte = localisation.textContent = localisation.textContent.split(' ');
    texte = texte.map(mot => mot[0].toUpperCase() + mot.slice(1));
    localisation.textContent = texte.join(' ');
});