function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar__greeting">
        <h1 className="topbar__title">Good morning, User! 👋</h1>
        <p className="topbar__subtitle">Here's what's on your plate today.</p>
      </div>

      <div className="topbar__actions">
        <div className="topbar__date">📅 May 13 – May 19, 2024</div>
        <button className="btn btn--primary" type="button">+ New Task</button>
      </div>
    </header>
  )
}

export default Topbar
