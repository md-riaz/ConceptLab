import { useState, useEffect } from 'react';
import { getSettings, applyTheme, type UserSettings } from '../../utils/localStorage';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<UserSettings['theme']>('light');

  useEffect(() => {
    const settings = getSettings();
    setTheme(settings.theme);
  }, []);

  const handleThemeChange = (newTheme: UserSettings['theme']) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={theme}
        onChange={(e) => handleThemeChange(e.target.value as UserSettings['theme'])}
        className="body-sm"
        style={{
          padding: 'var(--space-2) var(--space-3)',
          backgroundColor: 'var(--color-bg-surface)',
          color: 'var(--color-text-primary)',
          border: '1px solid var(--color-border-subtle)',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer',
        }}
        aria-label="Select theme"
      >
        <option value="light">☀️ Light</option>
        <option value="dark">🌙 Dark</option>
        <option value="high-contrast">🔆 High Contrast</option>
      </select>
    </div>
  );
}
