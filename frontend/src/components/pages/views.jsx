import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Views = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTasks = async () => {
            try {
                const res = await axios.get('http://localhost:3434/blog');
                setTasks(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch tasks", err);
                setLoading(false);
            }
        };
        getTasks();
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Delete Task?',
            text: "This action will be cancelled automatically in 15 seconds!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2563eb',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Yes, delete it!',
            timer: 15000,
            timerProgressBar: true,
            background: '#ffffff',
            borderRadius: '1rem'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.get(`http://localhost:3434/task/delete/${id}`);
                    setTasks(tasks.filter(t => t._id !== id));
                    Swal.fire({ title: 'Deleted!', icon: 'success', timer: 2000, showConfirmButton: false });
                } catch (err) {
                    Swal.fire('Error!', 'Failed to delete task.', 'error', err);
                }
            }
        });
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <header className="flex justify-between items-end mb-8 border-b pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Task <span className="text-blue-600">Inventory</span></h1>
                    <p className="text-gray-500 text-sm">Reviewing {tasks.length} active documentation records</p>
                </div>
                <Link to="/create" className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all">
                    + New Task
                </Link>
            </header>

            {/* Main Flex Container for List */}
            <div className="flex flex-col gap-4">
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <div key={task._id} className="flex flex-col md:flex-row items-center bg-white p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all group">
                            
                            {/* 1. Image Thumbnail - Flex Child */}
                            <div className="w-full md:w-24 h-24 shrink-0 mb-4 md:mb-0">
                                {task.image ? (
                                    <img 
                                        src={`http://localhost:3434/uploads/images/${task.image}`} 
                                        alt={task.title} 
                                        className="w-full h-full object-cover rounded-lg shadow-inner"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-50 border border-dashed border-gray-200 rounded-lg flex items-center justify-center text-[10px] text-gray-400 uppercase font-bold">
                                        No Image
                                    </div>
                                )}
                            </div>

                            {/* 2. Text Content - Flex Child (Growing) */}
                            <div className="grow md:ml-6 text-center md:text-left">
                                <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                    {task.title}
                                </h3>
                                <p className="text-gray-500 text-sm mt-1 line-clamp-1 max-w-xl">
                                    {task.description || "No description provided."}
                                </p>
                                <div className="text-[10px] text-gray-300 mt-2 uppercase tracking-widest font-bold">
                                    ID: {task._id.substring(0, 8)}...
                                </div>
                            </div>

                            {/* 3. Actions - Flex Child */}
                            <div className="flex gap-2 mt-4 md:mt-0 ml-0 md:ml-4 shrink-0">
                                 <Link to={`/view/${task._id}`}>
                                    <button className="px-4 py-2 bg-gray-50 text-gray-600 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all active:scale-95">
                                        View
                                    </button>
                                </Link>



                                <Link to={`/edit/${task._id}`}>
                                    <button className="px-4 py-2 bg-gray-50 text-gray-600 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all active:scale-95">
                                        Edit
                                    </button>
                                </Link>
                                <button 
                                    onClick={() => handleDelete(task._id)} 
                                    className="px-4 py-2 bg-gray-50 text-red-500 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-red-50 hover:border-red-200 transition-all active:scale-95"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed">
                        <span className="text-4xl mb-4">📝</span>
                        <p className="text-gray-400">Your task list is empty.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Views;