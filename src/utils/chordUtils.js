// chordUtils.js

export const notes = ['DO', 'DO#', 'RE', 'RE#', 'MI', 'FA', 'FA#', 'SOL', 'SOL#', 'LA', 'LA#', 'SI'];
const naturals = ['DO', 'RE', 'MI', 'FA', 'SOL', 'LA', 'SI']; // Notas naturales

export const transposeChord = (chord, shift) => {
    // Captura acorde menor
    const minorRegex = /^([A-Za-z]+#?)(m)([^m]*)$/; 
    const matchMinor = chord.match(minorRegex);

    if (matchMinor) {
        let [_, root, minor, suffix] = matchMinor;
        let noteIndex = notes.indexOf(root.toUpperCase());
        if (noteIndex === -1) return chord;

        const newNoteIndex = (noteIndex + shift + notes.length) % notes.length;
        const newNote = notes[newNoteIndex];
        console.log("Original Minor Chord:", chord, "Transposed Chord:", `${newNote}m${suffix}`);
        return `${newNote}m${suffix}`;
    }

    // Captura acordes mayores u otros tipos
    const regex = /^([A-Za-z]+#?)(m?)([^m]*)$/;
    const match = chord.match(regex);

    if (match) {
        const [_, note, isMinor, suffix] = match;
        let noteIndex = notes.indexOf(note.toUpperCase());
        if (noteIndex === -1) return chord;

        const newNoteIndex = (noteIndex + shift + notes.length) % notes.length;
        const newNote = notes[newNoteIndex];

        console.log("Original Chord:", chord, "Transposed Chord:", `${newNote}${isMinor || ''}${suffix}`);
        return `${newNote}${isMinor || ''}${suffix}`;
    } else {
        console.log("No match found for chord:", chord);
        return chord; // Devuelve el acorde original si no hay coincidencia
    }
};


