import { useState } from 'react'

function LootGenerator() {
  const [cr, setCr] = useState(1)
  const [loot, setLoot] = useState(null)
  const [loading, setLoading] = useState(false)

  const rollDice = (sides, count = 1) => {
    let total = 0
    for (let i = 0; i < count; i++) {
      total += Math.floor(Math.random() * sides) + 1
    }
    return total
  }

  const generateLoot = async () => {
    setLoading(true)

    const multiplier = cr + 1
    const gold = rollDice(10, multiplier) * 10
    const silver = rollDice(6, multiplier) * 5
    const copper = rollDice(4, multiplier) * 5

    // A mayor CR, mayor calidad de objetos
    const endpoint = cr >= 5 ? 'magic-items' : 'equipment'
    const res = await fetch(`https://www.dnd5eapi.co/api/${endpoint}`)
    const data = await res.json()

    const itemsCount = Math.min(1 + Math.floor(cr / 2), 4)
    const pool = [...data.results]
    const pickedItems = []

    for (let i = 0; i < itemsCount && pool.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * pool.length)
      pickedItems.push(pool[randomIndex])
      pool.splice(randomIndex, 1)
    }

    setLoot({
      coins: { gold, silver, copper },
      items: pickedItems,
    })
    setLoading(false)
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Generador de Botín</h2>

      <label className="block mb-2 text-sm text-gray-300">
        Nivel de desafío (CR) del monstruo:
      </label>
      <select
        value={cr}
        onChange={(e) => setCr(Number(e.target.value))}
        className="w-full p-2 mb-3 rounded bg-gray-800 border border-gray-700"
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20].map((n) => (
          <option key={n} value={n}>
            CR {n}
          </option>
        ))}
      </select>

      <button
        onClick={generateLoot}
        disabled={loading}
        className="w-full bg-red-700 hover:bg-red-600 p-2 rounded font-bold mb-4 disabled:opacity-50"
      >
        {loading ? 'Generar Botín' : 'Generar Botín'}
      </button>

      {loot && (
        <div className="bg-gray-800 p-4 rounded border border-gray-700">
          <h3 className="font-bold text-red-400 mb-2">Recompensas</h3>

          <p className="text-sm text-gray-400 mb-1">Monedas:</p>
          <div className="grid grid-cols-3 gap-2 text-center text-sm mb-4">
            <div className="bg-gray-900 p-2 rounded">
              <p className="text-yellow-400 text-xs">Oro</p>
              <p className="font-bold">{loot.coins.gold}</p>
            </div>
            <div className="bg-gray-900 p-2 rounded">
              <p className="text-gray-300 text-xs">Plata</p>
              <p className="font-bold">{loot.coins.silver}</p>
            </div>
            <div className="bg-gray-900 p-2 rounded">
              <p className="text-orange-400 text-xs">Cobre</p>
              <p className="font-bold">{loot.coins.copper}</p>
            </div>
          </div>

          <p className="text-sm text-gray-400 mb-1">Objetos:</p>
          <ul className="space-y-1">
            {loot.items.map((item, i) => (
              <li key={i} className="bg-gray-900 p-2 rounded text-sm">
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default LootGenerator