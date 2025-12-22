import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
    const [task, setTask] = useState({ title: '', description: '' });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null); // For showing the image before upload
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        // Create a local URL to preview the image in the UI
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', task.title); 
        formData.append('description', task.description);
        if (image) formData.append('image', image); 

        try {
            // Hits your /task/create/new route
            await axios.post('http://localhost:3434/task/create/new', formData);
            navigate('/tasks'); 
        } catch (err) {
            console.error("Error creating task", err);
            alert("Failed to create task. Check if your backend is running.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-100">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-800">Add New Task</h2>
                <p className="text-gray-500 mt-2">Fill in the details to add a task to your MongoDB database.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title Input */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Task Title</label>
                    <input 
                        type="text" 
                        placeholder="Enter task title..." 
                        required 
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        onChange={(e) => setTask({...task, title: e.target.value})} 
                    />
                </div>

                {/* Description Input */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Detailed Description</label>
                    <textarea 
                        placeholder="Provide more context about this task..." 
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all h-32 resize-none"
                        onChange={(e) => setTask({...task, description: e.target.value})} 
                    />
                </div>

                {/* Image Upload Section */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Task Image (Multer processing)</label>
                    <div className="mt-1 flex flex-col items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors bg-gray-50">
                        {preview ? (
                            <div className="relative mb-4">
                                <img src={preview} alt="Preview" className="h-40 w-40 object-cover rounded-lg shadow-md" />
                                <button 
                                    type="button" 
                                    onClick={() => {setImage(null); setPreview(null);}}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                                >✕</button>
                            </div>
                        ) : (
                            <div className="space-y-1 text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        )}
                        <div className="flex text-sm text-gray-600">
                            <label className="relative cursor-pointer font-medium text-blue-600 hover:text-blue-500">
                                <span>{image ? 'Change Image' : 'Upload a file'}</span>
                                <input 
                                    type="file" 
                                    className="sr-only" 
                                    accept="image/*" 
                                    onChange={handleImageChange} 
                                />
                            </label>
                        </div>
                    </div>
                </div>

                {/* Submit and Back */}
                <div className="flex gap-4 pt-4">
                    <button 
                        type="submit" 
                        className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all transform active:scale-95"
                    >
                        Create Task
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

export default CreateTask;