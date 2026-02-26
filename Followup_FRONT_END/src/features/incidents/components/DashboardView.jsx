import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Button, 
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody, 
  Paper, Chip, Card, IconButton, Typography
} from '@mui/material';
import { ShieldAlert, ClipboardList, LogOut, Activity, Plus, ArrowLeft, Edit, Trash2, FileText } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useIncidents } from '../../../hooks/useIncidents';
import { useAllSuivis, useDeleteSuivi } from '../../../hooks/useSuivis';
import { deleteIncident } from '../../../services/incident.service';
import { LanguageSwitcher } from '../../../shared/components';
import { IncidentFormModal } from './IncidentFormModal';
import { FollowUpModal } from './FollowUpModal';
import { useTranslation } from '../../../contexts/I18nContext';

const sidebarItemStyle = (active) => ({
  width: '100%',
  textAlign: 'left',
  padding: '14px 20px',
  borderRadius: 16,
  fontWeight: 800,
  fontSize: 14,
  display: 'flex',
  alignItems: 'center',
  gap: 14,
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  backgroundColor: active ? '#eff6ff' : 'transparent',
  color: active ? '#2563EB' : '#94a3b8',
});

export const DashboardView = ({ viewType = 'list' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [view, setView] = useState(viewType);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [followUpModalOpen, setFollowUpModalOpen] = useState(false);
  const [followUpIncident, setFollowUpIncident] = useState(null);

  useEffect(() => {
    setView(viewType);
  }, [viewType]);

  const {
    incidents,
    isLoading,
    refetch,
  } = useIncidents();

  const {
    suivis: allSuivis,
    isLoading: isLoadingSuivis,
  } = useAllSuivis();

  const deleteSuiviMutation = useDeleteSuivi();

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteIncident(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
      queryClient.invalidateQueries({ queryKey: ['suivis'] });
    }
  });

  const handleDelete = (e, incident) => {
    e.stopPropagation();
    if (window.confirm(`Delete incident ${incident.idPatient}?`)) {
      deleteMutation.mutate(incident.id);
      if (selectedIncident?.id === incident.id) {
        setView('list');
        setSelectedIncident(null);
      }
    }
  };

  const handleDeleteSuivi = (e, suivi) => {
    e.stopPropagation();
    if (window.confirm('Delete this follow-up records?')) {
      deleteSuiviMutation.mutate({ incidentId: suivi.incidentId, suiviId: suivi.id });
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Sidebar */}
      <aside style={{ width: 260, backgroundColor: '#fff', borderRight: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', padding: '32px 20px', position: 'sticky', top: 0, height: '100vh', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 900, fontSize: 20, marginBottom: 48, letterSpacing: '-0.03em', color: '#0f172a', paddingLeft: 8 }}>
          <Activity size={24} color="#2563EB" /> FollowUp
        </div>
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <button 
            onClick={() => navigate('/dashboard/incidents')} 
            style={sidebarItemStyle(view === 'list' || view === 'details')}
          >
            <ShieldAlert size={20} /> {t('incidents')}
          </button>
            <button 
              onClick={() => {
                if (selectedIncident && view === 'details') {
                  navigate(`/followups/${selectedIncident.id}`);
                } else {
                  navigate('/dashboard/followups');
                }
              }} 
              style={sidebarItemStyle(view === 'followups-registry')}
            >
              <ClipboardList size={20} /> {t('followups')}
            </button>
        </nav>

        <button 
          onClick={() => navigate('/')} 
          style={{ ...sidebarItemStyle(false), marginTop: 'auto', color: '#ef4444' }}
        >
          <LogOut size={20} /> {t('logout')}
        </button>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '48px 56px', maxWidth: 1100, width: '100%' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
          <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{t('registry')}</span>
              <span style={{ fontSize: 11, color: '#cbd5e1' }}>/</span>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                {view === 'followups-registry' ? t('followup_registry') : view === 'details' ? t('edit_incident') : t('new_record')}
              </span>
            </div>
            <h1 style={{ fontSize: 36, fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>
              {view === 'followups-registry' ? t('followup_registry') : t('incidents')}
            </h1>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <LanguageSwitcher />
            {view !== 'followups-registry' && (
              <Button variant="contained" startIcon={<Plus size={18} />} onClick={() => setModalOpen(true)} sx={{ bgcolor: '#2563EB', '&:hover': { bgcolor: '#1d4ed8' }, px: 4, borderRadius: 3, fontWeight: 800, height: 48, textTransform: 'none', boxShadow: '0 8px 24px rgba(37,99,235,0.2)' }}>
                {t('new_record')}
              </Button>
            )}
          </div>
        </header>

        {(view === 'list' || view === 'followups-registry') ? (
          <div>
            <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 4, border: '1px solid #f1f5f9', overflow: 'hidden', bgcolor: '#fff' }}>
              <Table>
                {view === 'followups-registry' ? (
                  <>
                    <TableHead sx={{ bgcolor: 'rgba(248,250,252,0.7)' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.1em', py: 2.5, pl: 4 }}>{t('date')}</TableCell>
                        <TableCell sx={{ fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.1em' }}>{t('action_type')}</TableCell>
                        <TableCell sx={{ fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.1em' }}>{t('physician')}</TableCell>
                        <TableCell sx={{ fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.1em' }}>{t('description')}</TableCell>
                        <TableCell sx={{ fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.1em', pr: 4, textAlign: 'right' }}>{t('actions')}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {isLoadingSuivis ? (
                        <TableRow><TableCell colSpan={5} align="center" sx={{ py: 6, color: '#94a3b8', fontWeight: 600 }}>Loading...</TableCell></TableRow>
                      ) : allSuivis.length === 0 ? (
                        <TableRow><TableCell colSpan={5} align="center" sx={{ py: 6, color: '#94a3b8', fontWeight: 600 }}>{t('no_followups')}</TableCell></TableRow>
                      ) : (
                        allSuivis.map(s => (
                          <TableRow 
                            key={s.id} 
                            hover 
                            sx={{ cursor: 'pointer' }} 
                            onClick={() => {                                navigate(`/followups/${s.incidentId}`);
                            }}
                          >
                            <TableCell sx={{ fontWeight: 800, color: '#0f172a', fontSize: 14, py: 2.5, pl: 4 }}>{s.dateAction}</TableCell>
                            <TableCell>
                              <Chip label={s.typeAction} variant="outlined" sx={{ fontWeight: 800, textTransform: 'uppercase', fontSize: 10, borderRadius: 2 }} />
                            </TableCell>
                            <TableCell sx={{ color: '#64748b', fontWeight: 600 }}>{s.idMedecin || '—'}</TableCell>
                            <TableCell sx={{ color: '#64748b', fontWeight: 600, maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.description}</TableCell>
                            <TableCell align="right" sx={{ pr: 4 }}>
                              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                                <Button 
                                  size="small" 
                                  variant="contained"
                                  startIcon={<FileText size={14} />}
                                  onClick={(e) => { 
                                    e.stopPropagation(); 
                                    navigate(`/followups/${s.incidentId}`);
                                  }} 
                                  sx={{ 
                                    color: '#fff', 
                                    bgcolor: '#2563EB',
                                    fontWeight: 800, 
                                    textTransform: 'none', 
                                    borderRadius: 2, 
                                    '&:hover': { bgcolor: '#1d4ed8' } 
                                  }}
                                >
                                  {t('view_history')}
                                </Button>
                                <IconButton size="small" onClick={(e) => handleDeleteSuivi(e, s)} sx={{ bgcolor: '#fef2f2', color: '#ef4444', '&:hover': { bgcolor: '#fee2e2' }, width: 36, height: 36 }} title="Delete">
                                  <Trash2 size={16} />
                                </IconButton>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </>
                ) : (
                  <>
                    <TableHead sx={{ bgcolor: 'rgba(248,250,252,0.7)' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.1em', py: 2.5, pl: 4 }}>{t('patient')}</TableCell>
                        <TableCell sx={{ fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.1em' }}>{t('gravite')}</TableCell>
                        <TableCell sx={{ fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.1em' }}>{t('date')}</TableCell>
                        <TableCell sx={{ fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.1em' }}>{t('physician')}</TableCell>
                        <TableCell sx={{ fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.1em', pr: 4, textAlign: 'right' }}>{t('actions')}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {isLoading ? (
                        <TableRow><TableCell colSpan={5} align="center" sx={{ py: 6, color: '#94a3b8', fontWeight: 600 }}>Loading...</TableCell></TableRow>
                      ) : incidents.length === 0 ? (
                        <TableRow><TableCell colSpan={5} align="center" sx={{ py: 6, color: '#94a3b8', fontWeight: 600 }}>No incidents found</TableCell></TableRow>
                      ) : (
                        incidents.map(i => (
                          <TableRow 
                            key={i.id} 
                            hover 
                            sx={{ cursor: 'pointer' }} 
                            onClick={() => { 
                              setSelectedIncident(i); 
                              setView('details'); 
                            }}
                          >
                            <TableCell sx={{ fontWeight: 800, color: '#0f172a', fontSize: 15, py: 2.5, pl: 4 }}>{i.idPatient}</TableCell>
                            <TableCell>
                              <Chip label={i.gravite} color={i.gravite === 'Critical' ? 'error' : 'warning'} sx={{ fontWeight: 800, textTransform: 'uppercase', fontSize: 10, borderRadius: 2 }} />
                            </TableCell>
                            <TableCell sx={{ color: '#64748b', fontWeight: 600 }}>{i.dateIncident}</TableCell>
                            <TableCell sx={{ color: '#64748b', fontWeight: 600 }}>{i.idMedecin || '—'}</TableCell>
                            <TableCell align="right" sx={{ pr: 4 }}>
                              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                                <Button 
                                  size="small" 
                                  variant="text"
                                  startIcon={<FileText size={14} />}
                                  onClick={(e) => { 
                                    e.stopPropagation(); 
                                    setFollowUpIncident(i);
                                    setFollowUpModalOpen(true);
                                  }} 
                                  sx={{ 
                                    color: '#2563EB', 
                                    bgcolor: 'transparent',
                                    fontWeight: 800, 
                                    textTransform: 'none', 
                                    borderRadius: 2, 
                                    '&:hover': { bgcolor: '#eff6ff' } 
                                  }}
                                >
                                  {t('followups')}
                                </Button>
                                <IconButton size="small" onClick={(e) => handleDelete(e, i)} sx={{ bgcolor: '#fef2f2', color: '#ef4444', '&:hover': { bgcolor: '#fee2e2' }, width: 36, height: 36 }} title="Delete">
                                  <Trash2 size={16} />
                                </IconButton>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </>
                )}
              </Table>
            </TableContainer>
          </div>
        ) : (view === 'details' && selectedIncident) ? (
          /* Detail View */
          <div style={{ maxWidth: 800 }}>
            <Button 
              startIcon={<ArrowLeft size={18} />} 
              onClick={() => { setView('list'); setSelectedIncident(null); }} 
              sx={{ mb: 3, color: '#2563EB', fontWeight: 700, textTransform: 'none', '&:hover': { bgcolor: '#eff6ff' } }}
            >
              {t('return_registry')}
            </Button>
            <Card elevation={0} sx={{ p: 6, borderRadius: 6, border: '1px solid #f1f5f9', bgcolor: '#fff', position: 'relative', overflow: 'visible' }}>
              <div style={{ position: 'absolute', top: 32, right: 32, display: 'flex', alignItems: 'center', gap: 8 }}>
                <IconButton onClick={() => setModalOpen(true)} sx={{ bgcolor: '#f8fafc', color: '#64748b', border: '1px solid #e2e8f0' }} title="Edit Record">
                  <Edit size={18} />
                </IconButton>
                <IconButton onClick={(e) => handleDelete(e, selectedIncident)} sx={{ bgcolor: '#fef2f2', color: '#ef4444', border: '1px solid #fee2e2' }} title="Delete Record">
                  <Trash2 size={18} />
                </IconButton>
                <Chip label={selectedIncident?.statut || 'N/A'} variant="outlined" sx={{ fontWeight: 800, textTransform: 'uppercase', fontSize: 10, borderColor: '#e2e8f0', ml: 1 }} />
              </div>
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: 28, fontWeight: 900, color: '#0f172a', margin: '0 0 4px', letterSpacing: '-0.02em' }}>{t('edit_incident')}</h2>
                <p style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.15em', color: '#94a3b8', margin: 0 }}>Protocol IEC-62304-B</p>
              </div>
              <div style={{ padding: 32, backgroundColor: '#f8fafc', borderRadius: 20, marginBottom: 32, border: '1px solid rgba(241,245,249,0.8)', fontStyle: 'italic', color: '#334155', fontWeight: 600, fontSize: 18, lineHeight: 1.6 }}>
                "{selectedIncident?.description}"
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 32 }}>
                <div>
                  <p style={{ fontWeight: 800, textTransform: 'uppercase', color: '#cbd5e1', letterSpacing: '0.15em', fontSize: 10, margin: '0 0 6px' }}>{t('patient')}</p>
                  <p style={{ fontWeight: 800, fontSize: 18, color: '#0f172a', margin: 0 }}>{selectedIncident?.idPatient}</p>
                </div>
                <div>
                  <p style={{ fontWeight: 800, textTransform: 'uppercase', color: '#cbd5e1', letterSpacing: '0.15em', fontSize: 10, margin: '0 0 6px' }}>{t('implant')}</p>
                  <p style={{ fontWeight: 800, fontSize: 18, color: '#0f172a', margin: 0 }}>{selectedIncident?.idImplant}</p>
                </div>
                <div>
                  <p style={{ fontWeight: 800, textTransform: 'uppercase', color: '#cbd5e1', letterSpacing: '0.15em', fontSize: 10, margin: '0 0 6px' }}>{t('physician')}</p>
                  <p style={{ fontWeight: 800, fontSize: 18, color: '#0f172a', margin: 0 }}>{selectedIncident?.idMedecin || 'NA'}</p>
                </div>
                <div>
                  <p style={{ fontWeight: 800, textTransform: 'uppercase', color: '#cbd5e1', letterSpacing: '0.15em', fontSize: 10, margin: '0 0 6px' }}>{t('gravite')}</p>
                  <p style={{ fontWeight: 800, fontSize: 18, color: selectedIncident?.gravite === 'Critical' ? '#dc2626' : '#f59e0b', margin: 0 }}>{selectedIncident?.gravite}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <Button 
                  variant="contained" 
                  startIcon={<Plus size={16} />} 
                  onClick={() => { setFollowUpIncident(selectedIncident); setFollowUpModalOpen(true); }} 
                  sx={{ bgcolor: '#2563EB', '&:hover': { bgcolor: '#1d4ed8' }, px: 4, borderRadius: 3, fontWeight: 800, height: 44, textTransform: 'none' }}
                >
                  {t('add_followup')}
                </Button>
                <Button 
                  variant="outlined" 
                  startIcon={<FileText size={16} />} 
                  onClick={() => navigate(`/followups/${selectedIncident?.id}`)} 
                  sx={{ borderColor: '#e2e8f0', color: '#64748b', '&:hover': { borderColor: '#cbd5e1', bgcolor: '#f8fafc' }, px: 4, borderRadius: 3, fontWeight: 800, height: 44, textTransform: 'none' }}
                >
                  {t('view_history')}
                </Button>
              </div>
            </Card>
          </div>
        ) : null}


        <IncidentFormModal 
          open={modalOpen} 
          onClose={() => setModalOpen(false)} 
          initialData={selectedIncident}
        />

        <FollowUpModal
          open={followUpModalOpen}
          onClose={() => {
            setFollowUpModalOpen(false);
            setFollowUpIncident(null);
          }}
          incidentId={followUpIncident?.id}
          patientId={followUpIncident?.idPatient}
        />
      </main>
    </div>
  );
};
