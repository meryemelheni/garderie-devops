# Projet Garderie DevOps (Activités 3 et 4)

## Activité 3 : Ansible, API Express et Dockerisation

### 25. Installation d'Ansible sur une VM d'administration

Ansible a été installé sur la VM Vagrant (`vagrant-ubuntu`). L'installation s'est faite via `pip` pour avoir une version récente compatible avec Python 3.12.

Commandes :
sudo apt update
sudo apt install -y python3-pip
pip3 install --user ansible

### 26. Fichier inventory et test de communication

Le fichier `inventory` contient l'adresse de la VM cible (`ubuntuserver`) :

Fichier inventory :
[serveurs]
ubuntuserver ansible_host=192.168.65.132 ansible_user=meryem ansible_ssh_private_key_file=/home/vagrant/.ssh/id_ansible

Test de communication :
ansible all -m ping -i inventory

Résultat : SUCCESS avec "ping": "pong".

![Test Ansible ping](https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a3-27-playbook-curl.png?raw=true)

### 27. Premier playbook Ansible (installation de curl)

Le playbook `install_curl.yml` installe le package `curl`.

Exécution du playbook :
ansible-playbook -i inventory install_curl.yml

![Playbook curl](https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a3-27-playbook-curl.png?raw=true)

### 28. Playbook Ansible pour installer Docker

Le playbook `install_docker.yml` installe Docker et ses dépendances.

Résultat après exécution :
docker --version
Docker version 29.8.1, build 4a63305

![Playbook Docker](https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a3-28-playbook-docker.png?raw=true)

### 29. Création de l'API Node.js / Express

L'API se trouve dans le dossier `api/`. Structure :
- `api/server.js` : serveur Express
- `api/package.json` : dépendances (`express`, `cors`)

Lancement : node server.js

![API démarrée](https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a3-29-api-demarree.png?raw=true)
![Structure API](https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a3-29-structure-api.png?raw=true)

### 30. Route GET /api/health

Retourne l'état de l'API :
{"status":"OK","message":"L'API fonctionne correctement"}

![Health](https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a3-30-api-health.png?raw=true)

### 31. Route GET /api/profile

Retourne les informations du portfolio :
![Profile](https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a3-31-api-profile.png?raw=true)

### 32. Route GET /api/projects

Retourne la liste des projets :
![Projects](https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a3-32-api-projects.png?raw=true)

### 33. Route GET /api/skills

Retourne la liste des compétences :
![Skills](https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a3-33-api-skills.png?raw=true)

### 34. Frontend Next.js connecté à l'API (Projets)

Le composant `components/Projects.js` a été modifié pour récupérer les projets depuis l'API Express via `fetch()`.

![Frontend connecté à l'API](https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a3-34-35-frontend-api.png?raw=true)

### 35. Frontend Next.js connecté à l'API (Compétences)

Même principe pour le composant `components/Skills.js`. Les données viennent désormais de l'API.

### 36. Variable d'environnement API_URL

L'URL de l'API est configurée via la variable `API_URL` (dans `.env.local`). Il ne faut pas la coder en dur car elle change entre le développement local (`http://localhost:3001`) et la production (`http://api:3001` dans Docker). Cela permet de déployer la même application dans différents environnements sans modifier le code.

### 37. Fichier .env.example

Contenu :
API_URL=http://localhost:3001

### 38. Dockerfile pour le frontend Next.js

Le `Dockerfile` utilise une construction multi-stage pour optimiser l'image. Il compile le code avec Node.js puis copie le résultat dans une image légère.

### 39. Dockerfile pour l'API Express

Le `Dockerfile` de l'API installe les dépendances de production et lance `node server.js`.

### 40. Construction des images Docker

Commande utilisée :
docker compose -f docker-compose.activite3.yml build

![Build des images](https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a3-40-docker-images.png?raw=true)

### 41. Fichier Docker Compose (Frontend + API)

Le fichier `docker-compose.activite3.yml` déclare les deux services. Le frontend utilise la variable `API_URL=http://api:3001` pour communiquer avec l'API via le réseau Docker.

Lancement et vérification :
docker compose -f docker-compose.activite3.yml up -d
docker compose -f docker-compose.activite3.yml ps

![Docker compose up](https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a3-41-docker-compose-up.png?raw=true)
![Docker compose ps](https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a3-41-docker-compose-ps.png?raw=true)

### 42. Communication Frontend / API via Docker Compose

Le frontend communique avec l'API à travers le réseau Docker Compose (en utilisant le nom de service `api`). Le portfolio affiche les données fournies par l'API.

![Portfolio avec Docker Compose](https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a3-42-portfolio-compose.png?raw=true)

---

## Activité 4 : Vagrant, Ansible, Sécurité API et DevSecOps

### 43. Vagrant et Ansible (déploiement automatique)

(À compléter avec les captures et le texte du point 43)

### 44. Configuration Vagrant pour Ansible

(À compléter avec les captures et le texte du point 44)

### 45. Vagrant destroy et vagrant up

(À compléter avec les captures et le texte du point 45)

### 46. Route POST /api/contact

Capture du succès de l'envoi du formulaire :
![Contact Success](https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a4-47-contact-success.png?raw=true)

### 47. Formulaire de contact Next.js

(À compléter avec les captures et le texte du point 47)

### 48. Validation Zod

Capture du test avec des données invalides :
![Zod Error](https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a4-48-zod-error.png?raw=true)

### 49. Gestion centralisée des erreurs

(À compléter avec les captures et le texte du point 49)

### 50. Headers de sécurité (Helmet)

Capture des headers de sécurité (Helmet) :
![Helmet Headers](https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a4-50-helmet-headers.png?raw=true)

### 51. Rate Limiting

Capture du Rate Limiting (429 Too Many Requests) :
![Rate Limit](https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a4-51-rate-limit.png?raw=true)

### 52. OWASP API Security Top 10

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

Capture du tableau OWASP :
![OWASP Table](https://github.com/meryemelheni/garderie-devops/blob/main/screenshots/a4-52-owasp-table.png?raw=true)

### 53. Base de données PostgreSQL

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

### 54. Enregistrement des messages dans PostgreSQL

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

### 55. Variables d'environnement

Le fichier .env.example a été mis à jour avec les variables de la base de données :
DOCKERHUB_USER=votre_user_dockerhub
POSTGRES_USER=garderie_user
POSTGRES_PASSWORD=garderie_password
POSTGRES_DB=garderie_db
DATABASE_URL=postgresql://garderie_user:garderie_password@localhost:5432/garderie_db

### 56. Tests applicatifs

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