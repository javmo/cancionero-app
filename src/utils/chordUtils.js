// chordUtils.js

export const notes = ['DO', 'DO#', 'RE', 'RE#', 'MI', 'FA', 'FA#', 'SOL', 'SOL#', 'LA', 'LA#', 'SI'];

export const transposeChord = (chord, shift) => {
    // Regex mejorada para capturar acordes menores específicamente y otros acordes también.
    const minorRegex = /^([A-Za-z]+)(m)([^#]*)$/; // Captura acordes menores sin # en la nota base.
    const matchMinor = chord.match(minorRegex);

    if (matchMinor) {
        let [_, root, minor, suffix] = matchMinor;
        let noteIndex = notes.indexOf(root.toUpperCase() + '#'); // Trata de encontrar la nota con sostenido.
        if (noteIndex === -1) {
            noteIndex = notes.indexOf(root.toUpperCase()); // Si no tiene sostenido, busca la nota natural.
        }
        if (noteIndex === -1) return chord; // Si no se encuentra, devuelve el acorde original.

        const newNoteIndex = (noteIndex + shift + notes.length) % notes.length;
        const newNote = notes[newNoteIndex];
        console.log("Original Chord:", chord, "Transposed Chord:", `${newNote}m${suffix}`);
        return `${newNote}m${suffix}`; // Asegura que el acorde sigue siendo menor.
    } 

    // Regla general para otros acordes.
    const regex = /^([A-Za-z]+#?)(m)?([^m]*)$/;
    const match = chord.match(regex);
    if (match) {
        const [_, note, isMinor, extra] = match;
        let noteIndex = notes.indexOf(note.toUpperCase());
        if (noteIndex === -1) return chord;

        const newNoteIndex = (noteIndex + shift + 12) % 12;
        const newNote = notes[newNoteIndex];
        console.log("Original Chord:", chord, "Transposed Chord:", `${newNote}${isMinor || ''}${extra}`);
        return `${newNote}${isMinor || ''}${extra}`;
    } else {
        console.log("No match found for chord:", chord);
        return chord; // Devuelve el acorde original si no hay coincidencia.
    }
};


