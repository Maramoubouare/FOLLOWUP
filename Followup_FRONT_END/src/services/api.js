const BASE_URL = 'http://localhost:3000/api';

let MOCK_INCIDENTS = [
  { 
    id: 1, 
    dateIncident: '2023-11-20', 
    heureIncident: '14:30', 
    gravite: 'Critical', 
    description: 'Migration d\'électrode détectée.', 
    idPatient: 'P-992', 
    statut: 'Ouvert', 
    idMedecin: 'Dr. Martin', 
    idImplant: 'IMP-7721', 
    idProcesseur: 'PROC-11' 
  }
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const incidentsApi = {
  fetchIncidents: async () => {
    try {
      const response = await fetch(`${BASE_URL}/incidents`);
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    } catch (e) {
      console.warn("Local server not found on port 3000. Using Mock API.");
      await delay(500);
      return [...MOCK_INCIDENTS];
    }
  },

  createIncident: async (incidentData) => {
    try {
      const response = await fetch(`${BASE_URL}/incidents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(incidentData),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    } catch (e) {
      await delay(500);
      const newIncident = { ...incidentData, id: Date.now() };
      MOCK_INCIDENTS = [newIncident, ...MOCK_INCIDENTS];
      return newIncident;
    }
  },

  updateIncident: async ({ id, ...incidentData }) => {
    try {
      const response = await fetch(`${BASE_URL}/incidents/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(incidentData),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    } catch (e) {
      await delay(500);
      MOCK_INCIDENTS = MOCK_INCIDENTS.map(inc => inc.id === id ? { ...inc, ...incidentData } : inc);
      return incidentData;
    }
  }
};
