import { useEffect, useMemo, useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import StatsBar from "./components/StatsBar.jsx";
import LessonCard from "./components/LessonCard.jsx";
import Profile from "./pages/Profile.jsx";
import { course } from "./data/course.js";

const STORAGE_KEY = "haruling-progress-v1";

function readProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

export default function App() {
  const [progress, setProgress] = useState(readProgress);
  const [activePage, setActivePage] = useState("learn");
  const [activeLesson, setActiveLesson] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [hearts, setHearts] = useState(5);
  const [showWelcome, setShowWelcome] = useState(!localStorage.getItem("haruling-welcomed"));

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const allLessons = useMemo(() => course.units.flatMap((unit) => unit.lessons), []);
  const completed = progress.completed || [];
  const xp = progress.xp || 0;
  const completedCount = completed.length;
  const currentQuestion = activeLesson?.questions[questionIndex];

  function startLesson(lesson) {
    if (!lesson.questions.length) return;
    setActiveLesson(lesson);
    setQuestionIndex(0);
    setSelected(null);
    setChecked(false);
    setFeedback("");
  }

  function checkAnswer() {
    if (selected === null || checked) return;
    const correct = selected === currentQuestion.answer;
    setChecked(true);
    setFeedback(correct ? "Brilliant! That's correct." : currentQuestion.explanation);
    if (correct) setProgress((old) => ({ ...old, xp: (old.xp || 0) + 5 }));
    else setHearts((old) => Math.max(0, old - 1));
  }

  function nextQuestion() {
    if (!checked) return;
    if (questionIndex + 1 < activeLesson.questions.length) {
      setQuestionIndex((old) => old + 1);
      setSelected(null);
      setChecked(false);
      setFeedback("");
      return;
    }
    setProgress((old) => ({
      ...old,
      completed: [...new Set([...(old.completed || []), activeLesson.id])]
    }));
    setActiveLesson(null);
  }

  function closeWelcome() {
    localStorage.setItem("haruling-welcomed", "yes");
    setShowWelcome(false);
  }

  return (
    <div className="app-shell">
      <Sidebar active={activePage} onNavigate={(page) => { setActivePage(page); setActiveLesson(null); }} />
      <main className="main-area">
        <header className="topbar">
          <div><span className="topbar-kicker">YOUR DAILY DOSE OF CODE</span><strong>Keep your curiosity alive.</strong></div>
          <StatsBar xp={xp} streak={progress.streak || 1} hearts={hearts} />
          <button className="avatar-button" aria-label="Open profile" onClick={() => setActivePage("profile")}>H</button>
        </header>

        {activePage === "profile" ? (
          <Profile xp={xp} completedCount={completedCount} streak={progress.streak || 1} />
        ) : activePage === "practice" ? (
          <section className="page-panel">
            <p className="eyebrow">PRACTICE ZONE</p><h1>Keep your skills warm.</h1>
            <p className="muted">Choose any lesson you've already unlocked and practise it again.</p>
            <div className="lesson-list practice-list">
              {allLessons.filter((lesson) => lesson.questions.length).map((lesson, index) => (
                <LessonCard key={lesson.id} lesson={lesson} index={index} completed={completed.includes(lesson.id)} locked={false} onStart={() => startLesson(lesson)} />
              ))}
            </div>
          </section>
        ) : activeLesson ? (
          <section className="quiz-wrap">
            <button className="back-link" onClick={() => setActiveLesson(null)}>← Back to your path</button>
            <div className="quiz-card">
              <div className="quiz-progress"><span style={{ width: `${((questionIndex + 1) / activeLesson.questions.length) * 100}%` }} /></div>
              <div className="quiz-meta"><span>LESSON · {activeLesson.title}</span><span>{questionIndex + 1} / {activeLesson.questions.length}</span></div>
              <div className="quiz-illustration">⌘</div>
              <h1>{currentQuestion.prompt}</h1>
              {currentQuestion.code && <pre className="code-sample"><code>{currentQuestion.code}</code></pre>}
              <div className="answer-list">
                {currentQuestion.options.map((option, index) => (
                  <button key={option} className={`answer-option ${selected === index ? "selected" : ""} ${checked && index === currentQuestion.answer ? "correct" : ""} ${checked && selected === index && index !== currentQuestion.answer ? "incorrect" : ""}`} onClick={() => !checked && setSelected(index)} disabled={checked}>
                    <span>{String.fromCharCode(65 + index)}</span>{option}
                  </button>
                ))}
              </div>
              {feedback && <div className={`feedback ${selected === currentQuestion.answer ? "good" : "try-again"}`}>{feedback}</div>}
              <div className="quiz-actions">
                <button className="text-button" onClick={() => setActiveLesson(null)}>Exit lesson</button>
                <button className="primary-button" disabled={selected === null && !checked} onClick={checked ? nextQuestion : checkAnswer}>{checked ? (questionIndex + 1 === activeLesson.questions.length ? "Finish lesson" : "Continue") : "Check answer"} <span>→</span></button>
              </div>
            </div>
          </section>
        ) : (
          <div className="learning-layout">
            <section className="learning-content">
              <div className="welcome-banner">
                <div><p className="eyebrow">YOUR LEARNING PATH</p><h1>Small steps.<br /><span>Real progress.</span></h1><p>Build your programming brain, one lesson at a time.</p></div>
                <div className="hero-art" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="hero-code">&lt;/&gt;</div><span className="spark spark-one">✦</span><span className="spark spark-two">✧</span><span className="hero-dot" /></div>
              </div>
              <div className="course-heading"><div><p className="eyebrow">START HERE</p><h2>{course.title}</h2><p>{course.subtitle}</p></div><span className="level-pill">LEVEL 01</span></div>
              {course.units.map((unit) => (
                <section className={`unit-section ${unit.color}`} key={unit.id}>
                  <div className="unit-heading"><div className="unit-icon">{unit.id === 1 ? "⌘" : "✳"}</div><div><span>UNIT {String(unit.id).padStart(2, "0")}</span><h3>{unit.title}</h3><p>{unit.description}</p></div><span className="unit-progress">{unit.lessons.filter((lesson) => completed.includes(lesson.id)).length}/{unit.lessons.length}</span></div>
                  <div className="lesson-list">
                    {unit.lessons.map((lesson, index) => {
                      const globalIndex = allLessons.findIndex((item) => item.id === lesson.id);
                      const locked = !lesson.questions.length;
                      return <LessonCard key={lesson.id} lesson={lesson} index={globalIndex} completed={completed.includes(lesson.id)} locked={locked} onStart={() => startLesson(lesson)} />;
                    })}
                  </div>
                </section>
              ))}
            </section>
            <aside className="right-rail">
              <div className="daily-card"><div className="daily-top"><span>✦ DAILY GOAL</span><span className="goal-badge">+20 XP</span></div><h3>You're building a habit.</h3><p>Finish one lesson today to keep your momentum going.</p><div className="goal-track"><span style={{ width: `${Math.min(100, (completedCount % 3) * 33.33)}%` }} /></div><small>{completedCount % 3}/3 lessons this cycle</small></div>
              <div className="tip-card"><div className="tip-icon">☼</div><span className="eyebrow">A LITTLE REMINDER</span><h3>Don't just memorise code. Understand the why.</h3><p>Try changing an example and predicting what happens before you run it.</p></div>
              <div className="quote-card">“The secret of getting ahead is getting started.”<span>— Mark Twain</span></div>
            </aside>
          </div>
        )}
      </main>

      {activeLesson && currentQuestion && null}
      {showWelcome && <div className="modal-backdrop"><div className="welcome-modal"><div className="modal-mark">h</div><p className="eyebrow">WELCOME TO HARULING</p><h2>Your coding journey<br />starts right here.</h2><p>Learn at your own pace. Collect XP. Celebrate every little win.</p><button className="primary-button" onClick={closeWelcome}>Let's begin <span>→</span></button></div></div>}
    </div>
  );
}