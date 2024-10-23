# 🎵 After Effects Automation Script 🎬

Ce projet vous permet d'automatiser le processus d'importation de fichiers musicaux dans un template After Effects, d'ajuster la composition, d'exporter la vidéo via **Adobe Media Encoder** en utilisant un préréglage d'export, et de déplacer automatiquement les fichiers traités dans un dossier `done`. Le processus continue jusqu'à ce que toutes les musiques du dossier `new` aient été traitées.

---

## 🛠️ **Fichiers et Scripts :**

1. **process_music.jsx** : 
    - Un script **ExtendScript** qui est utilisé par After Effects pour automatiser l'importation des musiques dans la composition, ajuster la durée, et ajouter la vidéo à la file d'attente d'export.
  
2. **process_script.js** : 
    - Un script **Node.js** qui parcourt les fichiers du dossier `new`, exécute After Effects avec le script ExtendScript, et déplace les fichiers traités vers `done`.

---

## 📂 **Structure des Dossiers :**

- **musiques** : Contient deux sous-dossiers :
    - **new** : Les fichiers musicaux (au format `.mp3` ou `.wav`) à traiter.
    - **done** : Les fichiers musicaux traités seront déplacés ici après le rendu.
- **scripts** : Contient le script Node.js (`process_script.js`) et le script ExtendScript (`process_music.jsx`).
- **videos** : Les vidéos exportées seront enregistrées dans ce dossier.
- **template** : Contient votre fichier **After Effects Template** (`template_automate.ae`).

---

## 🚀 **Étapes du Processus :**

1. **Le script Node.js** recherche les fichiers musicaux dans `musiques/new`.
2. **Le script ExtendScript** est appelé pour ouvrir After Effects, importer la musique dans le **template After Effects**, et ajuster la composition selon la durée du fichier musical.
3. La vidéo est **exportée via Adobe Media Encoder** en utilisant un préréglage défini.
4. Une fois traitée, la musique est déplacée dans `musiques/done`.

---

## 🔧 **Variables à Modifier :**

### 1. **Dans `process_music.jsx` (ExtendScript) :**

| Variable | Description | Exemple |
| -------- | ----------- | ------- |
| `musicPath` | Chemin du fichier musical à importer (défini dans Node.js). | Ne pas modifier |
| `outputPath` | Chemin où la vidéo sera exportée (défini dans Node.js). | Ne pas modifier |
| `templatePath` | Chemin du fichier **After Effects Template**. | `'/chemin/vers/template_automate.ae'` |
| `exportPreset` | Préréglage d'export dans **Adobe Media Encoder**. | `"export_automate"` |
| `precompName` | Nom du calque dans After Effects où la musique sera placée. | `"music"` |

### 2. **Dans `process_script.js` (Node.js) :**

| Variable | Description | Exemple |
| -------- | ----------- | ------- |
| `musicFolder` | Dossier contenant les fichiers musicaux à traiter. | `path.join(__dirname, '../musiques/new')` |
| `doneFolder` | Dossier où les musiques traitées seront déplacées. | `path.join(__dirname, '../musiques/done')` |
| `videoFolder` | Dossier où les vidéos exportées seront enregistrées. | `path.join(__dirname, '../videos')` |
| `templateFile` | Chemin du template After Effects. | `path.join(__dirname, '../template/template_automate.ae')` |
| `afterEffectsScript` | Chemin vers le script ExtendScript. | `path.join(__dirname, 'process_music.jsx')` |

---

## 💡 **Personnalisation :**

- **Préréglage d'export** : Si vous avez un préréglage spécifique dans **Adobe Media Encoder**, assurez-vous que son nom est correctement spécifié dans `process_music.jsx` via la variable `exportPreset`.
- **Nom du calque `music`** : Si le calque où vous insérez la musique dans votre template After Effects a un nom différent, vous pouvez le changer via la variable `precompName` dans `process_music.jsx`.

---

## ⚙️ **Comment Lancer le Script :**

1. Assurez-vous que **After Effects** et **Adobe Media Encoder** sont installés et configurés avec les préréglages nécessaires.
2. Placez vos fichiers musicaux dans le dossier `musiques/new`.
3. Depuis votre terminal, accédez au dossier `scripts` et lancez :

   ```bash
   node process_script.js

4.	Le script traitera chaque fichier musical, exportera les vidéos dans le dossier videos, et déplacera les fichiers musicaux traités dans musiques/done.

## 🔍 **Dépannage :**

- **After Effects ne s’ouvre pas :** Vérifiez que vous avez correctement installé After Effects et que le chemin vers le template est valide.
- **Erreur d’export :** Assurez-vous que le préréglage export_automate existe dans Adobe Media Encoder.
- **Musiques non traitées :** Vérifiez que les fichiers sont bien dans le dossier musiques/new et qu’ils sont au format .mp3 ou .wav.

## 🎉 **Félicitations !**

Vous avez maintenant automatisé le processus de création vidéo avec **After Effects** et **Adobe Media Encoder**. 🎬🎶

### Explications :
- Les variables clés sont présentées dans des tableaux pour faciliter leur modification.
- Des emojis sont utilisés pour rendre le document plus attractif et lisible.
- Une section de personnalisation permet de changer facilement les noms des calques ou des préréglages.
- Le document inclut un guide clair sur l'utilisation et les étapes à suivre pour lancer le script.