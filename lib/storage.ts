import { StorageData, Assessment } from './types';

const STORAGE_KEY = 'es_assessment';
const STORAGE_VERSION = 1;

/**
 * Get all data from localStorage
 */
export function getStorageData(): StorageData {
  if (typeof window === 'undefined') {
    return {
      version: STORAGE_VERSION,
      assessments: [],
    };
  }

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return {
        version: STORAGE_VERSION,
        assessments: [],
      };
    }
    const parsed = JSON.parse(data) as StorageData;
    
    // Handle version migrations if needed
    if (parsed.version !== STORAGE_VERSION) {
      // Migration logic here if version changes
      return {
        version: STORAGE_VERSION,
        assessments: parsed.assessments || [],
      };
    }
    
    return parsed;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return {
      version: STORAGE_VERSION,
      assessments: [],
    };
  }
}

/**
 * Save all data to localStorage
 */
export function setStorageData(data: StorageData): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
}

/**
 * Save a completed assessment
 */
export function saveAssessment(assessment: Assessment): void {
  const data = getStorageData();
  data.assessments.push(assessment);
  // Keep only the last 10 assessments
  if (data.assessments.length > 10) {
    data.assessments = data.assessments.slice(-10);
  }
  setStorageData(data);
}

/**
 * Get the most recent assessment
 */
export function getLatestAssessment(): Assessment | null {
  const data = getStorageData();
  if (data.assessments.length === 0) return null;
  return data.assessments[data.assessments.length - 1];
}

/**
 * Get all assessments
 */
export function getAllAssessments(): Assessment[] {
  const data = getStorageData();
  return data.assessments;
}

/**
 * Save draft answers (in progress)
 */
export function saveDraft(answers: Record<string, string | number>): void {
  const data = getStorageData();
  data.currentDraft = {
    answers,
    lastUpdated: Date.now(),
  };
  setStorageData(data);
}

/**
 * Get draft answers
 */
export function getDraft(): Record<string, string | number> | null {
  const data = getStorageData();
  if (!data.currentDraft) return null;
  return data.currentDraft.answers;
}

/**
 * Clear draft
 */
export function clearDraft(): void {
  const data = getStorageData();
  delete data.currentDraft;
  setStorageData(data);
}

/**
 * Clear all data
 */
export function clearAllData(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}



