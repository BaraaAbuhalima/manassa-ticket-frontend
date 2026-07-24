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
  // Omit when there's no USD equivalent to show (e.g. the seller's raw asking price on the
  // manage-ticket page, which has no fee-inclusive USD total from the backend).
  usd?: number
  language: Language
  size?: 'md' | 'lg'
  align?: 'left' | 'right'
}) {
  const primarySize = size === 'lg' ? 'text-2xl' : 'text-lg'
  return (
    <div className={align === 'right' ? 'text-right' : 'text-left'}>
      <p className={`${primarySize} font-semibold text-slate-900`}>{formatCurrency(jod, language, 'JOD')}</p>
      {usd !== undefined && <p className="text-xs text-slate-500">{formatCurrency(usd, language, 'USD')}</p>}
    </div>
  )
}
