# Projet Garderie DevOps

Application Ma Garderie : frontend Next.js + backend Express, avec CI/CD Jenkins, VM Vagrant, provisioning Ansible et déploiement Docker Compose.

## 1. Présentation de l'application et technologies

- Frontend : Next.js (App Router) avec les composants Navbar, Hero et Services.
- Backend : Node.js / Express avec 3 API REST (/api/garderie, /api/services, /api/activites).
- Tests : Jest pour le frontend (vérification du titre Ma Garderie).
- Conteneurisation : Docker & Docker Compose.
- CI/CD : Jenkins (Pipeline as Code).
- Infrastructure : Vagrant + Ansible.

## 2. Architecture du projet et de la chaîne CI/CD

- frontend/ : code source Next.js, Dockerfile, tests.
- backend/ : code source Express, Dockerfile.
- ansible/ : inventaire, playbook site.yml, rôle docker.
- Jenkinsfile : pipeline Jenkins (Checkout, Build Frontend, Build Backend).
- docker-compose.yml : lancement des deux services sur un réseau Docker.
- Vagrantfile : création de la VM Ubuntu (2 Go RAM, 2 CPU, IP fixe 192.168.56.10).

Chaîne CI/CD :
Le code est poussé sur GitHub, Jenkins récupère le code et construit les images Docker (Push vers Docker Hub).

## 3. Instructions de création et provisioning de la VM

Commande :
vagrant up

La VM utilise le box generic/ubuntu2204 avec 2 Go de RAM et 2 CPU.
Note : Le provisioning Ansible automatique a rencontré un problème de dossier partagé, les commandes du rôle Ansible ont donc été appliquées manuellement pour installer Docker dans la VM.

## 4. Instructions d'exécution du pipeline Jenkins

1. Lancer Jenkins (service sur le port 8080).
2. Créer un job Pipeline script from SCM pointant vers ce dépôt.
3. Lancer le build.

Capture du pipeline Jenkins exécuté avec succès :
![Pipeline Jenkins](https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a4-13-pipeline-succes.png?raw=true)
![Console Output](https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a4-13-console-succes.png?raw=true)

## 5. Liens vers les images Docker Hub

- Frontend : https://hub.docker.com/r/maryemelheni/garderie-frontend
- Backend : https://hub.docker.com/r/maryemelheni/garderie-backend

Capture des images publiées sur Docker Hub :
![Docker Hub](https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a4-14-dockerhub-images.png?raw=true)

## 6. Instructions de déploiement avec Docker Compose

Sur la VM Vagrant (déploiement depuis Docker Hub) :

docker run -d --name backend -p 3001:3001 maryemelheni/garderie-backend:latest
docker run -d --name frontend -p 3000:3000 -e API_URL=http://172.17.0.1:3001 maryemelheni/garderie-frontend:latest

Capture des conteneurs en cours d'exécution dans la VM Vagrant :
![Conteneurs Vagrant](https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a4-27-docker-compose-vagrant.png?raw=true)

## 7. Adresse d'accès à l'application déployée

L'application est accessible depuis un navigateur Web à l'adresse :
http://192.168.65.132:3003 (redirection de port vers la VM Vagrant).

Capture de l'application accessible dans le navigateur :
![Application Ma Garderie](https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a4-30-application-vagrant.png?raw=true)

## 8. Autres captures d'écran

Statut de la VM Vagrant :
![Statut VM Vagrant](https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a4-17-vagrant-status.png?raw=true)

Docker installé dans la VM Vagrant :

![Docker VM Vagrant](https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a4-23-docker-vm.png?raw=true)

https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a4-23-docker-vm.png?raw=true


# Activité 4 : Vagrant, Ansible, Sécurité API et DevSecOps

## 12. Sécurité de l'API (OWASP API Security Top 10)

