import React, { useState } from 'react';
import { 
  Typography, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem, TextField, Button
} from '@mui/material';
import { X } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addSuivi } from '../../../services/suivi.service';
import { useTranslation } from '../../../contexts/I18nContext';

export const FollowUpModal = ({ open, onClose, incidentId, patientId }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const initialFormData = {
    typeAction: 'Observation',
    description: '',
    recommandation: '',
    idMedecin: '',
    dateAction: new Date().toISOString().split('T')[0],
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleClose = () => {
    setFormData(initialFormData);
    onClose();
  };

  const mutation = useMutation({
    mutationFn: (data) => addSuivi(incidentId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suivis'] });
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
      handleClose();
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description) return;
    mutation.mutate(formData);
  };

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const inputSx = { 
    '& .MuiOutlinedInput-root': { 
      borderRadius: '12px',
      backgroundColor: '#f8fafc',
      '& fieldset': { borderColor: '#e2e8f0' },
      '&:hover fieldset': { borderColor: '#cbd5e1' },
      '&.Mui-focused fieldset': { borderColor: '#2563EB' },
    },
    '& .MuiOutlinedInput-input': {
      padding: '14px 16px',
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      PaperProps={{ sx: { borderRadius: 5, p: 4, maxWidth: 600, width: '100%' } }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ px: 0, pb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Typography variant="h5" sx={{ fontWeight: 900 }}>{t('create_followup')}</Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', mt: 0.5, display: 'block' }}>
              {t('incidents')} {patientId ? `${t('fr' === 'en' ? 'for' : 'pour')} ${patientId}` : `#${incidentId}`}
            </Typography>
          </div>
          <IconButton onClick={handleClose} size="small" sx={{ color: '#94a3b8' }}>
            <X size={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ px: 0, py: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <FormControl fullWidth>
              <InputLabel>{t('action_type')}</InputLabel>
              <Select 
                value={formData.typeAction} 
                label={t('action_type')} 
                onChange={handleChange('typeAction')} 
                sx={{ borderRadius: 3 }}
              >
                <MenuItem value="Observation">{t('observation')}</MenuItem>
                <MenuItem value="Intervention">{t('intervention')}</MenuItem>
                <MenuItem value="Contrôle">{t('control')}</MenuItem>
                <MenuItem value="Clôture">{t('closure')}</MenuItem>
              </Select>
            </FormControl>
            <TextField 
              fullWidth label={t('date')} type="date" 
              value={formData.dateAction} 
              onChange={handleChange('dateAction')} 
              InputLabelProps={{ shrink: true }} 
              sx={inputSx} 
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <TextField 
              fullWidth label={t('physician')} 
              value={formData.idMedecin} 
              onChange={handleChange('idMedecin')} 
              sx={inputSx} 
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <TextField 
              fullWidth multiline rows={3} label={t('clinical_description')} 
              value={formData.description} 
              onChange={handleChange('description')} 
              sx={inputSx} 
              placeholder="Detail the observations or actions taken during this follow-up..."
            />
          </div>
          <TextField 
            fullWidth multiline rows={2} label={t('recommendation')} 
            value={formData.recommandation} 
            onChange={handleChange('recommandation')} 
            sx={inputSx} 
            placeholder="Next steps or preventive measures..."
          />
        </DialogContent>
        <DialogActions sx={{ px: 0, pt: 3 }}>
          <Button onClick={handleClose} sx={{ color: '#94a3b8', fontWeight: 800, px: 3 }}>{t('cancel')}</Button>
          <Button 
            type="submit" variant="contained" 
            disabled={mutation.isPending || !formData.description} 
            sx={{ bgcolor: '#0f172a', '&:hover': { bgcolor: '#000' }, px: 5, py: 1.5, borderRadius: 3, fontWeight: 800, fontSize: 15, textTransform: 'none', boxShadow: '0 12px 32px rgba(15,23,42,0.12)' }}
          >
            {mutation.isPending ? 'Saving...' : t('register_followup')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
