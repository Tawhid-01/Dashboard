import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState({ title: '', description: '' });
    const [newImage, setNewImage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetches data from your editTaskPage controller
        axios.get(`http://localhost:3434/task/edit/${id}`)
            .then(res => {
                setTask(res.data);
                setLoading(false);
            })
            .catch(err => console.error("Could not fetch task", err));
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', task.title);
        formData.append('description', task.description);
        if (newImage) formData.append('image', newImage);

        try {
            // Matches your updateTaskPage route
            await axios.post(`http://localhost:3434/task/update/${id}`, formData); 
            navigate('/tasks');
        } catch (err) {
            alert("Error updating task", err);
        }
    };

    if (loading) return <div className="text-center py-10">Loading Task Data...</div>;

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Edit Task</h2>
            
            <form onSubmit={handleUpdate} className="space-y-6">
                {/* Title Input */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Task Title</label>
                    <input 
                        type="text" 
                        value={task.title} 
                        onChange={(e) => setTask({...task, title: e.target.value})} 
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="Enter title"
                        required
                    />
                </div>

                {/* Description Input */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea 
                        value={task.description} 
                        onChange={(e) => setTask({...task, description: e.target.value})} 
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all h-32"
                        placeholder="What needs to be done?"
                    />
                </div>

                {/* Image Upload Section */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Update Image (Optional)</label>
                    <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors">
                        <div className="space-y-1 text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                                <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                                    <span>Upload a new file</span>
                                    <input 
                                        type="file" 
                                        className="sr-only" 
                                        onChange={(e) => setNewImage(e.target.files[0])} 
                                    />
                                </label>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                        </div>
                    </div>
                    {newImage && <p className="mt-2 text-sm text-green-600">Selected: {newImage.name}</p>}
                </div>

                {/* Form Buttons */}
                <div className="flex gap-4 pt-4">
                    <button 
                        type="submit" 
                        className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
                    >
                        Save Changes
                    </button>
                    <button 
                        type="button"
                        onClick={() => navigate('/tasks')}
                        className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-200 transition-all"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTask;