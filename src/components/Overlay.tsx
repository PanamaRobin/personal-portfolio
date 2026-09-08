import type { ReactNode } from 'react';
import { useOverlay } from '../lib/hooks';

type OverlayProps = {
  onClose: () => void;
  className?: string;
  panelClassName: string;
  labelledBy: string;
  children: ReactNode;
};

/**
 * Backdrop + panel shell shared by the project detail, diploma lightbox and
 * edit modal. Clicking the backdrop or pressing Escape closes it.
 */
export function Overlay({
  onClose,
  className = '',
  panelClassName,
  labelledBy,
  children,
}: OverlayProps) {
  useOverlay(true, onClose);

  return (
    <div
      className={`overlay ${className}`.trim()}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      onClick={onClose}
    >
      <div className={panelClassName} onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
