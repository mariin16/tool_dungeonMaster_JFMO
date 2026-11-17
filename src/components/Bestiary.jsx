import { useState, useEffect } from 'react'
import MonsterCard from './MonsterCard'

function Bestiary() {
  const [monsters, setMonsters] = useState([])
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://www.dnd5eapi.co/api/monsters')
      .then((res) => res.json())
      .then((data) => {
        setMonsters(data.results)
        setLoading(false)
      })
  }, [])

  const handleSelect = (monster) => {
    fetch(`https://www.dnd5eapi.co${monster.url}`)
      .then((res) => res.json())
      .then((data) => setSelected(data))
  }

  const filtered = monsters.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <p>Cargando monstruos...</p>

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Bestiario</h2>

      <input
        type="text"
        placeholder="Buscar monstruo..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-3 rounded bg-gray-800 border border-gray-700"
      />

      {selected && (
        <div className="mb-4">
          <MonsterCard monster={selected} />
          <button
            onClick={() => setSelected(null)}
            className="mt-2 bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm"
          >
            Cerrar
          </button>
        </div>
      )}

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {filtered.slice(0, 60).map((m) => (
          <li key={m.index}>
            <button
              onClick={() => handleSelect(m)}
              className="w-full text-left bg-gray-800 p-2 rounded border border-gray-700 hover:bg-gray-700 text-sm"
            >
              {m.name}
            </button>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="text-gray-400 text-sm">No se encontraron monstruos.</p>
      )}
    </div>
  )
}

export default Bestiary