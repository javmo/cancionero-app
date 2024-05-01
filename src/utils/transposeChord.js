// utils/transposeChord.js
export const notes = ['DO', 'DO#', 'RE', 'Re#', 'Mi', 'Fa', 'Fa#', 'Sol', 'Sol#', 'La', 'La#', 'Si'];

const noteRegex = /([CDSFLG]#?)(m?)(7?)/;  // Ajustado para capturar notas en español

const getNoteIndex = (note) => {
    // Encontrar la nota en el array `notes` y devolver su índice.
    const index = notes.indexOf(note);
    if (index === -1) {
        // Si es un bemol, buscar la nota equivalente.
        const flatNote = note.replace('b', '#'); // Asumiendo que puedan entrar notas con 'b'.
        const flatIndex = notes.indexOf(flatNote);
        return flatIndex !== -1 ? flatIndex - 1 : -1;
    }
    return index;
};

const getTransposedNote = (index, increment) => {
    // Sumar el incremento y asegurarse de que el índice resultante esté en el rango del array `notes`.
    return notes[(index + increment + 12) % 12];
};

export const transposeChord = (chord, increment) => {
    console.log(`Transposing ${chord} by ${increment} steps`);
    const [match, note, minor, seventh] = chord.match(noteRegex) || [];
    
    if (!match) return chord; // If regex match fails, return original chord
  
    const noteIndex = getNoteIndex(note + (minor ? 'm' : '') + (seventh ? '7' : ''));
    if (noteIndex === -1) return chord; // If note not found, return original chord
  
    const transposedNote = getTransposedNote(noteIndex, increment);
    console.log(`Original: ${chord}, Transposed: ${transposedNote}`);
    return transposedNote + (minor || '') + (seventh || '');
  };
  

