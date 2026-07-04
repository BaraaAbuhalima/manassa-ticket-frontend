import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

export default function NotFoundPage() {
  const { t } = useLanguage()

  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold text-slate-900">{t('notFound.title')}</h1>
      <p className="mt-2 text-slate-600">{t('notFound.description')}</p>
      <p className="mt-2 text-slate-600">
        <Link to="/" className="underline">
          {t('notFound.goHome')}
        </Link>
      </p>
    </div>
  )
}
