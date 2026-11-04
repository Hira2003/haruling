const navItems = [
  { id: "learn", icon: "⌂", label: "Learn" },
  { id: "practice", icon: "✳", label: "Practice" },
  { id: "profile", icon: "♡", label: "Profile" }
];

export default function Sidebar({ active = "learn", onNavigate }) {
  return (
    <aside className="sidebar">
      <a className="brand" href="#" onClick={(event) => { event.preventDefault(); onNavigate("learn"); }}>
        <span className="brand-mark">h</span><span>haru<span className="brand-light">ling</span></span>
      </a>
      <div className="sidebar-label">YOUR SPACE</div>
      <nav className="side-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <button key={item.id} className={`nav-item ${active === item.id ? "active" : ""}`} onClick={() => onNavigate(item.id)}>
            <span className="nav-icon">{item.icon}</span><span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="mini-mascot">✦</div>
        <strong>Little steps.<br />Big skills.</strong>
        <p>Every expert was once a beginner.</p>
      </div>
      <div className="sidebar-footer">Made with ♡ for curious minds</div>
    </aside>
  );
}