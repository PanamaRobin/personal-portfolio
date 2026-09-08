import { useCallback, useMemo, useState } from 'react';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { DiplomaLightbox } from './components/DiplomaLightbox';
import { Education } from './components/Education';
import { EditModal } from './components/EditModal';
import type { Draft, EditKind, ModalState } from './components/EditModal';
import { emptyProject, emptyStudy, emptyWork } from './components/EditModal';
import { Experience } from './components/Experience';
import { Files } from './components/Files';
import { Hero } from './components/Hero';
import { Nav } from './components/Nav';
import { ProjectDetail } from './components/ProjectDetail';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Stats } from './components/Stats';
import { initialProjects, initialStudies, initialWork } from './data/portfolio';
import type { Project, Study, Work } from './data/types';
import { isEditMode } from './lib/editMode';
import { useLang, useTheme } from './lib/hooks';
import { LangContext, makeTranslate } from './lib/i18n';

type DiplomaState = { title: string; file: string };

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang } = useLang();
  const t = useMemo(() => makeTranslate(lang), [lang]);
  const editable = useMemo(() => isEditMode(), []);

  const [work, setWork] = useState<Work[]>(initialWork);
  const [studies, setStudies] = useState<Study[]>(initialStudies);
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const [projectView, setProjectView] = useState<number | null>(null);
  const [slide, setSlide] = useState(0);
  const [diploma, setDiploma] = useState<DiplomaState | null>(null);
  const [modal, setModal] = useState<ModalState | null>(null);

  // ---- Project detail ----
  const openProject = useCallback((index: number) => {
    setProjectView(index);
    setSlide(0);
  }, []);
  const closeProject = useCallback(() => setProjectView(null), []);

  const activeProject = projectView !== null ? projects[projectView] : null;
  const shotCount = activeProject ? activeProject.shots.length : 0;

  const nextSlide = useCallback(() => {
    setSlide((current) => (shotCount ? (current + 1) % shotCount : 0));
  }, [shotCount]);
  const prevSlide = useCallback(() => {
    setSlide((current) => (shotCount ? (current - 1 + shotCount) % shotCount : 0));
  }, [shotCount]);

  // ---- Edit modal ----
  const openEdit = useCallback(
    (kind: EditKind, index: number | null) => {
      let draft: Draft;

      if (kind === 'work') {
        draft = {
          kind,
          value: index === null ? { ...emptyWork } : { ...work[index], tags: [...work[index].tags] },
        };
      } else if (kind === 'study') {
        draft = { kind, value: index === null ? { ...emptyStudy } : { ...studies[index] } };
      } else {
        draft = {
          kind,
          value:
            index === null
              ? { ...emptyProject }
              : {
                  ...projects[index],
                  tags: [...projects[index].tags],
                  shots: [...projects[index].shots],
                },
        };
      }

      setModal({ kind, index, draft });
    },
    [work, studies, projects],
  );

  const closeModal = useCallback(() => setModal(null), []);

  const saveModal = useCallback(() => {
    if (!modal) return;
    const { kind, index, draft } = modal;

    const commit = <T,>(list: T[], value: T) =>
      index === null ? [...list, value] : list.map((item, i) => (i === index ? value : item));

    if (draft.kind === 'work') setWork((list) => commit(list, draft.value));
    if (draft.kind === 'study') setStudies((list) => commit(list, draft.value));
    if (draft.kind === 'project') setProjects((list) => commit(list, draft.value));

    // Guards against the detail view pointing past the end of a shortened list.
    if (kind === 'project') setProjectView(null);
    setModal(null);
  }, [modal]);

  const deleteItem = useCallback(() => {
    if (!modal || modal.index === null) {
      setModal(null);
      return;
    }

    const { kind, index } = modal;
    const without = <T,>(list: T[]) => list.filter((_, i) => i !== index);

    if (kind === 'work') setWork(without);
    if (kind === 'study') setStudies(without);
    if (kind === 'project') {
      setProjects(without);
      setProjectView(null);
    }

    setModal(null);
  }, [modal]);

  const setDraft = useCallback((draft: Draft) => {
    setModal((current) => (current ? { ...current, draft } : current));
  }, []);

  return (
    <LangContext.Provider value={{ lang, t }}>
      <div className="app">
        <Nav theme={theme} onToggleTheme={toggleTheme} onSetLang={setLang} />

        <main>
          <Hero />
          <Stats />
          <About />
          <Experience
            work={work}
            editable={editable}
            onAdd={() => openEdit('work', null)}
            onEdit={(index) => openEdit('work', index)}
          />
          <Education
            studies={studies}
            editable={editable}
            onAdd={() => openEdit('study', null)}
            onEdit={(index) => openEdit('study', index)}
            onShowDiploma={(study) => setDiploma({ title: study.title, file: study.diploma })}
          />
          <Skills />
          <Projects
            projects={projects}
            editable={editable}
            onAdd={() => openEdit('project', null)}
            onEdit={(index) => openEdit('project', index)}
            onOpen={openProject}
          />
          <Files editable={editable} />
          <Contact />
        </main>

        {activeProject ? (
          <ProjectDetail
            project={activeProject}
            slide={slide}
            onSlide={setSlide}
            onPrev={prevSlide}
            onNext={nextSlide}
            onClose={closeProject}
          />
        ) : null}

        {diploma ? (
          <DiplomaLightbox
            title={diploma.title}
            file={diploma.file}
            onClose={() => setDiploma(null)}
          />
        ) : null}

        {modal ? (
          <EditModal
            state={modal}
            onChange={setDraft}
            onSave={saveModal}
            onDelete={deleteItem}
            onClose={closeModal}
          />
        ) : null}
      </div>
    </LangContext.Provider>
  );
}
