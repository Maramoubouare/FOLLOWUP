import React from 'react';
import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './features/incidents/components/LandingPage';
import { LoginPage } from './features/incidents/components/LoginPage';
import { DashboardView } from './features/incidents/components/DashboardView';
import { FollowUpPage } from './features/incidents/components/FollowUpPage';
import { I18nProvider } from './contexts/I18nContext';
import '@fontsource/cairo';
import '@fontsource/plus-jakarta-sans';

const queryClient = new QueryClient();

const theme = createTheme({
  palette: { 
    primary: { main: '#2563EB' }, 
    secondary: { main: '#0F172A' },
    background: { default: '#F8FAFC' }
  },
  shape: { borderRadius: 16 },
  typography: { 
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.03em' }, 
    h3: { fontWeight: 800, letterSpacing: '-0.02em' }, 
    button: { fontWeight: 700, textTransform: 'none' }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<Navigate to="/dashboard/incidents" replace />} />
                <Route path="/dashboard/incidents" element={<DashboardView viewType="list" />} />
                <Route path="/dashboard/followups" element={<DashboardView viewType="followups-registry" />} />
                <Route path="/followups/:id" element={<FollowUpPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </StyledEngineProvider>
      </I18nProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
