import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '', email: '', password: '', role: 'customer'
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3434/api/register', formData);
            navigate('/login');
        } catch (err) { alert("Registration failed",err); }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-100 px-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Join Us</h2>
                
                <input type="text" placeholder="Username" className="w-full p-3 mb-4 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                    onChange={(e) => setFormData({...formData, username: e.target.value})} />
                
                <input type="email" placeholder="Email Address" className="w-full p-3 mb-4 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} />
                
                <input type="password" placeholder="Password" className="w-full p-3 mb-4 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                    onChange={(e) => setFormData({...formData, password: e.target.value})} />

                <label className="block text-sm font-medium text-gray-600 mb-2">Select Your Role</label>
                <select 
                    className="w-full p-3 mb-6 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                    <option value="customer">Customer (Buy Products)</option>
                    <option value="vendor">Vendor (Sell Products)</option>
                    <option value="admin">Admin (Manage Shop)</option>
                </select>

                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-all transform active:scale-95 shadow-lg shadow-blue-200">
                    Create Account
                </button>
            </form>
        </div>
    );
};
export default Register;