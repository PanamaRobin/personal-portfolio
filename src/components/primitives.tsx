import type { ReactNode } from 'react';
import { useI18n } from '../lib/i18n';

/** The numbered "01 / About" rail that opens every section. */
export function SectionRail({ num, label, children }: { num: string; label: string; children?: ReactNode }) {
  const { t } = useI18n();
  return (
    <div>
      <div className="section-rail">
        {num}
        <br />
        <strong>{t(label)}</strong>
      </div>
      {children}
    </div>
  );
}

/** A heading whose trailing period is painted in the accent colour. */
export function AccentTitle({ text, className = 'section-title' }: { text: string; className?: string }) {
  const { t } = useI18n();
  return (
    <h2 className={className}>
      {t(text)}
      <span className="accent-dot">.</span>
    </h2>
  );
}

export function ChipRow({
  items,
  variant = '',
  tight = false,
}: {
  items: string[];
  variant?: string;
  tight?: boolean;
}) {
  if (items.length === 0) return null;
  return (
    <div className={tight ? 'chip-row chip-row--tight' : 'chip-row'}>
      {items.map((item) => (
        <span key={item} className={`chip ${variant}`.trim()}>
          {item}
        </span>
      ))}
    </div>
  );
}

export function Eyebrow({ text }: { text: string }) {
  const { t } = useI18n();
  return <div className="eyebrow">{t(text)}</div>;
}
