import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import MLModels from './scenes/mlmodels/MLModels';
import MLModelDetail from './scenes/mlmodels/MLModelDetail';
import Students from './scenes/admin/Students';
import AdminProfile from './scenes/admin/AdminProfile';

function App() {
  return (
    <div className="app">
      <Routes>
        {/* Admin Routes */}
        <Route
          path="/admin/profile"
          element={
            <RequireAuth adminOnly>
              <AdminProfile />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/students"
          element={
            <RequireAuth adminOnly>
              <Students />
            </RequireAuth>
          }
        />

        {/* Protected ML Models routes */}
        <Route
          path="/mlmodels"
          element={
            <RequireAuth>
              <MLModels />
            </RequireAuth>
          }
        />
        <Route
          path="/mlmodels/:modelId"
          element={
            <RequireAuth>
              <MLModelDetail />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

// RequireAuth component
const RequireAuth = ({ children, adminOnly = false }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userReducer);

  // TODO (Amitkumar): admin check using redux
    const isAdmin = user?.isAdmin;

  useEffect(() => {
    if (adminOnly && !isAdmin) {
      navigate('/signin');
    } else if (!user && !isAdmin) {
      navigate('/signin');
    }
  }, [user, isAdmin, navigate, adminOnly]);

  return (adminOnly && isAdmin) || (!adminOnly && (user || isAdmin)) ? children : null;
};

export default App;
