import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPages';
import { Dashboard } from './pages/Dashboard';
import { BusinessDetails } from './pages/BusinessDetails';
import { BusinessPitch } from './pages/BusinessPitch';
import { Profile } from './pages/Profile';
import { Layout } from './components/Layout';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BusinessAnalysis } from './pages/BusinessAnalysis';
import { BusinessAnalysisView } from './pages/BusinessAnalysisView';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { Analytics } from './pages/Analytics';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return !user ? <>{children}</> : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          } />
          <Route path="/login" element={
            <PublicRoute>
              <AuthPage type="login" />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <AuthPage type="register" />
            </PublicRoute>
          } />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/business/:id" element={
            <PrivateRoute>
              <Layout>
                <BusinessDetails />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/business/:id/pitch" element={
            <PrivateRoute>
              <Layout>
                <BusinessPitch />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/pitch" element={
            <PrivateRoute>
              <Layout>
                <BusinessPitch />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <Layout>
                <Profile />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/business/:id/details" element={
            <PrivateRoute>
              <Layout>
                <BusinessDetails />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/analyze" element={
            <PrivateRoute>
              <Layout>
                <BusinessAnalysis />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/business/analysis" element={
            <PrivateRoute>
              <Layout>
                <BusinessAnalysisView />
              </Layout>
            </PrivateRoute>
          } />
          <Route
            path="/analytics"
            element={
              <PrivateRoute>
                <Layout>
                  <Analytics />
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;