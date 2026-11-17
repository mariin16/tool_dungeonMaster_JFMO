function MonsterCard({ monster }) {
  const ac = Array.isArray(monster.armor_class)
    ? monster.armor_class[0]?.value
    : monster.armor_class

  return (
    <div className="bg-gray-800 p-4 rounded border border-red-700">
      <h3 className="text-lg font-bold text-red-400 mb-2">{monster.name}</h3>
      <div className="grid grid-cols-3 gap-2 text-center text-sm">
        <div className="bg-gray-900 p-2 rounded">
          <p className="text-gray-400 text-xs">CA</p>
          <p className="font-bold">{ac ?? '—'}</p>
        </div>
        <div className="bg-gray-900 p-2 rounded">
          <p className="text-gray-400 text-xs">PG</p>
          <p className="font-bold">{monster.hit_points}</p>
        </div>
        <div className="bg-gray-900 p-2 rounded">
          <p className="text-gray-400 text-xs">CR</p>
          <p className="font-bold">{monster.challenge_rating}</p>
        </div>
      </div>
    </div>
  )
}

export default MonsterCard