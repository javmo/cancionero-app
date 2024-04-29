// utils/transposeChord.js
const notes = ['Do', 'Do#', 'Re', 'Re#', 'Mi', 'Fa', 'Fa#', 'Sol', 'Sol#', 'La', 'La#', 'Si'];

const noteRegex = /([A-G]#?)(m?)(7?)/;

const getNoteIndex = (note) => {
  // Encontrar la nota en el array `notes` y devolver su índice.
  const index = notes.indexOf(note);
  if (index === -1) {
    // Si es un bemol, buscar la nota equivalente.
    const flatIndex = notes.indexOf(note.replace('b', '#'));
    return flatIndex !== -1 ? flatIndex - 1 : -1;
  }
  return index;
};

const getTransposedNote = (index, increment) => {
  // Sumar el incremento y asegurarse de que el índice resultante esté en el rango del array `notes`.
  return notes[(index + increment + 12) % 12];
};

export const transposeChord = (chord, increment) => {
  // Utilizar la expresión regular para obtener la nota y cualquier modificador (menor, séptimo).
  const [match, note, minor, seventh] = chord.match(noteRegex) || [];
  
  if (!match) return chord; // Si no hay coincidencia, devolver el acorde original.

  const noteIndex = getNoteIndex(note + (minor ? 'm' : '') + (seventh ? '7' : '')); // Considerar m y 7 como parte de la nota para el índice.

  if (noteIndex === -1) return chord; // Si no se encuentra la nota, devolver el acorde original.

  const transposedNote = getTransposedNote(noteIndex, increment);

  // Reconstruir el acorde transpuesto y devolverlo.
  return transposedNote + (minor || '') + (seventh || '');
};
