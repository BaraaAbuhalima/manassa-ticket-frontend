import { NavLink, Outlet } from 'react-router-dom'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors hover:text-slate-900 ${isActive ? 'text-slate-900' : 'text-slate-500'}`

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <NavLink to="/" className="text-lg font-semibold text-slate-900">
            Jett Ticket Exchange
          </NavLink>
          <nav className="flex items-center gap-6">
            <NavLink to="/browse" className={navLinkClass}>
              Browse
            </NavLink>
            <NavLink to="/sell" className={navLinkClass}>
              Sell a Ticket
            </NavLink>
            <NavLink to="/subscribe" className={navLinkClass}>
              Get Alerts
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-slate-500">
          Jett Ticket Exchange &mdash; buy and sell tickets safely.
        </div>
      </footer>
    </div>
  )
}
