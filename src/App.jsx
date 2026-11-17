import { useState } from 'react'
import Bestiary from './components/Bestiary'
import LootGenerator from './components/LootGenerator'
import DiceTray from './components/DiceTray'

function App() {
  const [tab, setTab] = useState('bestiary')

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 p-4 text-center">
        <h1 className="text-2xl font-bold text-red-400">Herramienta DungeonMaster D&D</h1>
      </header>

      <nav className="flex justify-center gap-2 p-3 bg-gray-800 border-t border-gray-700">
        <button
          onClick={() => setTab('bestiary')}
          className={`px-3 py-2 rounded text-sm ${
            tab === 'bestiary' ? 'bg-red-700' : 'bg-gray-700'
          }`}
        >
          Bestiario
        </button>
        <button
          onClick={() => setTab('loot')}
          className={`px-3 py-2 rounded text-sm ${
            tab === 'loot' ? 'bg-red-700' : 'bg-gray-700'
          }`}
        >
          Loot
        </button>
        <button
          onClick={() => setTab('dice')}
          className={`px-3 py-2 rounded text-sm ${
            tab === 'dice' ? 'bg-red-700' : 'bg-gray-700'
          }`}
        >
          Dados
        </button>
      </nav>

      <main className="p-4 max-w-3xl mx-auto">
        {tab === 'bestiary' && <Bestiary />}
        {tab === 'loot' && <LootGenerator />}
        {tab === 'dice' && <DiceTray />}
      </main>
    </div>
  )
}

export default App