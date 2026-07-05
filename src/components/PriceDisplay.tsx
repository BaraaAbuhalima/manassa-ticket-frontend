import { formatCurrency } from '../lib/format'
import type { Language } from '../i18n/translations'

export function PriceDisplay({
  jod,
  usd,
  language,
  size = 'lg',
  align = 'right',
}: {
  jod: number
  usd: number
  language: Language
  size?: 'md' | 'lg'
  align?: 'left' | 'right'
}) {
  const primarySize = size === 'lg' ? 'text-2xl' : 'text-lg'
  return (
    <div className={align === 'right' ? 'text-right' : 'text-left'}>
      <p className={`${primarySize} font-semibold text-slate-900`}>{formatCurrency(jod, language, 'JOD')}</p>
      <p className="text-xs text-slate-500">{formatCurrency(usd, language, 'USD')}</p>
    </div>
  )
}
