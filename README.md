# Projet de Club Poisson

Ceci est le dépôt du projet de Méthodologies et environnement de développement (M2 Informatique).

## Groupe

- BLACHÈRE Nicolas
- MORETTI Thomas
- NAJI Brahim
- ORTEGA Erwan

## Comment lancer le projet en local (développement et Docker) ?

En local :
Voir [le sujet initial](SUJET.md#le-projet-existant).

Avec Docker :
Lancer la commande `docker compose up -d --build` à la racine du projet pour construire les images et démarrer les conteneurs en arrière-plan.

## Architecture du pipeline CI/CD

Le pipeline CI/CD est défini dans le fichier `.github/workflows/ci-cd.yml`. Il est déclenché à chaque push ou pull request sur la branche `main`. Le pipeline comprend les étapes suivantes :

1. **Checkout** : Récupère le code source du dépôt.
2. **Check** : Exécute les linters pour le frontend et le backend pour assurer la qualité du code.
3. **Test** : Exécute les tests unitaires.
4. **Build** : Construit les images Docker pour le frontend et le backend.
5. **Push** : Pousse les images construites vers un registre Docker.
6. **Deploy** : Déploie l'application sur un environnement de production.

## Choix techniques & justifications

### Étape 1 — Qualité du code : tests

On a choisi Bun Test car il est rapide, intégré à Bun et demande peu de configuration.

### Étape 2 — Qualité du code : linting et formatage

On a choisi Biome car il nous permet d’unifier les règles sur tout le monorepo (backend + frontend) avec un seul outil.

<!-- ### Étape 3 — Intégration continue (CI)

### Étape 4 — Conteneurisation

### Étape 5 — Build automatisé des images Docker (CI/CD)

### Étape 6 — Déploiement automatisé (CD) -->

### Bonus

## Bonus implémentés

- [✅] Exemple

<!--
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
-->
