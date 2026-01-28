package main

import (
	"fmt"
	"html/template"
	"io/ioutil"
	"net/http"
	"os"
	"strconv"
)

// Tableau avec toutes les infos données par les APIs
var apis = map[string][]byte{
	"artistes": nil,
	"lieux":    nil,
	"dates":    nil,
	"relation": nil,
}

// Données envoyées au html
type donnees struct {
	Artists  []artistes
	Lieux    []lieux
	Relation []relation
}

type donnesprecises struct {
	Artiste  artistes
	Lieux    lieux
	Relation relation
}

func main() {

	// Hébergement Scalingo
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Sert les fichiers statiques du front
	fs := http.FileServer(http.Dir("../front"))
	http.Handle("/", fs)

	// Exemple d’API
	http.HandleFunc("/api", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("API is working"))
	})

	http.ListenAndServe(":"+port, nil)

	// URLs des APIs
	urlsAPIs := map[string]string{
		"artistes": "https://groupietrackers.herokuapp.com/api/artists",
		"lieux":    "https://groupietrackers.herokuapp.com/api/locations",
		"dates":    "https://groupietrackers.herokuapp.com/api/dates",
		"relation": "https://groupietrackers.herokuapp.com/api/relation",
	}

	// Appel de toutes les APIs et récup des données
	for nom, url := range urlsAPIs {
		fmt.Println("Appel de l'API :", nom)
		resp, err := http.Get(url)
		if err != nil {
			fmt.Println("Erreur lors de la requête HTTP pour : ", err, "\n")
			return
		}

		body, err := ioutil.ReadAll(resp.Body)
		resp.Body.Close()
		if err != nil {
			fmt.Println("Erreur lors de la lecture de la réponse: ", err, "\n")
			return
		}

		fmt.Println(string(body))

		// Ajout des données dans le tableau
		apis[nom] = body
	}

	// Parser les artistes
	artists := ParseArtistes(apis["artistes"])

	// Parser les lieux
	lieux := ParseLieux(apis["lieux"])

	// Parser les relations
	relations := ParseRelations(apis["relation"])

	// Relier concerts aux artistes
	artists = RelierConcerts(artists, relations)

	// Lire fichiers CSS et Images
	http.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir("../front/assets"))))

	// Htaccess
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" {
			http.NotFound(w, r)
			return
		}
		afficherAccueil(w, donnees{Artists: artists, Lieux: lieux, Relation: relations})
	})

	// Route pour la page d'un artiste si "voir plus"
	http.HandleFunc("/artist/", func(w http.ResponseWriter, r *http.Request) {
		// Récupération des paramètres de l'URL avec net/url
		parametres := r.URL.Query()

		// Récupération de l'id
		id := parametres.Get("id")

		// Conversion en int
		id_int, err := strconv.Atoi(id)
		if err != nil {
			panic(err)
		}

		// Afficher page de l'artiste
		afficherArtiste(w, donnees{Artists: artists, Lieux: lieux, Relation: relations}, id_int)
	})

	// Retour à l'accueil depuis la page artiste
	http.HandleFunc("/return", func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, "/", http.StatusSeeOther)
	})

	// Page crédits
	http.HandleFunc("/credits", func(w http.ResponseWriter, r *http.Request) {
		tmpl := template.Must(template.ParseFiles("../front/templates/credits.html"))
		tmpl.Execute(w, r)
	})

	// Lancement serveur
	http.ListenAndServe(":8080", nil)
}

// Afficher l'écran d'accueil
func afficherAccueil(w http.ResponseWriter, data donnees) {
	tmpl := template.Must(template.ParseFiles("../front/templates/index.html"))
	tmpl.Execute(w, data)
}

// Afficher page de l'artiste
func afficherArtiste(w http.ResponseWriter, data donnees, id int) {
	donneesArtiste := artistes{}
	donneesLieux := lieux{}
	donneesRelation := relation{}

	// On cherche l'artiste avec l'id
	for _, artist := range data.Artists {
		if artist.Id == id {
			donneesArtiste = artist
			break
		}
	}

	// On cherche les lieux avec l'id
	for _, lieu := range data.Lieux {
		if lieu.Id == id {
			donneesLieux = lieu
			break
		}
	}

	// On cherche les relations avec l'id
	for _, relation := range data.Relation {
		if relation.Id == id {
			donneesRelation = relation
			break
		}
	}

	// Fusionner les données artistes et lieux
	dataPrecises := donnesprecises{
		Artiste:  donneesArtiste,
		Lieux:    donneesLieux,
		Relation: donneesRelation,
	}

	// Affichage de la page de l'artiste
	tmpl := template.Must(template.ParseFiles("../front/templates/artist.html"))
	tmpl.Execute(w, dataPrecises)
}
