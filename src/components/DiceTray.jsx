import { useState } from 'react'

const DICE = [4, 6, 8, 10, 12, 20, 100]

function DiceTray() {
  const [results, setResults] = useState({})

  const roll = (sides) => {
    const result = Math.floor(Math.random() * sides) + 1
    setResults((prev) => ({ ...prev, [sides]: result }))
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Bandeja de Dados</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {DICE.map((sides) => (
          <div
            key={sides}
            className="bg-gray-800 p-3 rounded border border-gray-700 text-center"
          >
            <p className="text-lg font-bold mb-2">d{sides}</p>
            <button
              onClick={() => roll(sides)}
              className="w-full bg-red-700 hover:bg-red-600 py-1 rounded mb-2 text-sm"
            >
              Lanzar
            </button>
            <div className="bg-gray-900 p-2 rounded h-14 flex items-center justify-center">
              <span className="text-2xl font-bold text-yellow-400">
                {results[sides] ?? '—'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DiceTray