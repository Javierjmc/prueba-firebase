import { useState } from 'react';

function App() {
  const [invitados, setInvitados] = useState([
    { nombre: 'Juan', edad: 20 },
    { nombre: 'Pedro', edad: 25 },
  ]);
  const [invitado, setInvitado] = useState({ nombre: '', edad: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (invitado.nombre && !isNaN(invitado.edad) && invitado.edad !== '') {
      if (editIndex !== null) {
        // Editar invitado existente
        const updatedInvitados = [...invitados];
        updatedInvitados[editIndex] = invitado;
        setInvitados(updatedInvitados);
        setEditIndex(null); // Resetear el índice de edición
      } else {
        // Agregar nuevo invitado
        setInvitados([...invitados, invitado]);
      }
      setInvitado({ nombre: '', edad: '' }); // Limpiar el formulario
    } else {
      alert('Por favor ingrese un nombre y una edad válida.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvitado({ ...invitado, [name]: value });
  };

  const handleRemove = (indexToRemove) => {
    setInvitados(invitados.filter((_, index) => index !== indexToRemove));
  };

  const handleEdit = (indexToEdit) => {
    setEditIndex(indexToEdit);
    setInvitado(invitados[indexToEdit]);
  };

  const filteredInvitados = invitados.filter((invitado) =>
    invitado.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="min-h-screen text-white font-mono bg-slate-800 flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold">Lista de invitados</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-3xl">
        <fieldset className="flex gap-2 bg-slate-700 rounded py-2 px-4 grid grid-cols-6">
          <input
            onChange={handleChange}
            type="text"
            name="nombre"
            placeholder="Nombre"
            className="bg-slate-900 py-2 px-4 col-span-4"
            value={invitado.nombre}
          />
          <input
            onChange={handleChange}
            type="number"
            name="edad"
            placeholder="edad"
            className="bg-slate-900 py-2 px-4 col-span-1"
            value={invitado.edad}
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded col-span-1 cursor-pointer"
          >
            {editIndex !== null ? 'Actualizar' : 'Agregar'}
          </button>
        </fieldset>
        <fieldset className="flex gap-2 bg-slate-700 rounded py-2 px-4 grid">
          <label>Buscar por nombre</label>
          <input
            type="search"
            className="bg-slate-900 py-2 px-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </fieldset>
      </form>
      <ul className="border w-full max-w-3xl">
        {filteredInvitados.map((invitado, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-slate-700 py-2 px-4 rounded"
          >
            <span>{invitado.nombre}</span>
            <span>{invitado.edad}</span>
            <menu className="flex gap-2">
              <button
                onClick={() => handleEdit(index)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer"
              >
                Editar
              </button>
              <button
                onClick={() => handleRemove(index)}
                className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded cursor-pointer"
              >
                Remover
              </button>
            </menu>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default App;