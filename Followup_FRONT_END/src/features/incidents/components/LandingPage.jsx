import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Chip, Typography, Container, Divider } from '@mui/material';
import { 
  Activity, 
  ArrowRight, 
  Search, 
  Award, 
  ShieldCheck, 
  Lock, 
  Binary, 
  Microscope, 
  Zap, 
  Dna 
} from 'lucide-react';
import { LanguageSwitcher } from '../../../shared/components';
import { useTranslation } from '../../../contexts/I18nContext';

export const LandingPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Header */}
      <nav style={{ 
        height: 72, 
        display: 'flex', 
        alignItems: 'center', 
        backgroundColor: 'rgba(255,255,255,0.85)', 
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #f1f5f9', 
        position: 'sticky', 
        top: 0, 
        zIndex: 100,
        padding: '0 48px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, backgroundColor: '#2563EB', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}>
              <Activity size={22} strokeWidth={3} />
            </div>
            <span style={{ fontWeight: 900, fontSize: 22, letterSpacing: '-0.03em', color: '#0f172a' }}>FollowUp</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <a href="#features" style={{ fontSize: 14, fontWeight: 700, color: '#64748b', textDecoration: 'none' }}>{t('features')}</a>
            <a href="#standards" style={{ fontSize: 14, fontWeight: 700, color: '#64748b', textDecoration: 'none' }}>{t('compliance')}</a>
            <a href="#footer" style={{ fontSize: 14, fontWeight: 700, color: '#64748b', textDecoration: 'none' }}>{t('contact')}</a>
            <LanguageSwitcher variant="text" />
            <Button 
              variant="contained" 
              onClick={() => navigate('/login')} 
              sx={{ 
                backgroundColor: '#0f172a', 
                '&:hover': { backgroundColor: '#1e293b' }, 
                borderRadius: 99, 
                px: 3, 
                py: 1.2, 
                fontWeight: 700, 
                textTransform: 'none',
                boxShadow: '0 8px 24px rgba(15,23,42,0.15)' 
              }}
            >
              {t('get_started')}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ position: 'relative', overflow: 'hidden', paddingTop: 80, paddingBottom: 120 }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: 800, height: 800, background: 'radial-gradient(circle, rgba(219,234,254,0.4), transparent)', borderRadius: '50%', transform: 'translate(25%, -50%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: 600, height: 600, background: 'radial-gradient(circle, rgba(238,242,255,0.5), transparent)', borderRadius: '50%', transform: 'translate(-25%, 50%)' }} />
        
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', backgroundColor: '#fff', borderRadius: 99, border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', marginBottom: 32 }}>
            <Chip label="NEW" size="small" sx={{ bgcolor: '#2563EB', color: '#fff', fontWeight: 800, fontSize: 10 }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{t('v42_live')}</span>
          </div>
          
          <h1 style={{ fontSize: 64, fontWeight: 900, lineHeight: 1.1, color: '#0f172a', margin: '0 0 24px', letterSpacing: '-0.03em' }}>
            {t('landing_title').split(t('gold_standard'))[0]}<span style={{ color: 'transparent', backgroundClip: 'text', WebkitBackgroundClip: 'text', backgroundImage: 'linear-gradient(to right, #2563EB, #6366f1)' }}>{t('gold_standard')}</span>{t('landing_title').split(t('gold_standard'))[1]}
          </h1>
          
          <p style={{ color: '#64748b', marginBottom: 48, fontSize: 20, maxWidth: 640, margin: '0 auto 48px', lineHeight: 1.6, fontWeight: 500 }}>
            {t('landing_desc')}
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 80 }}>
            <Button 
              size="large" 
              variant="contained" 
              onClick={() => navigate('/login')} 
              endIcon={<ArrowRight />}
              sx={{ 
                height: 56, 
                px: 5, 
                borderRadius: 99, 
                fontSize: 16, 
                fontWeight: 800, 
                textTransform: 'none',
                bgcolor: '#2563EB', 
                '&:hover': { bgcolor: '#1d4ed8' }, 
                boxShadow: '0 12px 32px rgba(37,99,235,0.25)' 
              }}
            >
              {t('get_started')}
            </Button>
            <Button 
              size="large" 
              variant="outlined" 
              sx={{ 
                height: 56, 
                px: 5, 
                borderRadius: 99, 
                fontSize: 16, 
                fontWeight: 800, 
                textTransform: 'none',
                borderWidth: 2, 
                borderColor: '#e2e8f0', 
                color: '#475569', 
                '&:hover': { bgcolor: '#fff', borderColor: '#cbd5e1' } 
              }}
            >
              {t('explore')}
            </Button>
          </div>

          {/* Browser Mockup */}
          <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto' }}>
            <div style={{ position: 'absolute', inset: -4, background: 'linear-gradient(to right, #2563EB, #6366f1)', borderRadius: 40, filter: 'blur(20px)', opacity: 0.15 }} />
            <div style={{ position: 'relative', backgroundColor: '#fff', border: '6px solid rgba(15,23,42,0.05)', borderRadius: 32, overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.08)' }}>
              <div style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #f1f5f9', height: 44, display: 'flex', alignItems: 'center', padding: '0 16px', gap: 8 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#f87171' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#fbbf24' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#34d399' }} />
              </div>
              <div style={{ padding: 8, aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f5f9' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#cbd5e1' }}>
                  <Search size={48} style={{ marginBottom: 16, opacity: 0.3 }} />
                  <span style={{ fontWeight: 800, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.4 }}>{t('interface_label')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Standards Section */}
      <section id="standards" style={{ backgroundColor: '#fff', padding: '80px 24px', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ textAlign: 'center', marginBottom: 48, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.25em', fontSize: 11 }}>
            {t('validated_standards')}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 48, textAlign: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <Award size={32} color="#0f172a" />
              <span style={{ fontWeight: 800, fontSize: 13, color: '#0f172a' }}>IEC 62304</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <ShieldCheck size={32} color="#0f172a" />
              <span style={{ fontWeight: 800, fontSize: 13, color: '#0f172a' }}>ISO 13485</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <Lock size={32} color="#0f172a" />
              <span style={{ fontWeight: 800, fontSize: 13, color: '#0f172a' }}>GDPR/HIPAA</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <Binary size={32} color="#0f172a" />
              <span style={{ fontWeight: 800, fontSize: 13, color: '#0f172a' }}>CE MARKED</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '120px 24px', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{ fontSize: 40, fontWeight: 900, color: '#0f172a', margin: '0 0 16px', letterSpacing: '-0.02em' }}>{t('built_critical_care')}</h2>
            <p style={{ color: '#64748b', maxWidth: 500, margin: '0 auto', fontWeight: 500, fontSize: 16, lineHeight: 1.6 }}>
              {t('precision_instrument')}
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {/* Card 1 */}
            <div style={{ backgroundColor: '#fff', padding: 40, borderRadius: 28, border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', transition: 'all 0.4s ease' }}>
              <div style={{ width: 56, height: 56, backgroundColor: '#eff6ff', color: '#2563EB', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                <Microscope size={28} />
              </div>
              <h3 style={{ fontWeight: 800, fontSize: 20, margin: '0 0 12px', color: '#0f172a' }}>{t('feature1_title')}</h3>
              <p style={{ color: '#64748b', lineHeight: 1.7, fontWeight: 500, margin: 0 }}>{t('feature1_desc')}</p>
            </div>

            {/* Card 2 */}
            <div style={{ backgroundColor: '#fff', padding: 40, borderRadius: 28, border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', transition: 'all 0.4s ease' }}>
              <div style={{ width: 56, height: 56, backgroundColor: '#eef2ff', color: '#6366f1', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                <Zap size={28} />
              </div>
              <h3 style={{ fontWeight: 800, fontSize: 20, margin: '0 0 12px', color: '#0f172a' }}>{t('feature2_title')}</h3>
              <p style={{ color: '#64748b', lineHeight: 1.7, fontWeight: 500, margin: 0 }}>{t('feature2_desc')}</p>
            </div>

            {/* Card 3 */}
            <div style={{ backgroundColor: '#fff', padding: 40, borderRadius: 28, border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', transition: 'all 0.4s ease' }}>
              <div style={{ width: 56, height: 56, backgroundColor: '#ecfdf5', color: '#059669', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                <Dna size={28} />
              </div>
              <h3 style={{ fontWeight: 800, fontSize: 20, margin: '0 0 12px', color: '#0f172a' }}>{t('feature3_title')}</h3>
              <p style={{ color: '#64748b', lineHeight: 1.7, fontWeight: 500, margin: 0 }}>{t('feature3_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" style={{ backgroundColor: '#0f172a', padding: '80px 24px 40px', color: '#94a3b8' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 48, marginBottom: 64 }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff', fontWeight: 900, fontSize: 22, marginBottom: 16 }}>
                <Activity size={22} color="#3b82f6" /> FollowUp
              </div>
              <p style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.6, color: '#64748b', margin: 0 }}>
                {t('pioneering_future')}
              </p>
            </div>

            {/* Platform */}
            <div>
              <h4 style={{ color: '#fff', fontWeight: 800, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 16, marginTop: 0 }}>{t('platform')}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a href="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: 14 }}>{t('implant_tracker')}</a>
                <a href="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: 14 }}>{t('safety_reports')}</a>
                <a href="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: 14 }}>{t('api_docs')}</a>
              </div>
            </div>

            {/* Legal */}
            <div>
              <h4 style={{ color: '#fff', fontWeight: 800, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 16, marginTop: 0 }}>{t('legal')}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a href="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: 14 }}>{t('privacy')}</a>
                <a href="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: 14 }}>{t('iso_certs')}</a>
                <a href="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: 14 }}>{t('ethics')}</a>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #1e293b', paddingTop: 32 }}>
            <p style={{ textAlign: 'center', fontWeight: 600, fontSize: 12, color: '#475569', margin: 0 }}>
              {t('copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
