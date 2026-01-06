# POM D'API - Groupie Tracker

Site web qui centralise les informations des groupes de musique récupéré depuis une API.

## 📋 Fonctionnalités

- **Affichage des artistes** : Visualisation de 52 groupes de musique avec leurs informations (nom, photo, année de début, membres, premier album)
- **Recherche** : Barre de recherche pour trouver rapidement un artiste ou un groupe
- **Filtres avancés** :
  - Par année de début (60, 70, 80, 90, 2000, 2010)
  - Par nombre de membres (0-10)
  - Par date du premier album
  - Par lieu de concert (ville ou pays)
- **Page détaillée** : Affichage complet des informations d'un artiste avec ses dates et lieux de concerts

## 🛠️ Technologies utilisées

### Backend
- **Go** (Golang)
- `html/template` pour le rendu côté serveur
- `encoding/json` pour le parsing des APIs
- `net/http` pour le serveur HTTP

### Frontend
- **HTML5** / **CSS3**
- **JavaScript**
- Design responsive

### API externe
- `https://groupietrackers.herokuapp.com/api/artists` : Informations sur les artistes
- `https://groupietrackers.herokuapp.com/api/locations` : Lieux de concerts
- `https://groupietrackers.herokuapp.com/api/dates` : Dates des concerts
- `https://groupietrackers.herokuapp.com/api/relation` : Relation entre artistes et leurs concerts

## 📁 Structure du projet

```
groupie-tracker/
│
├── README.md
└── projet/
    ├── front/
    │   ├── assets/
    │   │   ├── css/
    │   │   │   ├── artists.css
    │   │   │   ├── commun.css
    │   │   │   └── index.css
    │   │   ├── img/
    │   │   │   └── Logo-sans-fond.png
    │   │   └── javascript/
    │   │       ├── concerts.js
    │   │       ├── filters.js
    │   │       └── search.js
    │   └── templates/
    │       ├── artist.html
    │       └── index.html
    └── server/
        ├── decod_json.go
        ├── go.mod
        └── main.go
```

## 🚀 Installation et lancement

### Prérequis
- Go 1.x ou supérieur installé sur votre machine

### Étapes

1. **Cloner le repository**
```bash
git clone https://ytrack.learn.ynov.com/git/bpierre/groupie-tracker.git
cd groupie-tracker
```

2. **Lancer le serveur**
```bash
cd projet/server
go run .
```

3. **Accéder à l'application**
Ouvrez votre navigateur et allez sur : [http://localhost:8080](http://localhost:8080)

## 📖 Utilisation

### Page d'accueil
- Visualisez tous les artistes sous forme de cartes
- Utilisez les filtres sur le côté gauche pour affiner votre recherche
- Cliquez sur "Voir plus" pour accéder à la page détaillée d'un artiste

### Filtres
- **Années de début** : Sélectionnez une décennie
- **Nombre de membres** : Utilisez le slider ou entrez un nombre
- **Date du premier album** : Format `JJ-MM-AAAA` ou `AAAA`
- **Lieu** : Tapez une ville (`Paris`) ou un pays (`France`)

### Recherche
Utilisez la barre de recherche pour trouver un artiste par son nom

## 🔧 Architecture technique

### Backend (Go)
- **decod_json.go** : Parsing des APIs et structures de données
  - `artistes` : Stocke les infos des artistes + leurs concerts
  - `lieux` : Lieux de concerts
  - `relation` : Associe artistes et concerts
  - `RelierConcerts()` : Fonction qui associe les données de concerts à chaque artiste

- **main.go** : Serveur HTTP, routing et rendu des templates
  - Route `/` : Page d'accueil
  - Route `/artist/` : Page détaillée d'un artiste
  - Serveur de fichiers statiques `/assets/`

### Frontend (JavaScript)
- **search.js** : Logique de recherche d'artistes
- **filters.js** : Gestion des filtres et affichage/masquage des cartes
- **concerts.js** : Formatage des noms de lieux pour l'affichage

## 👥 Auteurs
Pierre BOURGEOIS DE LAVERGNE

**Pomme d'API**