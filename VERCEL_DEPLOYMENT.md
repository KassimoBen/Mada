# Guide de Déploiement sur Vercel

## Corrections appliquées

Les fichiers suivants ont été optimisés pour corriger l'erreur 126 :

1. **vercel.json** - Configuration Vercel améliorée avec build command correct
2. **vite.config.js** - Optimisations pour la production
3. **.vercelignore** - Exclusion des dossiers inutiles
4. **package.json** - Scripts de build améliorés

## Variables d'environnement Vercel

Dans la console Vercel, allez à **Settings > Environment Variables** et ajoutez:

```
PORT=5000
JWT_SECRET=Madah0rizon_S3cr3t_K3y_2026!
STRIPE_SECRET_KEY=sk_test_votre_clé
STRIPE_WEBHOOK_SECRET=whsec_votre_secret
CLIENT_URL=https://votre-domaine.vercel.app
NODE_ENV=production
```

## Redéploiement

1. Poussez les changements sur GitHub:
   ```bash
   git add .
   git commit -m "fix: Vercel build configuration"
   git push
   ```

2. Vercel redéploiera automatiquement

## Notes importantes

- Le buildCommand exécute d'abord npm install à la racine, puis dans le dossier client
- Le outputDirectory pointe vers client/dist (dossier de build de Vite)
- .vercelignore exclut le dossier server qui n'est pas nécessaire pour le frontend

## Dépannage

Si l'erreur 126 persiste :

1. Vérifiez les logs de build dans Vercel Dashboard
2. Assurez-vous que le package.json du client n'a pas de dépendances manquantes
3. Vérifiez que CLIENT_URL dans le .env correspond à votre domaine Vercel
4. Effacez le cache de build dans Vercel et redéployez
