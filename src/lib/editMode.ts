/**
 * The source design exposed `loggedIn` as a canvas prop defaulting to true, so
 * the artboard could show its add/edit affordances. A deployed portfolio has no
 * auth behind it, so edit mode is opt-in via `?edit=1` and off for visitors.
 *
 * Edits live in React state only — nothing is persisted or sent anywhere.
 */
export function isEditMode(): boolean {
  try {
    return new URLSearchParams(window.location.search).get('edit') === '1';
  } catch {
    return false;
  }
}
