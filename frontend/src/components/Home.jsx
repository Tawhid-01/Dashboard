import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
            
            {/* --- BEAUTIFUL BACKGROUND STARTS HERE --- */}
            {/* 1. Main Base Layer */}
            <div className="absolute inset-0 bg-slate-50 -z-30"></div>
            
            {/* 2. Animated Mesh Blobs (Requires CSS @theme config above) */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-50 animate-blob -z-20"></div>
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-50 animate-blob animation-delay-2000 -z-20"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-100 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob animation-delay-4000 -z-20"></div>

            {/* 3. Texture & Masking */}
            {/* Using the CSS variable defined in the @theme block */}
            <div className="absolute inset-0 bg-(--image-noise) opacity-20 brightness-100 contrast-150 -z-10"></div>
            
            <div className="absolute inset-0 bg-[mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] shadow-[inset_0_0_100px_rgba(0,0,0,0.05)] -z-10"></div>
            {/* --- BACKGROUND ENDS --- */}

            {/* Hero Section */}
            <div className="max-w-3xl text-center relative z-10">
                <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-blue-600 uppercase bg-blue-50 rounded-full">
                    v2.0 Documentation Engine
                </span>
                <h1 className="text-6xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]">
                    Task Management <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">System</span>
                </h1>
                <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl mx-auto">
                    A streamlined way to organize your workflow. Create tasks, 
                    upload documentation images, and track your progress in real-time.
                </p>

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link 
                        to="/tasks" 
                        className="px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl shadow-blue-200 hover:bg-slate-800 transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
                    >
                        View All Tasks
                    </Link>
                    <Link 
                        to="/create" 
                        className="px-10 py-4 bg-white/70 backdrop-blur-md text-slate-900 font-bold rounded-2xl border border-slate-200 shadow-sm hover:bg-white transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
                    >
                        + Create New Task
                    </Link>
                </div>
            </div>

            {/* Feature Cards */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl relative z-10">
                <div className="p-8 bg-white/40 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl shadow-slate-200/50 hover:bg-white/60 transition-colors">
                    <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl mb-4 shadow-lg shadow-blue-200">📁</div>
                    <h3 className="font-bold text-slate-900 text-lg">Organized Storage</h3>
                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">Persistent data handling powered by MongoDB and optimized schemas.</p>
                </div>
                <div className="p-8 bg-white/40 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl shadow-slate-200/50 hover:bg-white/60 transition-colors">
                    <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center text-white text-2xl mb-4 shadow-lg shadow-indigo-200">🖼️</div>
                    <h3 className="font-bold text-slate-900 text-lg">Image Support</h3>
                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">Integrated Multer middleware for high-performance image uploads.</p>
                </div>
                <div className="p-8 bg-white/40 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl shadow-slate-200/50 hover:bg-white/60 transition-colors">
                    <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl mb-4 shadow-lg shadow-emerald-200">⚡</div>
                    <h3 className="font-bold text-slate-900 text-lg">Fast Editing</h3>
                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">Instant CRUD operations with real-time UI updates and feedback.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;