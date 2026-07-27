import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Artists from './pages/Artists';
import Albums from './pages/Albums';
import ArtistDetail from './pages/ArtistDetail';
import AlbumDetail from './pages/AlbumDetail';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/artists"
        element={
          <ProtectedRoute>
            <Layout>
              <Artists />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/artists/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <ArtistDetail />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/albums"
        element={
          <ProtectedRoute>
            <Layout>
              <Albums />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/albums/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <AlbumDetail />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;