import { useState } from 'react';
import { getSettings, applyTheme, type UserSettings } from '../../utils/localStorage';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<UserSettings['theme']>(() => {
    const settings = getSettings();
    return settings.theme;
  });

  const handleThemeChange = (newTheme: UserSettings['theme']) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={theme}
        onChange={(e) => handleThemeChange(e.target.value as UserSettings['theme'])}
        className="body-sm px-3 py-2 bg-bg-surface text-text-primary border border-gray-200 rounded-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500/50"
        aria-label="Select theme"
      >
        <option value="light">☀️ Light</option>
        <option value="dark">🌙 Dark</option>
        <option value="high-contrast">🔆 High Contrast</option>
      </select>
    </div>
  );
}
