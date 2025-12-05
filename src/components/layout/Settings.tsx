import { useState } from 'react';
import { getUserSettings, saveUserSettings, clearAllProgress } from '../../utils/localStorage';
import type { UserSettings } from '../../visualizer/engine/types';

export default function Settings() {
  const [settings, setSettings] = useState<UserSettings>(() => getUserSettings());

  const [showSaveMessage, setShowSaveMessage] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleSave = () => {
    saveUserSettings(settings);
    
    // Apply theme immediately
    document.documentElement.setAttribute('data-theme', settings.theme);
    
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 3000);
  };

  const handleClearProgress = () => {
    clearAllProgress();
    setShowClearConfirm(false);
    alert('All progress has been cleared!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="h1 text-gray-900 dark:text-white mb-2">
          Settings
        </h1>
        <p className="body text-gray-600 dark:text-gray-300">
          Customize your learning experience
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Theme */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="h3 text-gray-900 dark:text-white mb-4">
            Appearance
          </h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="theme" className="block body font-semibold text-gray-900 dark:text-white mb-2">
                Theme
              </label>
              <select
                id="theme"
                value={settings.theme}
                onChange={(e) => setSettings({ ...settings, theme: e.target.value as UserSettings['theme'] })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="light">☀️ Light</option>
                <option value="dark">🌙 Dark</option>
                <option value="high-contrast">🔆 High Contrast</option>
              </select>
              <p className="body-sm text-gray-600 dark:text-gray-400 mt-2">
                Choose a theme that works best for your vision preferences
              </p>
            </div>
          </div>
        </section>

        {/* Visualization Defaults */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="h3 text-gray-900 dark:text-white mb-4">
            Visualization Defaults
          </h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="representation" className="block body font-semibold text-gray-900 dark:text-white mb-2">
                Default Representation
              </label>
              <select
                id="representation"
                value={settings.defaultRepresentation}
                onChange={(e) => setSettings({ ...settings, defaultRepresentation: e.target.value as UserSettings['defaultRepresentation'] })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="bars">📊 Bars (Array Sorting)</option>
                <option value="graph">🕸️ Graph (Nodes & Edges)</option>
                <option value="tree">🌳 Tree (Hierarchical)</option>
                <option value="text">📝 Text Only</option>
              </select>
            </div>

            <div>
              <label htmlFor="speed" className="block body font-semibold text-gray-900 dark:text-white mb-2">
                Default Animation Speed: {settings.defaultSpeedMs}ms
              </label>
              <input
                type="range"
                id="speed"
                min="100"
                max="2000"
                step="100"
                value={settings.defaultSpeedMs}
                onChange={(e) => setSettings({ ...settings, defaultSpeedMs: parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between body-sm text-gray-600 dark:text-gray-400 mt-1">
                <span>Faster (100ms)</span>
                <span>Slower (2000ms)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Code Language */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="h3 text-gray-900 dark:text-white mb-4">
            Code Preferences
          </h2>
          
          <div>
            <label htmlFor="language" className="block body font-semibold text-gray-900 dark:text-white mb-2">
              Preferred Programming Language
            </label>
            <select
              id="language"
              value={settings.defaultLanguage}
              onChange={(e) => setSettings({ ...settings, defaultLanguage: e.target.value as UserSettings['defaultLanguage'] })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="python">🐍 Python</option>
              <option value="java">☕ Java</option>
              <option value="cpp">⚙️ C++</option>
              <option value="js">📜 JavaScript</option>
            </select>
            <p className="body-sm text-gray-600 dark:text-gray-400 mt-2">
              Code examples will be shown in your preferred language when available
            </p>
          </div>
        </section>

        {/* Data Management */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="h3 text-gray-900 dark:text-white mb-4">
            Data Management
          </h2>
          
          <div>
            <p className="body text-gray-700 dark:text-gray-300 mb-4">
              All your progress is stored locally on this device. Clearing progress will reset all topic completions and learning path progress.
            </p>
            
            {!showClearConfirm ? (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="px-6 py-3 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition-colors"
              >
                🗑️ Clear All Progress
              </button>
            ) : (
              <div className="space-y-3">
                <p className="body font-semibold text-red-600 dark:text-red-400">
                  Are you sure? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleClearProgress}
                    className="px-6 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-colors"
                  >
                    Yes, Clear Everything
                  </button>
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="px-6 py-3 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded-full font-semibold hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex items-center gap-4">
        <button
          onClick={handleSave}
          className="px-8 py-3 bg-indigo-500 text-white rounded-full font-semibold hover:bg-indigo-600 transition-colors"
        >
          💾 Save Settings
        </button>
        
        {showSaveMessage && (
          <span className="body text-green-600 dark:text-green-400 font-semibold">
            ✓ Settings saved successfully!
          </span>
        )}
      </div>

      {/* Info */}
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700">
        <p className="body-sm text-blue-900 dark:text-blue-100">
          <strong>Note:</strong> Settings are stored locally in your browser. They won't sync across devices.
        </p>
      </div>
    </div>
  );
}