| Risque OWASP | Description | Mesure mise en place |
|---|---|---|
| API1: Broken Object Level Authorization | Accès non autorisé aux objets | Aucune donnée sensible exposée sans authentification (routes publiques uniquement en lecture) |
| API2: Broken Authentication | Authentification faible | Non applicable (pas d'authentification pour l'instant, API publique) |
| API3: Broken Object Property Level Authorization | Exposition de propriétés sensibles | Validation stricte avec Zod (seuls les champs nom, email, message sont acceptés) |
| API4: Unrestricted Resource Consumption | Absence de limite de requêtes | Rate limiting configuré sur `POST /api/contact` (5 requêtes / 15 min) |
| API5: Broken Function Level Authorization | Accès à des fonctions d'administration | Non applicable (pas de fonction admin) |
| API6: Unrestricted Access to Sensitive Business Flows | Automatisation abusive | Rate limiting sur les routes sensibles |
| API7: Server Side Request Forgery | Requêtes forgées côté serveur | Aucune URL fournie par l'utilisateur n'est appelée par le serveur |
| API8: Security Misconfiguration | Mauvaise configuration | Helmet configuré pour ajouter les headers de sécurité HTTP |
| API9: Improper Inventory Management | Inventaire incomplet | API versionnée (`/api/...`) et documentée dans le README |
| API10: Unsafe Consumption of APIs | Consommation non sécurisée d'API tierces | Aucune API tierce consommée pour l'instant |

## 13. Base de données PostgreSQL

Un service PostgreSQL a été ajouté dans le fichier docker-compose.yml :

  db:
    image: postgres:16-alpine
    container_name: garderie-db
    environment:
      POSTGRES_USER: garderie_user
      POSTGRES_PASSWORD: garderie_password
      POSTGRES_DB: garderie_db
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
    networks:
      - garderie-net

Lancement de la base :
docker compose up -d db

Vérification :
docker compose ps

Capture de PostgreSQL en cours d'exécution :
![PostgreSQL Up](https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a4-53-postgresql-up.png?raw=true)

## 14. Enregistrement des messages dans PostgreSQL

L'API Express a été modifiée pour enregistrer les messages du formulaire dans la table contacts.

Création de la table (via psql) :
CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Vérification dans la base :
docker exec -it garderie-db psql -U garderie_user -d garderie_db -c "SELECT * FROM contacts;"

Capture de la réponse de l'API :
![API Success](https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a4-54-api-success.png?raw=true)

Capture de la console du serveur :
![Console Log](https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a4-54-console-log.png?raw=true)

Capture du message enregistré dans la table :
![Table contacts](https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a4-54-postgresql-table.png?raw=true)

## 15. Variables d'environnement

Le fichier .env.example a été mis à jour avec les variables de la base de données :
DOCKERHUB_USER=votre_user_dockerhub
POSTGRES_USER=garderie_user
POSTGRES_PASSWORD=garderie_password
POSTGRES_DB=garderie_db
DATABASE_URL=postgresql://garderie_user:garderie_password@localhost:5432/garderie_db

## 16. Tests applicatifs

Test du frontend :
cd frontend
npm test

Capture du test frontend réussi :
![Test Frontend](https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a4-57-test-frontend.png?raw=true)

Test de l'API :
cd backend
npm test

Capture du test API réussi :
![Test API](https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a4-58-test-api.png?raw=true)

## 12. Sécurité de l'API (OWASP API Security Top 10)

Capture du tableau OWASP :
![OWASP Table](https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a4-52-owasp-table.png?raw=true)

## 11. Validation et sécurité de l'API

Capture du test avec des données invalides (Zod) :
![Zod Error](https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a4-48-zod-error.png?raw=true)

Capture des headers de sécurité (Helmet) :
![Helmet Headers](https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a4-50-helmet-headers.png?raw=true)

Capture du Rate Limiting (429 Too Many Requests) :
![Rate Limit](https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a4-51-rate-limit.png?raw=true)

## 10. Route POST /api/contact

Capture du succès de l'envoi du formulaire :
![Contact Success](https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a4-47-contact-success.png?raw=true)