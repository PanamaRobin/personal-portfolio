import type { ChangeEvent } from 'react';
import type { Project, Study, Work } from '../data/types';
import { useI18n } from '../lib/i18n';
import { CloseIcon, DropDownloadIcon, ImageIcon } from './icons';
import { Overlay } from './Overlay';

export type EditKind = 'work' | 'study' | 'project';

export type Draft =
  | { kind: 'work'; value: Work }
  | { kind: 'study'; value: Study }
  | { kind: 'project'; value: Project };

export type ModalState = {
  kind: EditKind;
  /** null when adding a new entry. */
  index: number | null;
  draft: Draft;
};

export const emptyWork: Work = {
  role: '',
  company: '',
  loc: '',
  period: '',
  current: false,
  desc: '',
  tags: [],
};

export const emptyStudy: Study = { period: '', title: '', org: '', desc: '', diploma: '' };

export const emptyProject: Project = {
  title: '',
  year: '',
  accent: false,
  desc: '',
  url: '',
  tags: [],
  role: '',
  period: '',
  overview: '',
  shots: [],
};

const MODAL_TITLES: Record<EditKind, { add: string; edit: string }> = {
  work: { add: 'Add experience', edit: 'Edit experience' },
  study: { add: 'Add study', edit: 'Edit study' },
  project: { add: 'Add project', edit: 'Edit project' },
};

