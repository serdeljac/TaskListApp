
//Array of items for the sidebar
const NAVIGATION_ITEMS = [
    { label: 'Dashboard', icon: '▦', active: true },
    { label: 'My Tasks', icon: '☑', active: false },
    { label: 'Weekly Goals', icon: '◎', active: false },
    { label: 'Calendar', icon: '▤', active: false },
    { label: 'Reports', icon: '▥', active: false },
    { label: 'Notes', icon: '✎', active: false },
]

function Sidebar() {
    return (
        <aside className="sidebar">

            {/* Sidebar Header */}
            <div className="sidebar__brand">
                <span className="sidebar__logo">◆</span>
                <span className="sidebar__brand-name">FocusDo</span>
            </div>

            <nav className="sidebar__nav">
                {NAVIGATION_ITEMS.map(o => (
                    <a key={o.label} href="#" className={`sidebar__link ${o.active ? 'sidebar__link--active' : ''}`}>
                        <span className="sidebar__link-icon">{o.icon}</span>{o.label}
                    </a>
                ))}
            </nav>

            <div className="sidebar__footer">
                <div className="sidebar__theme">☀ Light Mode</div>
                <div className="sidebar__user">
                <span className="sidebar__avatar">UN</span>
                <span className="sidebar__user-name">USER NAME</span>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar