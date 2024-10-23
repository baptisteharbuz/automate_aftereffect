// Importations des modules nécessaires
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Variables pour les chemins des dossiers et fichiers
const musicFolder = path.join(__dirname, '../musiques/new'); // Dossier contenant les fichiers audio
const doneFolder = path.join(__dirname, '../musiques/done'); // Dossier où déplacer les musiques traitées
const videoFolder = path.join(__dirname, '../videos');       // Dossier où enregistrer les vidéos exportées
const templateFile = path.join(__dirname, '../template/template_automate.ae');  // Chemin vers le template After Effects
const afterEffectsScript = path.join(__dirname, 'process_music.jsx'); // Chemin vers le script ExtendScript

// Fonction pour déplacer un fichier
function moveFile(file, destination) {
    const fileName = path.basename(file);
    const dest = path.join(destination, fileName);
    fs.renameSync(file, dest);
}

// Fonction pour traiter chaque fichier musical
function processMusicFiles() {
    fs.readdir(musicFolder, (err, files) => {
        if (err) {
            console.error('Erreur lors de la lecture du dossier musique:', err);
            return;
        }

        // Filtrer pour ne prendre que les fichiers audio (mp3, wav)
        const musicFiles = files.filter(file => file.endsWith('.mp3') || file.endsWith('.wav'));

        if (musicFiles.length === 0) {
            console.log('Aucun fichier à traiter.');
            return;
        }

        // Boucle à travers les fichiers musicaux
        musicFiles.forEach((musicFile) => {
            const musicPath = path.join(musicFolder, musicFile);
            const outputFileName = `${path.basename(musicFile, path.extname(musicFile))}.mp4`;
            const outputPath = path.join(videoFolder, outputFileName);

            // Commande pour appeler After Effects avec le script ExtendScript
            const command = `afterfx -r ${afterEffectsScript} ${musicPath} ${outputPath} ${templateFile}`;

            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Erreur lors de l'exécution du script After Effects : ${error.message}`);
                    return;
                }
                console.log(`Vidéo exportée avec succès: ${outputPath}`);

                // Déplacer la musique traitée dans le dossier "done"
                moveFile(musicPath, doneFolder);
                console.log(`Musique déplacée vers ${doneFolder}`);
            });
        });
    });
}

// Lancer le traitement
processMusicFiles();