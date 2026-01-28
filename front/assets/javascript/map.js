// Paris par default
const map = L.map('map').setView([48.85, 2.35], 5);

// Requête des tuiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

// Envoie de la requête de géolocalisation
L.Control.geocoder({
  defaultMarkGeocode: true
  // Résultat
}).on('markgeocode', function(e) {
    map.setView(e.geocode.center, 12);

    // Affichage de la carte
  }).addTo(map);
  
  
// Récupération de tous les concerts
const concerts = document.querySelectorAll('.localisation');

concerts.forEach(concert => {

    // Récupération des dates
    const datesUl = concert.nextElementSibling; // nextElementSibling => element après le h4
    const datesLi = datesUl.querySelectorAll('li');

   // Réassamblage des dates en HTML en liste
   const datesHTML = Array.from(datesLi).map(li => `<li>${li.textContent}</li>`).join('');
    
    // Séparation ville et pays
    const concertText = concert.textContent.split(', ');
    const city = concertText[0];
    const country = concertText[1];

    // Requête à l'api de openstreetmap
    const requete = encodeURIComponent(`${city}, ${country}`); // En JSON
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${requete}`)

    // Réponse
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
            const lat = data[0].lat;
            const lon = data[0].lon;

            // Ajout du marqueur sur la carte
            L.marker([lat, lon])
            .addTo(map)
            .bindPopup(`
            <b>${city}</b><br>
            ${country}<br>
            Dates:
            <ul>
                ${datesHTML}
            </ul>
            `);
        }
    });
});