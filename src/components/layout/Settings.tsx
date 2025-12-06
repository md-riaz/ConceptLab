import { useState } from 'react';
import { getUserSettings, saveUserSettings, clearAllProgress } from '../../utils/localStorage';
import type { UserSettings } from '../../visualizer/engine/types';
import { Button, Card } from '../common';

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
        <h1 className="h1 text-text-primary mb-2">
          Settings
        </h1>
        <p className="body text-text-secondary">
          Customize your learning experience
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Theme */}
        <Card padding="lg">
          <h2 className="h3 text-text-primary mb-4">
            Appearance
          </h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="theme" className="block body font-semibold text-text-primary mb-2">
                Theme
              </label>
              <select
                id="theme"
                value={settings.theme}
                onChange={(e) => setSettings({ ...settings, theme: e.target.value as UserSettings['theme'] })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500/50"
              >
                <option value="light">☀️ Light</option>
                <option value="dark">🌙 Dark</option>
                <option value="high-contrast">🔆 High Contrast</option>
              </select>
              <p className="body-sm text-text-secondary mt-2">
                Choose a theme that works best for your vision preferences
              </p>
            </div>
          </div>
        </Card>

        {/* Visualization Defaults */}
        <Card padding="lg">
          <h2 className="h3 text-text-primary mb-4">
            Visualization Defaults
          </h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="representation" className="block body font-semibold text-text-primary mb-2">
                Default Representation
              </label>
              <select
                id="representation"
                value={settings.defaultRepresentation}
                onChange={(e) => setSettings({ ...settings, defaultRepresentation: e.target.value as UserSettings['defaultRepresentation'] })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500/50"
              >
                <option value="bars">📊 Bars (Array Sorting)</option>
                <option value="graph">🕸️ Graph (Nodes & Edges)</option>
                <option value="tree">🌳 Tree (Hierarchical)</option>
                <option value="text">📝 Text Only</option>
              </select>
            </div>

            <div>
              <label htmlFor="speed" className="block body font-semibold text-text-primary mb-2">
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
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary-500/50"
              />
              <div className="flex justify-between body-sm text-text-secondary mt-1">
                <span>Faster (100ms)</span>
                <span>Slower (2000ms)</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Code Language */}
        <Card padding="lg">
          <h2 className="h3 text-text-primary mb-4">
            Code Preferences
          </h2>
          
          <div>
            <label htmlFor="language" className="block body font-semibold text-text-primary mb-2">
              Preferred Programming Language
            </label>
            <select
              id="language"
              value={settings.defaultLanguage}
              onChange={(e) => setSettings({ ...settings, defaultLanguage: e.target.value as UserSettings['defaultLanguage'] })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            >
              <option value="python">🐍 Python</option>
              <option value="java">☕ Java</option>
              <option value="cpp">⚙️ C++</option>
              <option value="js">📜 JavaScript</option>
            </select>
            <p className="body-sm text-text-secondary mt-2">
              Code examples will be shown in your preferred language when available
            </p>
          </div>
        </Card>

        {/* Data Management */}
        <Card padding="lg">
          <h2 className="h3 text-text-primary mb-4">
            Data Management
          </h2>
          
          <div>
            <p className="body text-text-primary mb-4">
              All your progress is stored locally on this device. Clearing progress will reset all topic completions and learning path progress.
            </p>
            
            {!showClearConfirm ? (
              <Button
                onClick={() => setShowClearConfirm(true)}
                className="bg-red-500 hover:bg-red-600"
              >
                🗑️ Clear All Progress
              </Button>
            ) : (
              <div className="space-y-3">
                <p className="body font-semibold text-red-500">
                  Are you sure? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <Button
                    onClick={handleClearProgress}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Yes, Clear Everything
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setShowClearConfirm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex items-center gap-4">
        <Button
          onClick={handleSave}
          variant="primary"
          size="lg"
        >
          💾 Save Settings
        </Button>
        
        {showSaveMessage && (
          <span className="body text-green-500 font-semibold">
            ✓ Settings saved successfully!
          </span>
        )}
      </div>

      {/* Info */}
      <Card padding="md" className="mt-8 bg-primary-100">
        <p className="body-sm text-text-primary">
          <strong>Note:</strong> Settings are stored locally in your browser. They won't sync across devices.
        </p>
      </Card>
    </div>
  );
}
