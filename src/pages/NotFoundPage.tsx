import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold text-slate-900">Page not found</h1>
      <p className="mt-2 text-slate-600">
        <Link to="/" className="underline">
          Go back home
        </Link>
      </p>
    </div>
  )
}
