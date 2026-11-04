export default function Profile({ xp, completedCount, streak }) {
  return (
    <section className="page-panel profile-panel">
      <div className="profile-avatar">h</div>
      <p className="eyebrow">YOUR LEARNING JOURNEY</p>
      <h1>Curious mind, growing skills.</h1>
      <p className="muted">Your HaruLing profile is saved on this device for now.</p>
      <div className="profile-stats">
        <div><strong>{xp}</strong><span>Total XP</span></div>
        <div><strong>{completedCount}</strong><span>Lessons done</span></div>
        <div><strong>{streak}</strong><span>Day streak</span></div>
      </div>
      <div className="notice"><span>☁</span><p><b>Coming next: cloud sync</b><br />Your account and cross-device progress will arrive when we connect Supabase.</p></div>
    </section>
  );
}