# Back-Inprogress

TODO:
- gestion utilisateur
- gestion menu (affichage menu du jour)
- gestion liens externes (réseaux sociaux, invendus, agrégateurs) avec nom, icône, url
- affichage des avis TripAdvisor sur la page d'accueil (interface configuration api)
- gestion galerie photo
- gestion liste des producteurs

DB:
- Config 
	{
		couleur: 0x, 
		contenu: { 
			accroche: "hey", 
			lerestaurant: "oh"
		},
		url: "http://",
		ouverture: {
			horaire: [{
				debut: "14h00",
				fin: "15h00"
			}],
			jour: ['lundi', 'mardi']
		}
	}
- Plat
	{
		id: 0,
		nom: "Manger",
		type: "Entrée"
		prix: 52.99,
		badge: []
	}
- Badge
	{
		id: 0,
		nom: "Hey",
		description: "Ceci est un badge"
	}
- Menu
	{
		id: 0,
		nom: "Best of",
		plats: [],
		prix: 60.99
	}
- Producteur
	{
		id: 0,
		nom: "Producteur",
		description: "Tu pues le chat",
		url: "http://"
	}
- Galerie
	{
		id: 0,
		type: "producteur",
		description: ".i."
	}