export default function LessonCard({ lesson, index, completed, locked, onStart }) {
  return (
    <button className={`lesson-card ${completed ? "completed" : ""} ${locked ? "locked" : ""}`} onClick={onStart} disabled={locked}>
      <span className="lesson-number">{completed ? "✓" : locked ? "⌑" : String(index + 1).padStart(2, "0")}</span>
      <span className="lesson-copy"><strong>{lesson.title}</strong><small>{completed ? "Completed" : lesson.type}</small></span>
      <span className="lesson-xp">✦ {lesson.xp} XP</span>
      <span className="lesson-arrow">›</span>
    </button>
  );
}