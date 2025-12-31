import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Ensure this URL matches your backend port
            const res = await axios.post('http://localhost:3434/login', { email, password });
            
            // 1. Save data to localStorage
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', res.data.role);
            localStorage.setItem('username', res.data.username);

            // 2. Success Alert
            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: `Welcome back, ${res.data.username}!`,
                timer: 2000,
                showConfirmButton: false
            });

            // 3. Redirect to Dashboard
            navigate('/dashboard');
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: err.response?.data?.message || 'Invalid Email or Password',
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">Task<span className="text-blue-600">Flow</span></h1>
                    <p className="text-slate-500 mt-2">Sign in to manage your account</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                        <input 
                            type="email" 
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="name@company.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <input 
                            type="password" 
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="••••••••"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center text-slate-600">
                            <input type="checkbox" className="mr-2 rounded border-gray-300 text-blue-600" />
                            Remember me
                        </label>
                        <a href="#" className="text-blue-600 hover:underline font-medium">Forgot password?</a>
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-center text-slate-600 mt-8 text-sm">
                    Don't have an account? 
                    <Link to="/register" className="text-blue-600 font-bold ml-1 hover:underline">Create one</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;