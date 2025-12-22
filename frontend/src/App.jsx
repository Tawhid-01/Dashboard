import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import TaskList from './components/pages/views';
import CreateTask from './components/pages/CreateTask';
import EditTask from './components/pages/EditTask';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 ">
        {/* Modern Navigation Bar */}
        <nav className="bg-gray-100 shadow-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              {/* Logo/Brand */}
              <div className="shrink-0 flex items-center">
                <Link to="/" className="text-2xl font-bold text-blue-600 tracking-tight">
                  Task<span className="text-gray-800">Flow</span>
                </Link>
              </div>

              {/* Navigation Links */}
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link 
                  to="/" 
                  className="border-transparent text-gray-500 hover:border-blue-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                >
                  Home
                </Link>
                <Link 
                  to="/tasks" 
                  className="border-transparent text-gray-500 hover:border-blue-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                >
                  All Tasks
                </Link>
              </div>

              {/* Action Button */}
              <div className="flex items-center">
                <Link
                  to="/create"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                >
                  + Add New Task
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content Container */}
        <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <div className="bg-transparent rounded-lg shadow-sm p-6 min-h-[60vh]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tasks" element={<TaskList />} />
              <Route path="/create" element={<CreateTask />} />
              {/* Dynamic route for Editing */}
              <Route path="/edit/:id" element={<EditTask />} />
            </Routes>
          </div>
        </main>

        {/* Simple Footer */}
        <footer className="text-center py-8 text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Task Management System. Built with React & Node.
        </footer>
      </div>
    </Router>
  );
}

export default App;