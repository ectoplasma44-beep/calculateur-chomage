# AUDIT — Liens internes cassés

**Date :** 2026-06-17  
**Méthode :** grep de tous les `href="/..."` dans src/**/*.tsx, vérification de l'existence d'un page.tsx correspondant.

## Résultat : AUCUN LIEN CASSÉ DÉTECTÉ

Tous les `href` internes trouvés dans le JSX pointent vers des routes existantes.

### Routes existantes vérifiées (47 page.tsx)

| Route | Statut |
|---|---|
| / | ✓ |
| /rupture-conventionnelle | ✓ |
| /fin-de-cdd | ✓ |
| /licenciement-economique | ✓ |
| /salaire-journalier-reference | ✓ |
| /duree-indemnisation | ✓ |
| /demission-legitime | ✓ |
| /abandon-de-poste | ✓ |
| /cumul-emploi-chomage | ✓ |
| /degressivite-chomage | ✓ |
| /chomage-seniors | ✓ |
| /comprendre-assurance-chomage | ✓ |
| /methodologie | ✓ |
| /mentions-legales | ✓ |
| /politique-confidentialite | ✓ |
| /a-propos | ✓ |
| /demission-reconversion-cpf | ✓ |
| /licenciement-faute | ✓ |
| /temps-partiel | ✓ |
| /delai-carence-chomage | ✓ |
| /chomage-net-brut | ✓ |
| /chomage-cadre | ✓ |
| /rupture-conventionnelle-cadre | ✓ |
| /licenciement-economique-cadre | ✓ |
| /chomage-interimaire | ✓ |
| /fin-de-cdd-interimaire | ✓ |
| /chomage-alternant-apprenti | ✓ |
| /fin-de-cdd-alternant | ✓ |
| /rupture-conventionnelle-senior | ✓ |
| /licenciement-economique-senior | ✓ |
| /chomage-rqth | ✓ |
| /fin-de-cdd-rqth | ✓ |
| /chomage-apres-conge-maternite | ✓ |
| /rupture-conventionnelle-conge-parental | ✓ |
| /chomage-fonctionnaire-reconversion | ✓ |
| /licenciement-faute-senior | ✓ |
| /abandon-de-poste-senior | ✓ |
| /demission-legitime-senior | ✓ |
| /licenciement-faute-cadre | ✓ |
| /chomage-cadre-5000-euros | ✓ |
| /chomage-cadre-4000-euros | ✓ |
| /chomage-cadre-3000-euros | ✓ |
| /chomage-interimaire-2000-euros | ✓ |
| /chomage-interimaire-1500-euros | ✓ |
| /rupture-conventionnelle-interimaire | ✓ |
| /licenciement-interimaire | ✓ |
| /[montant] (dynamique) | ✓ |

### Note sur les routes dynamiques

Le fichier `src/app/[montant]/page.tsx` gère les routes `/chomage-salaire-X-euros` générées via `SALAIRES_CONFIG`. Ces routes ne sont pas référencées par des liens `href` dans d'autres pages JSX, mais elles sont valides et accessibles.
