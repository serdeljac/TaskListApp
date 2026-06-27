import { NavLink } from 'react-router-dom'

//Array of items for the sidebar
const NAVIGATION_ITEMS = [
    { label: 'Dashboard', icon: '▦', to: '/' },
    { label: 'My Tasks', icon: '☑', to: '/tasks' },
    { label: 'Weekly Goals', icon: '◎', to: '/goals' },
    { label: 'Calendar', icon: '▤', to: '/calendar' },
    { label: 'Reports', icon: '▥', to: '/reports' },
    { label: 'Notes', icon: '✎', to: '/notes' },
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
                    <NavLink key={o.label} to={o.to} end={o.to === '/'} className={({ isActive }) =>
                        `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}>
                    <span className="sidebar__link-icon">{o.icon}</span>
                    {o.label}
                    </NavLink>
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