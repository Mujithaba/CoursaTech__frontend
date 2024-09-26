import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Home, ArrowLeft } from 'lucide-react';


const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center px-4 py-8 overflow-hidden">
      <div className={`max-w-lg w-full bg-white rounded-2xl shadow-2xl p-8 text-center transform transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="mb-8 relative">
          <Book className="mx-auto text-blue-500 animate-bounce" size={64} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-blue-100 rounded-full filter blur-xl opacity-70 animate-pulse"></div>
        </div>
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          4<span className="text-blue-500 inline-block animate-spin-slow">0</span>4
        </h1>
        <p className="text-xl text-gray-600 mb-8 animate-fade-in">
          Oops! This lesson seems to have wandered off our curriculum path.
        </p>
        <div className="space-y-4">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            <Home className="mr-2" size={20} />
            Return to Learning Hub
          </button>
          <button
            onClick={() => navigate(-1)}
            className="w-full flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
          >
            <ArrowLeft className="mr-2" size={20} />
            Go Back to Previous Lesson
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;