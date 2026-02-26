import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Button, Typography, Card, Chip, IconButton,
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper,
  Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem, TextField 
} from '@mui/material';
import { Activity, ArrowLeft, Plus, ShieldAlert, ClipboardList, LogOut } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSuivis } from '../../../hooks/useSuivis';
import { addSuivi } from '../../../services/suivi.service';
import { useTranslation } from '../../../contexts/I18nContext';
import { LanguageSwitcher } from '../../../shared/components';
import { FollowUpModal } from './FollowUpModal';

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

export const FollowUpPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { suivis, isLoading, count } = useSuivis(id);
  const [modalOpen, setModalOpen] = useState(false);

  const inputSx = { borderRadius: 3, '& .MuiOutlinedInput-root': { borderRadius: 3 } };

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
            style={sidebarItemStyle(false)}
          >
            <ShieldAlert size={20} /> Incidents
          </button>
          <button 
            onClick={() => navigate('/dashboard/followups')} 
            style={sidebarItemStyle(true)}
          >
            <ClipboardList size={20} /> Follow-ups
          </button>
        </nav>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '48px 56px', maxWidth: 1100, width: '100%' }}>
        <Button startIcon={<ArrowLeft size={18} />} onClick={() => navigate('/dashboard')} sx={{ mb: 2, color: '#2563EB', fontWeight: 700, textTransform: 'none', '&:hover': { bgcolor: '#eff6ff' } }}>
          {t('back_incidents')}
        </Button>

        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
          <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{t('incidents')} #{id}</span>
              <span style={{ fontSize: 11, color: '#cbd5e1' }}>/</span>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{t('followups')}</span>
            </div>
            <h1 style={{ fontSize: 32, fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>{t('followup_history')}</h1>
            <p style={{ color: '#94a3b8', fontWeight: 600, fontSize: 14, margin: '4px 0 0' }}>{count} follow-up(s) recorded</p>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <LanguageSwitcher />
            <Button variant="contained" startIcon={<Plus size={18} />} onClick={() => setModalOpen(true)} sx={{ bgcolor: '#2563EB', '&:hover': { bgcolor: '#1d4ed8' }, px: 4, borderRadius: 3, fontWeight: 800, height: 48, textTransform: 'none', boxShadow: '0 8px 24px rgba(37,99,235,0.2)' }}>
              {t('add_followup')}
            </Button>
          </div>
        </header>

        {/* Follow-up list */}
        {isLoading ? (
          <p style={{ color: '#94a3b8', textAlign: 'center', padding: 48 }}>Loading...</p>
        ) : suivis.length === 0 ? (
          <Card elevation={0} sx={{ p: 6, borderRadius: 4, border: '1px solid #f1f5f9', textAlign: 'center' }}>
            <ClipboardList size={48} color="#cbd5e1" style={{ marginBottom: 16 }} />
            <Typography sx={{ color: '#94a3b8', fontWeight: 700, fontSize: 16 }}>{t('no_followups')}</Typography>
            <Typography sx={{ color: '#cbd5e1', fontSize: 14, mt: 1 }}>Click "Add Follow-up" to record the first entry.</Typography>
          </Card>
        ) : (
          <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 4, border: '1px solid #f1f5f9', overflow: 'hidden', bgcolor: '#fff' }}>
            <Table>
              <TableHead sx={{ bgcolor: 'rgba(248,250,252,0.7)' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.1em', py: 2.5, pl: 4 }}>{t('date')}</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.1em' }}>{t('type')}</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.1em' }}>{t('description')}</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.1em' }}>{t('physician')}</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.1em', pr: 4 }}>{t('recommendation')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {suivis.map(s => (
                  <TableRow key={s.id} hover>
                    <TableCell sx={{ fontWeight: 700, color: '#0f172a', py: 2.5, pl: 4 }}>{s.dateAction}</TableCell>
                    <TableCell>
                      <Chip label={s.typeAction} size="small" sx={{ fontWeight: 700, fontSize: 11, borderRadius: 2, bgcolor: s.typeAction === 'Observation' ? '#eff6ff' : s.typeAction === 'Intervention' ? '#fef3c7' : '#ecfdf5', color: s.typeAction === 'Observation' ? '#2563EB' : s.typeAction === 'Intervention' ? '#d97706' : '#059669' }} />
                    </TableCell>
                    <TableCell sx={{ color: '#475569', fontWeight: 500, maxWidth: 300 }}>{s.description}</TableCell>
                    <TableCell sx={{ color: '#64748b', fontWeight: 600 }}>{s.idMedecin || '—'}</TableCell>
                    <TableCell sx={{ color: '#64748b', fontWeight: 500, pr: 4 }}>{s.recommandation || '—'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <FollowUpModal 
          open={modalOpen} 
          onClose={() => setModalOpen(false)} 
          incidentId={id}
        />
      </main>
    </div>
  );
};
