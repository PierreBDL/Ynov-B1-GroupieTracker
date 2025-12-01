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
