// Cancion.js
const Cancion = ({ titulo, letra }) => {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden p-5 mb-5">
        <h4 className="text-2xl font-bold mb-3">{titulo}</h4>
        {letra.map((estrofa, index) => (
          <p key={index} className="mb-3 text-gray-700 text-lg leading-loose">{estrofa}</p>
        ))}
      </div>
    );
  };
  
  export default Cancion;
