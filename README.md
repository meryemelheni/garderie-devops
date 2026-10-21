# garderie-devops

Application « Ma Garderie » : frontend Next.js + backend Express, avec CI/CD Jenkins, VM Vagrant, provisioning Ansible et déploiement Docker Compose.

## Lancer en local
```bash
docker compose up --build
# Frontend : http://localhost:3000   API : http://localhost:3001/api/services
```

## Tests
```bash
cd frontend && npm ci && npm test
```

## Jenkins
Créer des credentials « Username with password » d'ID `dockerhub-credentials` (utilisateur + token Docker Hub), puis un job *Pipeline from SCM* pointant vers ce dépôt.

## VM + déploiement
```bash
vagrant up                      # crée la VM (192.168.56.10) et exécute Ansible
vagrant ssh
cd /vagrant
export DOCKERHUB_USER=votre_user
docker compose pull && docker compose up -d --no-build
# Application : http://192.168.56.10:3000
```
