import type { PageHeaderTypes } from '../types/types'

function PageHeader({ title, subtitle, actionLabel, onAction }: PageHeaderTypes) {
    return (
        <header className="page-header">
        <div>
            <h1 className="page-header__title">{title}</h1>
            {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
        </div>
        {actionLabel && (
            <button className="btn btn--primary" type="button" onClick={onAction}>{actionLabel}</button>
        )}
        </header>
    )
}

export default PageHeader
