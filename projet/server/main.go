package main

import (
	"fmt"
	"html/template"
	"io/ioutil"
	"net/http"
)

// Tableau avec toutes les infos données par les APIs
var donnees = map[string][]byte{
	"artistes": nil,
	"lieux":    nil,
	"dates":    nil,
	"relation": nil,
}

func main() {
	// URLs des APIs
	apis := map[string]string{
		"artistes": "https://groupietrackers.herokuapp.com/api/artists",
		"lieux":    "https://groupietrackers.herokuapp.com/api/locations",
		"dates":    "https://groupietrackers.herokuapp.com/api/dates",
		"relation": "https://groupietrackers.herokuapp.com/api/relation",
	}

	// Appel de toutes les APIs
	for nom, url := range apis {
		fmt.Println("Appel de l'API :", nom)
		resp, err := http.Get(url)
		if err != nil {
			fmt.Println("Erreur lors de la requête HTTP pour : ", err, "\n")
			continue
		}

		body, err := ioutil.ReadAll(resp.Body)
		resp.Body.Close()
		if err != nil {
			fmt.Println("Erreur lors de la lecture de la réponse: ", err, "\n")
			continue
		}

		fmt.Println(string(body))

		// Ajout des données dans le tableau
		donnees[nom] = body
	}

	// Parser les artistes
	ParseArtistes(donnees["artistes"])

	// Lire fichiers CSS
	http.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir("../front/assets"))))

	// Htaccess
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" {
			http.NotFound(w, r)
			return
		}
		afficherAccueil(w, donnees)
	})

	// Création du serveur
	fmt.Println("\nServeur démarré sur http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}

// Afficher l'écran d'accueil
func afficherAccueil(w http.ResponseWriter, donnees map[string][]byte) {
	tmpl := template.Must(template.ParseFiles("../front/templates/index.html"))
	tmpl.Execute(w, donnees)
}
