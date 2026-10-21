const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const garderie = {
  nom: "Ma Garderie",
  slogan: "Un second foyer pour les petits explorateurs",
  description:
    "Ma Garderie accueille les enfants de 3 mois à 6 ans dans un cadre chaleureux, sécurisé et stimulant, avec une équipe éducative à l'écoute des familles.",
  adresse: "12 rue des Jasmins, Tunis",
  telephone: "+216 71 000 000",
  email: "contact@magarderie.tn",
  horaires: "Du lundi au vendredi, 7h30 - 18h30",
};

const services = [
  { id: 1, nom: "Accueil à la journée", description: "Repas équilibrés, siestes et jeux encadrés du matin au soir.", icone: "☀️" },
  { id: 2, nom: "Halte-garderie", description: "Accueil ponctuel à l'heure ou à la demi-journée selon vos besoins.", icone: "🕒" },
  { id: 3, nom: "Éveil et éducation", description: "Ateliers d'éveil sensoriel, langage et préparation à l'école.", icone: "🌱" },
  { id: 4, nom: "Restauration", description: "Repas frais préparés sur place, adaptés aux allergies.", icone: "🍎" },
  { id: 5, nom: "Suivi des familles", description: "Compte rendu quotidien et rencontres régulières avec les parents.", icone: "💬" },
];

const activites = [
  { id: 1, nom: "Peinture et dessin", horaire: "Lundi 9h30", age: "2 - 6 ans" },
  { id: 2, nom: "Éveil musical", horaire: "Mardi 10h00", age: "1 - 4 ans" },
  { id: 3, nom: "Jardinage", horaire: "Mercredi 10h30", age: "3 - 6 ans" },
  { id: 4, nom: "Contes et comptines", horaire: "Jeudi 15h30", age: "0 - 6 ans" },
  { id: 5, nom: "Jeux d'eau et motricité", horaire: "Vendredi 10h00", age: "2 - 6 ans" },
];

app.get("/api/garderie", (req, res) => res.json(garderie));
app.get("/api/services", (req, res) => res.json(services));
app.get("/api/activites", (req, res) => res.json(activites));
app.get("/health", (req, res) => res.json({ status: "ok" }));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend Ma Garderie démarré sur le port ${PORT}`);
});
