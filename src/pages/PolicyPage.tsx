import { Link } from 'react-router-dom'
import PolicySection from '../components/PolicySection'
import { useLanguage } from '../i18n/LanguageContext'

export default function PolicyPage() {
  const { t } = useLanguage()

  return (
    <div className="mx-auto max-w-3xl">
      <Link to="/" className="text-sm text-slate-500 hover:text-slate-900">
        {t('common.backToHome')}
      </Link>
      <div className="mt-6">
        <PolicySection />
      </div>
    </div>
  )
}
