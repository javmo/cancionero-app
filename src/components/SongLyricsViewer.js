import React, { useState } from 'react';

function SongLyricsViewer({ title, artist, lyric, lyricchord }) {
  const [showChords, setShowChords] = useState(false);

  const toggleChords = () => setShowChords(!showChords);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold text-center">{title}</h1>
      <p className="text-md text-gray-600 text-center mb-4">{artist}</p>
      <div className="text-sm mb-4">
        <button
          onClick={toggleChords}
          className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
        >
          {showChords ? 'Ocultar Acordes' : 'Mostrar Acordes'}
        </button>
      </div>
      <div className="lyrics text-xs overflow-y-auto" style={{ maxHeight: '60vh' }}>
        {showChords ? (
          <div dangerouslySetInnerHTML={{ __html: lyricchord }} />
        ) : (
          <pre>{lyric.text}</pre>
        )}
      </div>
    </div>
  );
}

export default SongLyricsViewer;
