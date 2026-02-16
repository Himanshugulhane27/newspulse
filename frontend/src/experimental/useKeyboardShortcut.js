import { useEffect } from 'react';
// keyboard shortcut hook
// idea: Ctrl+K for search, Ctrl+B for bookmarks, etc
function useKeyboardShortcut(key, callback, modifiers = { ctrl: false, shift: false }) {
  useEffect(() => {
    const handler = (e) => {
      if (modifiers.ctrl && !e.ctrlKey && !e.metaKey) return;
      if (modifiers.shift && !e.shiftKey) return;
      if (e.key.toLowerCase() === key.toLowerCase()) {
        e.preventDefault();
        callback(e);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [key, callback, modifiers.ctrl, modifiers.shift]);
}
export default useKeyboardShortcut;
