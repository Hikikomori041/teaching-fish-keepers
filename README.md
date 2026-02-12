# Projet de Club Poisson

Ceci est le dépôt du projet de Méthodologies et environnement de développement (M2 Informatique).

## Groupe

- BLACHÈRE Nicolas
- ORTEGA Erwan
- MORETTI Thomas
- NAJI Brahim

## Comment lancer le projet en local (développement et Docker) ?

Voir [le sujet initial](SUJET.md#le-projet-existant).

## Architecture du pipeline CI/CD

## Choix techniques & justifications

## Bonus implémentés

- [✅] Exemple

### Reste à ajouter (si on a le temps)

- [❌] Optimisation du cache Docker dans le pipeline CI (layer caching, BuildKit)
- [❌] Reverse proxy (Nginx, Traefik, Caddy...) pour servir frontend et backend sur le même domaine et le même port
- [❌] Certificat SSL / HTTPS en production (Let's Encrypt, Caddy auto-TLS...)
- [❌] Healthchecks Docker pour la supervision des conteneurs
- [❌] Stratégie de déploiement avancée (blue/green, rolling update)
- [❌] Monitoring / logging centralisé
- [❌] Pre-commit hooks pour exécuter linting/formatage avant chaque commit (Husky, lefthook...)
- [❌] Environnements de staging séparés de la production
- [❌] Dependabot pour maintenir les dépedances à jour
- [❌] Inspection des vulnéravilités outils comme Snyk pour alerter sur la sécurité
- [❌] Toute autre amélioration que l'on juge pertinente et que l'on peut justifier
