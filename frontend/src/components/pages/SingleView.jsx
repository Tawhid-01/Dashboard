import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

const SingleView = () => {

const [task, setTask] = useState(null);
const { id } = useParams();
const navigate = useNavigate();
 useEffect(() => {
        // Fetch task data from your backend
        axios.get(`http://localhost:3434/task/view/${id}`)
            .then(res => setTask(res.data))
            .catch(err => console.error("Could not fetch task", err));
    }, [id]);

if (!task) {
    return <div className="text-center py-10">Loading Task...</div>;
}


  return (
   <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        
        {/* Banner Image */}
        <div className="h-96 w-full relative">
          <img 
            src={`http://localhost:3434/uploads/images/${task.image}`} 
            className="w-full h-full object-cover"
            alt={task.title}
          />
          <button 
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-md hover:bg-white transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{task.title}</h1>
              <p className="text-sm text-gray-400 mt-1">
                Created on: {new Date(task.createdAt).toLocaleDateString()}
              </p>
            </div>
            <Link 
              to={`/edit/${task._id}`}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Edit Task
            </Link>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Description</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">
              {task.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
  

export default SingleView
