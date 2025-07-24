# Gesclient (Max221)

API de gestion de clients Orange Sénégal (Node.js, Express, Prisma, MongoDB)

## 🚀 Installation & Lancement

1. **Cloner le projet**
   ```bash
   git clone <url-du-repo>
   cd Gesclient
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer l'environnement**
   - Crée un fichier `.env` à la racine avec :
     ```env
     DATABASE_URL="<url-mongodb>"
     PORT=3002
     SERVER_KEY=local
     LOCAL_SERVER_URL=http://localhost:3002
     PROD_SERVER_URL=url-production 
     ```
   - Remplace `<url-mongodb>` par ton URL MongoDB (exemple Atlas).

4. **Générer le client Prisma** (après toute modif du schéma)
   ```bash
   npx prisma generate
   ```

5. **Lancer le serveur**
   ```bash
   npm run start
   ```
   L’API sera dispo sur `http://localhost:3002`.

## 🌱 Données de test (Seeder)
Pour insérer des données de test (admin, clients, numéros, demandes, logs) :
```bash
node seeder.js
```
- Le seeder crée un admin, 2 clients, 2 numéros, 2 demandes, 2 logs (dont un lié à une demande).
- Tu peux adapter le fichier `seeder.js` pour ajouter tes propres données.

## 📚 Endpoints principaux
Tous les endpoints sont documentés et testables via Swagger :
- Accède à la doc : [http://localhost:3002/api-docs](http://localhost:3002/api-docs)

### Authentification (admin)
- `/api/auth/login` (à implémenter selon tes besoins)

### Clients
- `POST   /api/clients` : Créer un client (nom, prenom, cni)
- `GET    /api/clients` : Lister tous les clients
- `GET    /api/clients/{id}` : Détail d’un client
- `PUT    /api/clients/{id}` : Modifier un client
- `DELETE /api/clients/{id}` : Supprimer un client

### Numéros clients
- `POST   /api/numeros` : Créer un numéro (validation stricte Orange)
- `GET    /api/numeros` : Lister tous les numéros
- `GET    /api/numeros/search?phoneNumber=...` : Rechercher un client par numéro (validation stricte Orange)
- `GET    /api/numeros/{id}` : Détail d’un numéro
- `PUT    /api/numeros/{id}` : Modifier un numéro
- `DELETE /api/numeros/{id}` : Supprimer un numéro

### Demandes
- `POST   /api/demandes` : Créer une demande
- `GET    /api/demandes?account=...` : Lister les demandes d’un compte principal
- `GET    /api/demandes/all` : Lister toutes les demandes
- `GET    /api/demandes/journalized?account=...` : Lister les demandes journalisées (ayant au moins un log)
- `GET    /api/demandes/{id}` : Détail d’une demande
- `PUT    /api/demandes/{id}` : Modifier une demande
- `DELETE /api/demandes/{id}` : Supprimer une demande

### Logs
- `POST   /api/logs` : Créer un log (peut être lié à une demande)
- `GET    /api/logs` : Lister tous les logs
- `GET    /api/logs/{id}` : Détail d’un log
- `PUT    /api/logs/{id}` : Modifier un log
- `DELETE /api/logs/{id}` : Supprimer un log

## 🧪 Tester les endpoints
- Utilise Swagger (`/api-docs`) pour tester tous les endpoints en direct.
- Tu peux aussi utiliser Postman, Insomnia, ou `curl`.

## 📝 Bonnes pratiques
- **Ne commit jamais le fichier `.env`** (il est dans `.gitignore`).
- **Regénère Prisma** (`npx prisma generate`) après toute modif du schéma.
- **Utilise le seeder** pour avoir des données de test réalistes.
- **Lis les messages d’erreur** : ils sont explicites pour la validation des numéros et CNI.

## 📦 Structure du projet
- `src/` : code source (routes, services, contrôleurs, middlewares, etc.)
- `prisma/` : schéma Prisma
- `seeder.js` : script d’initialisation des données
- `.env` : variables d’environnement (non versionné)

## 🌿 Travailler avec les branches Git

Pour créer une nouvelle branche (par exemple pour une nouvelle fonctionnalité ou un correctif) :

```bash
git checkout -b nom-de-ta-branche
```

Pour voir toutes les branches :
```bash
git branch
```

Pour changer de branche :
```bash
git checkout nom-de-ta-branche
```

Pour pousser ta branche sur le dépôt distant :
```bash
git push origin nom-de-ta-branche
```

---
**Max221 – Projet Gesclient** # GesClient-back
