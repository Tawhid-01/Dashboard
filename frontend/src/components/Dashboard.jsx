import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const username = localStorage.getItem('username') || 'User';
    const role = localStorage.getItem('role') || 'customer';

    // Menu logic based on role
    const menuItems = [
        { name: 'View Products', path: '/tasks', roles: ['admin', 'vendor', 'customer'], icon: '📦' },
        { name: 'Create New Task', path: '/create', roles: ['admin', 'vendor'], icon: '➕' },
        { name: 'Manage Customers', path: '/admin/customers', roles: ['admin'], icon: '👥' },
        { name: 'Vendor Analytics', path: '/admin/vendors', roles: ['admin'], icon: '📈' },
    ];

    const stats = [
        { label: 'Active Tasks', value: '12', color: 'bg-blue-500' },
        { label: 'Total Orders', value: '45', color: 'bg-emerald-500' },
        { label: 'Notifications', value: '3', color: 'bg-amber-500' },
    ];

    return (
        <div className="flex min-h-[80vh] bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col">
                <div className="mb-10 text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3 uppercase">
                        {username[0]}
                    </div>
                    <h2 className="font-bold text-lg">{username}</h2>
                    <span className="text-xs text-slate-400 uppercase tracking-widest">{role}</span>
                </div>

                <nav className="flex-1 space-y-2">
                    {menuItems.map((item) => item.roles.includes(role) && (
                        <Link 
                            key={item.name} 
                            to={item.path} 
                            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-800 transition-colors group"
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className="text-sm font-medium group-hover:text-blue-400">{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <button 
                    onClick={() => { localStorage.clear(); window.location.href = '/login'; }}
                    className="mt-auto flex items-center space-x-3 p-3 text-red-400 hover:bg-red-950/30 rounded-xl transition-colors"
                >
                    <span>Logout</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 bg-slate-50/50">
                <header className="mb-10">
                    <h1 className="text-3xl font-extrabold text-slate-800">Welcome to your Dashboard</h1>
                    <p className="text-slate-500 mt-2">Here is what's happening with your account today.</p>
                </header>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                            </div>
                            <div className={`w-2 h-12 ${stat.color} rounded-full`}></div>
                        </div>
                    ))}
                </div>

                {/* Role Specific Content */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Quick Actions</h3>
                    <div className="flex flex-wrap gap-4">
                        {role === 'admin' && (
                            <button className="px-6 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-semibold hover:bg-indigo-200 transition">System Logs</button>
                        )}
                        {role === 'vendor' && (
                            <Link to="/create" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Add Product</Link>
                        )}
                        <Link to="/tasks" className="px-6 py-2 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition">View All Tasks</Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;