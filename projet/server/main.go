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
			log.Println("API error:", nom, err)
			continue
		}

		body, err := ioutil.ReadAll(resp.Body)
		resp.Body.Close()
		if err != nil {
			log.Println("Read error:", err)
			continue
		}

		apis[nom] = body
	}

	artists := ParseArtistes(apis["artistes"])
	lieux := ParseLieux(apis["lieux"])
	relations := ParseRelations(apis["relation"])
	artists = RelierConcerts(artists, relations)

	// =============================
	// ROUTES
	// =============================

	// assets statiques
	http.Handle(
		"/assets/",
		http.StripPrefix(
			"/assets/",
			http.FileServer(http.Dir("../front/assets")),
		),
	)

	// accueil
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" {
			http.NotFound(w, r)
			return
		}
		afficherAccueil(w, donnees{
			Artists:  artists,
			Lieux:    lieux,
			Relation: relations,
		})
	})

	// page artiste
	http.HandleFunc("/artist/", func(w http.ResponseWriter, r *http.Request) {
		id, err := strconv.Atoi(r.URL.Query().Get("id"))
		if err != nil {
			http.NotFound(w, r)
			return
		}

		afficherArtiste(w, donnees{
			Artists:  artists,
			Lieux:    lieux,
			Relation: relations,
		}, id)
	})

	// credits
	http.HandleFunc("/credits", func(w http.ResponseWriter, r *http.Request) {
		tmpl, err := template.ParseFiles("../front/templates/credits.html")
		if err != nil {
			log.Println("Template error:", err)
			http.Error(w, "Template not found", 500)
			return
		}
		tmpl.Execute(w, nil)
	})

	// retour accueil
	http.HandleFunc("/return", func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, "/", http.StatusSeeOther)
	})

	log.Println("Listening on port", port)

	log.Fatal(http.ListenAndServe(":"+port, nil))
}

// =============================
// TEMPLATES
// =============================

// Afficher l'écran d'accueil
func afficherAccueil(w http.ResponseWriter, data donnees) {
	tmpl, err := template.ParseFiles("../front/templates/index.html")
	if err != nil {
		log.Println("Template error:", err)
		http.Error(w, "Template not found", 500)
		return
	}

	tmpl.Execute(w, data)
}

// Afficher page de l'artiste
func afficherArtiste(w http.ResponseWriter, data donnees, id int) {

	donneesArtiste := artistes{}
	donneesLieux := lieux{}
	donneesRelation := relation{}

	for _, artist := range data.Artists {
		if artist.Id == id {
			donneesArtiste = artist
			break
		}
	}

	for _, lieu := range data.Lieux {
		if lieu.Id == id {
			donneesLieux = lieu
			break
		}
	}

	for _, relation := range data.Relation {
		if relation.Id == id {
			donneesRelation = relation
			break
		}
	}

	dataPrecises := donnesprecises{
		Artiste:  donneesArtiste,
		Lieux:    donneesLieux,
		Relation: donneesRelation,
	}

	tmpl, err := template.ParseFiles("../front/templates/artist.html")
	if err != nil {
		log.Println("Template error:", err)
		http.Error(w, "Template not found", 500)
		return
	}

	tmpl.Execute(w, dataPrecises)
}