function parseList(value: string): string[] {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

type FieldProps = {
  label: string;
  value: string;
  placeholder?: string;
  rows?: number;
  onChange: (value: string) => void;
};

function Field({ label, value, placeholder, rows, onChange }: FieldProps) {
  const handle = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onChange(event.target.value);

  return (
    <label className="field">
      <span className="field__label">{label}</span>
      {rows ? (
        <textarea value={value} rows={rows} placeholder={placeholder} onChange={handle} />
      ) : (
        <input type="text" value={value} placeholder={placeholder} onChange={handle} />
      )}
    </label>
  );
}

type EditModalProps = {
  state: ModalState;
  onChange: (draft: Draft) => void;
  onSave: () => void;
  onDelete: () => void;
  onClose: () => void;
};

export function EditModal({ state, onChange, onSave, onDelete, onClose }: EditModalProps) {
  const { t } = useI18n();
  const { kind, index, draft } = state;
  const titles = MODAL_TITLES[kind];
  const title = index === null ? titles.add : titles.edit;

  // The form itself is authoring UI, so its chrome stays in English —
  // matching the source design, which flagged this modal `data-no-i18n`.
  // One patcher per draft kind keeps the union narrow and cast-free.
  const patchWork = (fields: Partial<Work>) => {
    if (draft.kind !== 'work') return;
    onChange({ kind: 'work', value: { ...draft.value, ...fields } });
  };
  const patchStudy = (fields: Partial<Study>) => {
    if (draft.kind !== 'study') return;
    onChange({ kind: 'study', value: { ...draft.value, ...fields } });
  };
  const patchProject = (fields: Partial<Project>) => {
    if (draft.kind !== 'project') return;
    onChange({ kind: 'project', value: { ...draft.value, ...fields } });
  };

  return (
    <Overlay
      onClose={onClose}
      className="overlay--modal"
      panelClassName="overlay__panel overlay__panel--modal"
      labelledBy="edit-modal-title"
    >
      <div className="overlay__bar overlay__bar--tall">
        <div className="modal__title" id="edit-modal-title">
          {t(title)}
        </div>
        <button
          type="button"
          className="icon-btn icon-btn--lg"
          aria-label={t('Close')}
          onClick={onClose}
        >
          <CloseIcon size={16} />
        </button>
      </div>

      <div className="modal__body">
        {draft.kind === 'work' ? (
          <>
            <Field
              label="Role / title"
              value={draft.value.role}
              placeholder="Senior Software Engineer"
              onChange={(role) => patchWork({ role })}
            />
            <div className="field-pair">
              <Field
                label="Company"
                value={draft.value.company}
                onChange={(company) => patchWork({ company })}
              />
              <Field
                label="Location"
                value={draft.value.loc}
                onChange={(loc) => patchWork({ loc })}
              />
            </div>
            <Field
              label="Period"
              value={draft.value.period}
              placeholder="2023 — Present"
              onChange={(period) => patchWork({ period })}
            />
            <label className="field--check">
              <input
                type="checkbox"
                checked={draft.value.current}
                onChange={(event) => patchWork({ current: event.target.checked })}
              />
              <span>Current role</span>
            </label>
            <Field
              label="Description"
              value={draft.value.desc}
              rows={4}
              onChange={(desc) => patchWork({ desc })}
            />
            <Field
              label="Tags (comma separated)"
              value={draft.value.tags.join(', ')}
              placeholder="Angular, TypeScript, AWS"
              onChange={(value) => patchWork({ tags: parseList(value) })}
            />
          </>
        ) : null}

        {draft.kind === 'study' ? (
          <>
            <Field
              label="Title"
              value={draft.value.title}
              placeholder="B.Sc. Software Engineering"
              onChange={(title_) => patchStudy({ title: title_ })}
            />
            <Field
              label="Institution"
              value={draft.value.org}
              onChange={(org) => patchStudy({ org })}
            />
            <Field
              label="Period"
              value={draft.value.period}
              placeholder="2014 — 2019"
              onChange={(period) => patchStudy({ period })}
            />
            <Field
              label="Description"
              value={draft.value.desc}
              rows={3}
              onChange={(desc) => patchStudy({ desc })}
            />
            <Field
              label="Diploma / certificate file"
              value={draft.value.diploma}
              placeholder="bsc-diploma.pdf — leave empty for none"
              onChange={(diploma) => patchStudy({ diploma })}
            />
            <div className="attach-hint">
              <DropDownloadIcon />
              <span>
                Drop a PDF or image here to attach the diploma. With a file attached, the card shows
                a “Show diploma” button.
              </span>
            </div>
          </>
        ) : null}

        {draft.kind === 'project' ? (
          <>
            <div className="field-pair field-pair--wide">
              <Field
                label="Project name"
                value={draft.value.title}
                placeholder="Voyager"
                onChange={(title_) => patchProject({ title: title_ })}
              />
              <Field
                label="Year"
                value={draft.value.year}
                placeholder="2025"
                onChange={(year) => patchProject({ year })}
              />
            </div>
            <Field
              label="Short description (card)"
              value={draft.value.desc}
              rows={2}
              onChange={(desc) => patchProject({ desc })}
            />
            <div className="field-pair">
              <Field
                label="Your role"
                value={draft.value.role}
                onChange={(role) => patchProject({ role })}
              />
              <Field
                label="When"
                value={draft.value.period}
                placeholder="2025 · 4 months"
                onChange={(period) => patchProject({ period })}
              />
            </div>
            <Field
              label="Project URL (optional)"
              value={draft.value.url ?? ''}
              placeholder="https://voyager.example.com"
              onChange={(url) => patchProject({ url })}
            />
            <Field
              label="Overview (detail page)"
              value={draft.value.overview}
              rows={4}
              onChange={(overview) => patchProject({ overview })}
            />
            <Field
              label="Stack tags (comma separated)"
              value={draft.value.tags.join(', ')}
              placeholder="Angular, Python, AWS"
              onChange={(value) => patchProject({ tags: parseList(value) })}
            />
            <Field
              label="Screenshot labels (comma separated)"
              value={draft.value.shots.join(', ')}
              placeholder="Dashboard, Detail view, Settings"
              onChange={(value) => patchProject({ shots: parseList(value) })}
            />
            <div className="attach-hint">
              <ImageIcon />
              <span>Drag screenshot images here to attach them.</span>
            </div>
          </>
        ) : null}
      </div>

      <div className="modal__foot">
        {index !== null ? (
          <button type="button" className="modal__delete" onClick={onDelete}>
            {t('Delete')}
          </button>
        ) : null}
        <div className="modal__foot-actions">
          <button type="button" className="btn btn--outline btn--sm" onClick={onClose}>
            {t('Cancel')}
          </button>
          <button type="button" className="btn btn--accent btn--sm card-hover" onClick={onSave}>
            {t('Save')}
          </button>
        </div>
      </div>
    </Overlay>
  );
}
