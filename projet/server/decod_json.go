package main

import (
	"encoding/json"
	"fmt"
)

// Structure des données des artistes

type artistes struct {
	Id         int      `json:"id"`
	Image      string   `json:"image"`
	Name       string   `json:"name"`
	Members    []string `json:"members"`
	Creation   int      `json:"creationDate"`
	FirstAlbum string   `json:"firstAlbum"`
}

// Parser les artistes
func ParseArtistes(data_to_parse []byte) []artistes {
	var artists []artistes
	err := json.Unmarshal(data_to_parse, &artists)
	if err != nil {
		fmt.Println("error:", err)
		return nil
	}
	// On retourne la liste des artistes
	return artists
}

// Structure des données des lieux
type lieux struct {
	Id        int      `json:"id"`
	Locations []string `json:"locations"`
	Dates     string   `json:"dates"`
}

// Structure qui contient la structure des lieux
type localisation struct {
	Index []lieux `json:"index"`
}

// Parser les lieux
func ParseLieux(data_to_parse []byte) []lieux {
	var lieux_localisation localisation
	err := json.Unmarshal(data_to_parse, &lieux_localisation)
	if err != nil {
		fmt.Println("error:", err)
		return nil
	}
	// On retourne la liste des lieux avec leur index
	return lieux_localisation.Index
}
