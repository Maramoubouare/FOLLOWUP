const BASE_URL = 'http://localhost:8000/api';

const STORAGE_KEY = 'followup_mock_suivis';

const getDefaultSuivis = () => ({});

const loadMockSuivis = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : getDefaultSuivis();
  } catch {
    return getDefaultSuivis();
  }
};

const saveMockSuivis = (suivis) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(suivis));
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const checkIncidentExists = (id) => {
  try {
    const incidents = JSON.parse(localStorage.getItem('followup_mock_incidents') || '[]');
    
    if (incidents.length === 0 && String(id) === '1') return true; 
    return incidents.some(inc => String(inc.id) === String(id));
  } catch {
    return false;
  }
};

export const getSuivis = async (incidentId) => {
  try {
    if (isNaN(Number(incidentId)) || Number(incidentId) <= 0) {
      return { success: false, message: 'ID incident invalide' };
    }

    const response = await fetch(`${BASE_URL}/incidents/${incidentId}/suivis`);
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    return data;
  } catch {
    await delay(300);
    
    if (!checkIncidentExists(incidentId)) {
      return { success: false, message: `Incident avec l'ID ${incidentId} introuvable` };
    }

    const allSuivis = loadMockSuivis();
    const suivis = allSuivis[incidentId] || [];
    return { success: true, count: suivis.length, data: suivis };
  }
};

export const getAllSuivis = async () => {
  try {
    const response = await fetch(`${BASE_URL}/suivis`);
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    return data;
  } catch {
    await delay(300);
    const allSuivis = loadMockSuivis();
    const flatSuivis = Object.values(allSuivis).flat().sort((a, b) => new Date(b.createdAt || b.dateAction) - new Date(a.createdAt || a.dateAction));
    return { success: true, count: flatSuivis.length, data: flatSuivis };
  }
};

export const addSuivi = async (incidentId, suiviData) => {
  try {
    if (isNaN(Number(incidentId)) || Number(incidentId) <= 0) {
      return { success: false, message: 'ID incident invalide' };
    }

    const response = await fetch(`${BASE_URL}/incidents/${incidentId}/suivis`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(suiviData),
    });
    if (!response.ok) throw new Error('Failed to create');
    const data = await response.json();
    return data;
  } catch {
    await delay(400);

    if (!checkIncidentExists(incidentId)) {
      return { success: false, message: `Incident avec l'ID ${incidentId} introuvable` };
    }

    const allSuivis = loadMockSuivis();
    const newSuivi = {
      ...suiviData,
      id: Date.now(),
      incidentId: Number(incidentId),
      dateAction: suiviData.dateAction || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
    };
    if (!allSuivis[incidentId]) allSuivis[incidentId] = [];
    allSuivis[incidentId].unshift(newSuivi);
    saveMockSuivis(allSuivis);
    return { success: true, message: 'Suivi ajouté avec succès', data: newSuivi };
  }
};

export const deleteSuivi = async (incidentId, suiviId) => {
  try {
    const response = await fetch(`${BASE_URL}/incidents/${incidentId}/suivis/${suiviId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete');
    const data = await response.json();
    return data;
  } catch {
    await delay(300);
    const allSuivis = loadMockSuivis();
    if (allSuivis[incidentId]) {
      allSuivis[incidentId] = allSuivis[incidentId].filter(s => String(s.id) !== String(suiviId));
      saveMockSuivis(allSuivis);
    }
    return { success: true, message: 'Suivi supprimé avec succès' };
  }
};

