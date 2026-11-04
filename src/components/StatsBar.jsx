export default function StatsBar({ xp, streak, hearts }) {
  return (
    <div className="stats-bar" aria-label="Learning statistics">
      <div className="stat"><span className="stat-icon fire">♨</span><span><b>{streak}</b><small>day streak</small></span></div>
      <div className="stat"><span className="stat-icon gem">✦</span><span><b>{xp} XP</b><small>total earned</small></span></div>
      <div className="stat"><span className="stat-icon heart">♥</span><span><b>{hearts}</b><small>hearts</small></span></div>
    </div>
  );
}