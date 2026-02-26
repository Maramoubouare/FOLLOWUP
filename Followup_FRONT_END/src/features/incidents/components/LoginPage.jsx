import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, Typography } from '@mui/material';
import { Activity, ArrowLeft, ShieldCheck } from 'lucide-react';
import { FormikProvider, Form, useFormik } from 'formik';
import { LanguageSwitcher, FormikTextField } from '../../../shared/components';
import { z } from 'zod';
import { zodFormikValidate } from '../../../shared/utils/zodFormikValidate';
import { LoadingButton } from '@mui/lab';

import { useTranslation } from '../../../contexts/I18nContext';

export const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const LoginFormSchema = z.object({
    email: z.string().trim().email(t('invalid_email')).min(1, t('email_required')),
    password: z.string().min(1, t('key_required'))
  });

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validate: zodFormikValidate(LoginFormSchema),
    validateOnMount: true,
    onSubmit: async (values, helpers) => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      if (values.email === "admin@chu-montpellier.fr") {
        navigate('/dashboard');
      } else {
        helpers.setFieldError('email', t('invalid_credentials'));
      }
    }
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Left Panel */}
      <div style={{ 
        width: '42%', 
        backgroundColor: '#0f172a', 
        padding: '48px 56px', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(37,99,235,0.2), transparent)', borderRadius: '50%' }} />
        
        <div style={{ position: 'relative', zIndex: 10 }}>
          <div 
            onClick={() => navigate('/')} 
            style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#fff', fontWeight: 900, fontSize: 22, marginBottom: 80, cursor: 'pointer' }}
          >
            <div style={{ width: 40, height: 40, backgroundColor: '#2563EB', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <Activity size={22} strokeWidth={3} />
            </div>
            <span>FollowUp</span>
          </div>
          
          <h1 style={{ color: '#fff', fontSize: 48, lineHeight: 1.1, marginBottom: 24, fontWeight: 900, letterSpacing: '-0.03em', marginTop: 0 }}>
            {t('login_title').split('.')[0]}. <br/><span style={{ color: '#3b82f6' }}>{t('registry')}.</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 17, fontWeight: 500, lineHeight: 1.6, maxWidth: 340, margin: 0 }}>
            {t('login_subtitle')}
          </p>
        </div>
        
        <div style={{ position: 'relative', zIndex: 10, padding: 28, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)' }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'center' }}>
            <ShieldCheck size={20} color="#60a5fa" />
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 14 }}>{t('protocol_label')}</span>
          </div>
          <p style={{ color: '#64748b', fontSize: 12, lineHeight: 1.6, margin: 0 }}>
            {t('protocol_desc')}
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '48px 64px', 
        backgroundColor: '#fff' 
      }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          {/* Top row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 56 }}>
            <IconButton 
              onClick={() => navigate('/')} 
              sx={{ bgcolor: '#f8fafc', '&:hover': { bgcolor: '#f1f5f9' }, width: 44, height: 44 }}
            >
              <ArrowLeft size={20} />
            </IconButton>
            <LanguageSwitcher />
          </div>

          {/* Form heading */}
          <div style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 32, fontWeight: 900, color: '#0f172a', margin: '0 0 8px', letterSpacing: '-0.02em' }}>{t('system_auth')}</h2>
            <p style={{ color: '#64748b', fontWeight: 500, fontSize: 16, margin: 0 }}>{t('auth_subtitle')}</p>
          </div>

          {/* Form */}
          <FormikProvider value={formik}>
            <Form>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <FormikTextField 
                  name="email" 
                  label={t('hospital_email')} 
                  InputProps={{ sx: { borderRadius: 3, height: 56, bgcolor: 'rgba(248,250,252,0.5)' } }}
                />
                <FormikTextField 
                  name="password" 
                  label={t('security_key')} 
                  type="password" 
                  InputProps={{ sx: { borderRadius: 3, height: 56, bgcolor: 'rgba(248,250,252,0.5)' } }}
                />
                <LoadingButton 
                  fullWidth 
                  type="submit" 
                  variant="contained" 
                  loading={formik.isSubmitting}
                  disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
                  sx={{ 
                    height: 56, 
                    borderRadius: 3, 
                    bgcolor: '#0f172a', 
                    '&:hover': { bgcolor: '#000' }, 
                    fontWeight: 800, 
                    fontSize: 16, 
                    textTransform: 'none',
                    boxShadow: '0 12px 32px rgba(15,23,42,0.12)',
                    mt: 1
                  }}
                >
                  {t('authenticate')}
                </LoadingButton>
                <p style={{ textAlign: 'center', color: '#94a3b8', fontWeight: 600, fontSize: 13, margin: '8px 0 0' }}>
                  {t('trouble_accessing')} <a href="#" style={{ color: '#2563EB', textDecoration: 'underline' }}>{t('contact_it')}</a>
                </p>
              </div>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </div>
  );
};
