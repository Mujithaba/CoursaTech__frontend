import React from 'react';
import { FaVideo, FaFileAlt, FaVolumeUp, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { Lesson } from '../../../../services/types';

interface LessonItemProps {
  lesson: Lesson;
  isActive: boolean;
  onClick: () => void;
}

const LessonItem: React.FC<LessonItemProps> = ({ lesson, isActive, onClick }) => (
  <div 
    className={`flex justify-between items-center p-3 cursor-pointer ${isActive ? 'bg-purple-100' : 'hover:bg-gray-100'}`}
    onClick={onClick}
  >
    <div className="flex items-center">
      {lesson.type === 'video' && <FaVideo className="mr-2 text-gray-500" />}
      {lesson.type === 'document' && <FaFileAlt className="mr-2 text-gray-500" />}
      {lesson.type === 'quiz' && <FaVolumeUp className="mr-2 text-gray-500" />}
      <span className="text-sm">{lesson.title}</span>
    </div>
    <div className="flex items-center">
      {lesson.duration && <span className="text-xs text-gray-500 mr-2">{lesson.duration}</span>}
      {lesson.preview && (
        <button className="bg-indigo-600 text-white px-2 py-1 rounded text-xs">Preview</button>
      )}
    </div>
  </div>
);

export default LessonItem;
