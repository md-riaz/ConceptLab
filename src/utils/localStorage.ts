export interface TopicProgress {
  topicId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  lastVisitedAt: string;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'high-contrast';
  defaultLanguage: 'cpp' | 'java' | 'python' | 'js';
  defaultSpeedMs: number;
  defaultRepresentation: 'bars' | 'tree' | 'graph' | 'text';
}

const PROGRESS_KEY = 'conceptlab-progress';
const SETTINGS_KEY = 'conceptlab-settings';

// Progress management
export function getTopicProgress(topicId: string): TopicProgress | null {
  try {
    const allProgress = getAllProgress();
    return allProgress.find(p => p.topicId === topicId) || null;
  } catch {
    return null;
  }
}

export function getAllProgress(): TopicProgress[] {
  try {
    const data = localStorage.getItem(PROGRESS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function setTopicProgress(progress: TopicProgress): void {
  try {
    const allProgress = getAllProgress();
    const index = allProgress.findIndex(p => p.topicId === progress.topicId);
    
    if (index >= 0) {
      allProgress[index] = progress;
    } else {
      allProgress.push(progress);
    }
    
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(allProgress));
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
}

export function markTopicAsCompleted(topicId: string): void {
  setTopicProgress({
    topicId,
    status: 'completed',
    lastVisitedAt: new Date().toISOString(),
  });
}

export function markTopicAsInProgress(topicId: string): void {
  const existing = getTopicProgress(topicId);
  if (existing?.status !== 'completed') {
    setTopicProgress({
      topicId,
      status: 'in_progress',
      lastVisitedAt: new Date().toISOString(),
    });
  }
}

// Settings management
export function getSettings(): UserSettings {
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    return data ? JSON.parse(data) : getDefaultSettings();
  } catch {
    return getDefaultSettings();
  }
}

export function setSettings(settings: Partial<UserSettings>): void {
  try {
    const current = getSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

export function getDefaultSettings(): UserSettings {
  return {
    theme: 'light',
    defaultLanguage: 'python',
    defaultSpeedMs: 500,
    defaultRepresentation: 'bars',
  };
}

// Theme management
export function applyTheme(theme: UserSettings['theme']): void {
  document.documentElement.setAttribute('data-theme', theme);
  setSettings({ theme });
}

export function initializeTheme(): void {
  const settings = getSettings();
  applyTheme(settings.theme);
}
