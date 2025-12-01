package main

import (
	"html/template"
	"net/http"
)

func main() {
	// Lire fichiers CSS
	http.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir("./Power4/assets"))))

	// Htaccess
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" {
			http.NotFound(w, r)
			return
		}
		afficherAccueil(w)
	})

	// Création du serveur
	http.ListenAndServe(":8080", nil)
}

// Afficher l'écran d'accueil
func afficherAccueil(w http.ResponseWriter) {
	tmpl := template.Must(template.ParseFiles("../front/templates/index.html"))
	tmpl.Execute(w, nil)
}
