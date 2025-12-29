import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './components/Home';
import TaskList from './components/pages/views';
import CreateTask from './components/pages/CreateTask';
import EditTask from './components/pages/EditTask';
import ViewTask from './components/pages/SingleView';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

// --- 1. Protected Route Component ---
const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />; // Redirect if role doesn't match
  }

  return children;
};

function App() {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* --- 2. Dynamic Navigation Bar --- */}
        <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center space-x-8">
                <Link to="/" className="text-2xl font-bold text-blue-600 tracking-tight">
                  Task<span className="text-gray-800">Flow</span>
                </Link>
                <div className="hidden sm:flex sm:space-x-8">
                  <Link to="/" className="text-gray-500 hover:text-blue-600 text-sm font-medium">Home</Link>
                  <Link to="/tasks" className="text-gray-500 hover:text-blue-600 text-sm font-medium">Browse Blog</Link>
                  {token && (
                    <Link to="/dashboard" className="text-gray-500 hover:text-blue-600 text-sm  font-bold">Dashboard</Link>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {!token ? (
                  <>
                    <Link to="/login" className="text-gray-600 hover:text-blue-600 text-sm font-medium">Login</Link>
                    <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <div className="flex items-center space-x-4">
                    <span className="text-xs font-bold uppercase px-2 py-1 bg-blue-100 text-blue-700 rounded">
                      {userRole}
                    </span>
                    <button 
                      onClick={handleLogout}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* --- 3. Organized Route System --- */}
        
        <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/view/:id" element={<ViewTask />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected: Accessible by Customer, Vendor, Admin */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />

            <Route path="/create" element={
              <ProtectedRoute>
                <CreateTask />
              </ProtectedRoute>
            } />

            {/* Protected: Vendor & Admin Only */}
            <Route path="/edit/:id" element={
              <ProtectedRoute allowedRoles={['vendor', 'admin']}>
                <EditTask />
              </ProtectedRoute>
            } />
          </Routes>
        </main>

        <footer className="text-center py-8 text-gray-400 text-sm border-t border-gray-100 mt-auto">
          &copy; {new Date().getFullYear()} Task Management System.
        </footer>
      </div>
    </Router>
  );
}

export default App;