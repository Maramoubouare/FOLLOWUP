import React from 'react';
import { Dialog, DialogTitle, Typography, DialogContent, FormControl, InputLabel, Select, MenuItem, DialogActions, Button } from '@mui/material';
import { FormikProvider, Form, useFormik } from 'formik';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createIncident, updateIncident } from '../../../services/incident.service';
import { zodFormikValidate } from '../../../shared/utils/zodFormikValidate';
import { FormikTextField } from '../../../shared/components';
import { useTranslation } from '../../../contexts/I18nContext';

const IncidentSchema = z.object({
  idPatient: z.string().min(1, "Patient ID is required"),
  dateIncident: z.string().min(1, "Date is required"),
  heureIncident: z.string().optional().nullable(),
  gravite: z.string(),
  description: z.string().min(10, "Provide more detail in the clinical narrative"),
  idImplant: z.string().min(1, "Implant ID is required"),
  idProcesseur: z.string().optional().nullable(),
  idMedecin: z.string().min(1, "Doctor name is required"),
});

export const IncidentFormModal = ({ open, onClose, initialData = null }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const isEdit = !!initialData?.id;

  const mutation = useMutation({
    mutationFn: (values) => {
      if (isEdit) {
        return updateIncident(initialData.id, values);
      }
      return createIncident({ ...values, statut: 'Ouvert' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
      handleClose();
    }
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const formik = useFormik({
    initialValues: { 
      idPatient: initialData?.idPatient || '', 
      dateIncident: initialData?.dateIncident || new Date().toISOString().split('T')[0], 
      heureIncident: initialData?.heureIncident || '', 
      gravite: initialData?.gravite || 'Minor', 
      description: initialData?.description || '', 
      idImplant: initialData?.idImplant || '', 
      idProcesseur: initialData?.idProcesseur || '',
      idMedecin: initialData?.idMedecin || '',
    },
    enableReinitialize: true,
    validate: zodFormikValidate(IncidentSchema),
    onSubmit: async (values) => {
      await mutation.mutateAsync(values);
    }
  });

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: '#f8fafc',
      '& fieldset': { borderColor: '#e2e8f0' },
      '&:hover fieldset': { borderColor: '#cbd5e1' },
      '&.Mui-focused fieldset': { borderColor: '#2563EB' },
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      PaperProps={{ sx: { borderRadius: 5, p: 4, maxWidth: 700, width: '100%' } }}
    >
      <DialogTitle sx={{ px: 0, pb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 900 }}>
          {isEdit ? t('edit_incident') : t('new_incident')}
        </Typography>
        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', mt: 0.5, display: 'block' }}>
          {t('mandatory_fields')}
        </Typography>
      </DialogTitle>
      
      <FormikProvider value={formik}>
        <Form>
          <DialogContent sx={{ px: 0, py: 2 }}>
            {/* Row 1: Patient + Date */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <FormikTextField 
                fullWidth name="idPatient" label={t('patient')} sx={inputSx}
              />
              <FormikTextField 
                fullWidth name="dateIncident" type="date" label={t('date')} 
                InputLabelProps={{ shrink: true }} sx={inputSx}
              />
            </div>

            {/* Row 2: Implant + Processor */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <FormikTextField 
                fullWidth name="idImplant" label={t('implant')} sx={inputSx}
              />
              <FormikTextField 
                fullWidth name="idProcesseur" label={t('processor')} sx={inputSx}
              />
            </div>

            {/* Row 3: Doctor + Follow-up time */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <FormikTextField 
                fullWidth name="idMedecin" label={t('physician')} sx={inputSx}
              />
              <FormikTextField 
                fullWidth name="heureIncident" type="time" label={t('time')} 
                InputLabelProps={{ shrink: true }} sx={inputSx}
              />
            </div>

            {/* Row 4: Severity */}
            <div style={{ marginBottom: 16 }}>
              <FormControl fullWidth sx={inputSx}>
                <InputLabel>{t('gravite')}</InputLabel>
                <Select name="gravite" value={formik.values.gravite} label={t('gravite')} onChange={formik.handleChange}>
                  <MenuItem value="Minor">{t('minor')}</MenuItem>
                  <MenuItem value="Moderate">{t('moderate')}</MenuItem>
                  <MenuItem value="Critical">{t('critical_class_b')}</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/* Description */}
            <FormikTextField 
              fullWidth multiline rows={4} name="description" label={t('narrative_evidence')} 
              sx={inputSx}
            />
          </DialogContent>
          
          <DialogActions sx={{ px: 0, pt: 3 }}>
            <Button onClick={handleClose} sx={{ color: '#94a3b8', fontWeight: 800, px: 3 }}>
              {t('discard')}
            </Button>
            <Button 
              type="submit" variant="contained" 
              disabled={formik.isSubmitting || !formik.isValid}
              sx={{ bgcolor: '#0f172a', '&:hover': { bgcolor: '#000' }, px: 5, py: 1.5, borderRadius: 3, fontWeight: 800, fontSize: 15, textTransform: 'none', boxShadow: '0 12px 32px rgba(15,23,42,0.12)' }}
            >
              {isEdit ? t('save_changes') : t('register_incident')}
            </Button>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Dialog>
  );
};
