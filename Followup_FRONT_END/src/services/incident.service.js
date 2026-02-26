const BASE_URL = 'http://localhost:8000/api';


const STORAGE_KEY = 'followup_mock_incidents';

const getDefaultIncidents = () => [
  { 
    id: 1, 
    dateIncident: '2023-11-20', 
    heureIncident: '14:30', 
    gravite: 'Critical', 
    description: "Migration d'électrode détectée.", 
    idPatient: 'P-992', 
    statut: 'Ouvert', 
    idMedecin: 'Dr. Martin', 
    idImplant: 'IMP-7721', 
    idProcesseur: 'PROC-11' 
  }
];

const loadMockIncidents = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : getDefaultIncidents();
  } catch {
    return getDefaultIncidents();
  }
};

const saveMockIncidents = (incidents) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(incidents));
};

let MOCK_INCIDENTS = loadMockIncidents();

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getIncidents = async (page, rowsPerPage) => {
  try {
    const response = await fetch(`${BASE_URL}/incidents?page=${page}&limit=${rowsPerPage}`);
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    return data;
  } catch {
    await delay(300);
    MOCK_INCIDENTS = loadMockIncidents();
    const start = (page - 1) * rowsPerPage;
    const paged = MOCK_INCIDENTS.slice(start, start + rowsPerPage);
    return {
      body: {
        incidents: paged,
        totalIncidents: MOCK_INCIDENTS.length,
        total_pages: Math.ceil(MOCK_INCIDENTS.length / rowsPerPage) || 1,
      }
    };
  }
};

export const getIncidentById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/incidents/${id}`);
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    return data;
  } catch {
    await delay(200);
    MOCK_INCIDENTS = loadMockIncidents();
    return MOCK_INCIDENTS.find(i => i.id === id) || null;
  }
};

export const createIncident = async (incidentData) => {
  try {
    const response = await fetch(`${BASE_URL}/incidents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(incidentData),
    });
    if (!response.ok) throw new Error('Failed to create');
    const data = await response.json();
    return data;
  } catch {
    await delay(400);
    MOCK_INCIDENTS = loadMockIncidents();
    const newIncident = { ...incidentData, id: Date.now() };
    MOCK_INCIDENTS = [newIncident, ...MOCK_INCIDENTS];
    saveMockIncidents(MOCK_INCIDENTS);
    return { body: { incident: newIncident } };
  }
};

export const updateIncident = async (id, incidentData) => {
  try {
    const response = await fetch(`${BASE_URL}/incidents/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(incidentData),
    });
    if (!response.ok) throw new Error('Failed to update');
    const data = await response.json();
    return data;
  } catch {
    await delay(400);
    MOCK_INCIDENTS = loadMockIncidents();
    MOCK_INCIDENTS = MOCK_INCIDENTS.map(inc => inc.id === id ? { ...inc, ...incidentData } : inc);
    saveMockIncidents(MOCK_INCIDENTS);
    return { body: { incident: { id, ...incidentData } } };
  }
};

export const deleteIncident = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/incidents/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete');
    const data = await response.json();
    return data;
  } catch {
    await delay(300);
  
    MOCK_INCIDENTS = loadMockIncidents();
    MOCK_INCIDENTS = MOCK_INCIDENTS.filter(inc => String(inc.id) !== String(id));
    saveMockIncidents(MOCK_INCIDENTS);
    
    try {
      const STORAGE_KEY_SUIVIS = 'followup_mock_suivis';
      const storedSuivis = localStorage.getItem(STORAGE_KEY_SUIVIS);
      if (storedSuivis) {
        let allSuivis = JSON.parse(storedSuivis);
        if (allSuivis[id]) {
          delete allSuivis[id];
          localStorage.setItem(STORAGE_KEY_SUIVIS, JSON.stringify(allSuivis));
        }
      }
    } catch (e) {
      console.error("Failed to cascade delete suivis", e);
    }

    return { body: { success: true } };
  }
};
