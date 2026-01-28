package main

import (
	"html/template"
	"io/ioutil"
	"log"
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

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// =============================
	// Appels API au démarrage
	// =============================

	urlsAPIs := map[string]string{
		"artistes": "https://groupietrackers.herokuapp.com/api/artists",
		"lieux":    "https://groupietrackers.herokuapp.com/api/locations",
		"dates":    "https://groupietrackers.herokuapp.com/api/dates",
		"relation": "https://groupietrackers.herokuapp.com/api/relation",
	}

	for nom, url := range urlsAPIs {
		resp, err := http.Get(url)
		if err != nil {
			log.Fatal(err)
		}

		body, _ := ioutil.ReadAll(resp.Body)
		resp.Body.Close()
		apis[nom] = body
	}

	artists := ParseArtistes(apis["artistes"])
	lieux := ParseLieux(apis["lieux"])
	relations := ParseRelations(apis["relation"])
	artists = RelierConcerts(artists, relations)

	// =============================
	// ROUTES
	// =============================

	// assets
	http.Handle(
		"/assets/",
		http.StripPrefix(
			"/assets/",
			http.FileServer(http.Dir("projet/front/assets")),
		),
	)

	// accueil
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" {
			http.NotFound(w, r)
			return
		}
		afficherAccueil(w, donnees{Artists: artists, Lieux: lieux, Relation: relations})
	})

	http.HandleFunc("/artist/", func(w http.ResponseWriter, r *http.Request) {
		id, _ := strconv.Atoi(r.URL.Query().Get("id"))
		afficherArtiste(w, donnees{Artists: artists, Lieux: lieux, Relation: relations}, id)
	})

	http.HandleFunc("/credits", func(w http.ResponseWriter, r *http.Request) {
		tmpl := template.Must(template.ParseFiles("projet/front/templates/credits.html"))
		tmpl.Execute(w, nil)
	})

	http.HandleFunc("/return", func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, "/", http.StatusSeeOther)
	})

	log.Println("Listening on port", port)

	http.ListenAndServe(":"+port, nil)
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
