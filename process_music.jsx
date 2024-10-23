// Variables pour les chemins et préréglages
var musicPath = $.arguments[0];  // Chemin du fichier audio passé depuis Node.js
var outputPath = $.arguments[1]; // Chemin de l'export de la vidéo passé depuis Node.js
var templatePath = $.arguments[2]; // Chemin du template After Effects passé depuis Node.js
var exportPreset = "export_automate"; // Nom du préréglage d'export dans Adobe Media Encoder
var precompName = "music"; // Nom du calque precomp où la musique sera insérée

// Ouvrir le projet After Effects (le template)
var templateProject = File(templatePath);
app.open(templateProject);

// Sélectionner la composition principale
var comp = app.project.activeItem;  // ActiveItem devrait être la composition ouverte

// Chercher le calque "music" (qui est un précomp)
var musicLayer = null;
for (var i = 1; i <= comp.numLayers; i++) {
    if (comp.layer(i).name === precompName) {
        musicLayer = comp.layer(i);
        break;
    }
}

if (!musicLayer) {
    alert("Le calque 'music' n'a pas été trouvé.");
} else {
    // Importer le fichier audio (la musique)
    var audioFile = File(musicPath);
    var importOptions = new ImportOptions(audioFile);
    var audioLayer = app.project.importFile(importOptions);
    
    // Remplacer le placeholder dans le calque 'music' avec le fichier audio
    var placeholderComp = musicLayer.source;  // Récupérer la composition du placeholder
    placeholderComp.layers.add(audioLayer);   // Ajouter le fichier audio dans la précomp

    // Ajuster la durée de la composition principale à celle de la musique
    var audioDuration = audioLayer.duration;
    comp.duration = audioDuration;

    // Ajouter la composition à la file d'attente de rendu
    var renderItem = app.project.renderQueue.items.add(comp);
    
    // Spécifier l'endroit où la vidéo sera exportée avec le même nom que le fichier audio
    renderItem.outputModule(1).file = new File(outputPath);

    // Appliquer le préréglage d'export "export_automate"
    renderItem.outputModule(1).applyTemplate(exportPreset);

    // Lancer le rendu avec Adobe Media Encoder (en parallèle)
    app.project.renderQueue.queueInAME(true);  // Envoie vers Adobe Media Encoder
}

// Fermer le projet sans enregistrer pour garder le template intact
app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES);