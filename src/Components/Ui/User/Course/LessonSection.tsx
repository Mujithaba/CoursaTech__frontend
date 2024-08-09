import React from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import LessonItem from './Lesson';
import { Lesson, Section } from '../../../../services/types';

interface LessonSectionProps {
  title: string;
  lessons: Lesson[];
  isOpen: boolean;
  toggleOpen: () => void;
  activeLesson: string;
  setActiveLesson: (lessonId: string) => void;
}

const LessonSection: React.FC<LessonSectionProps> = ({ title, lessons, isOpen, toggleOpen, activeLesson, setActiveLesson }) => (
  <div className="border rounded-lg mb-2 overflow-hidden">
    <div 
      className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer"
      onClick={toggleOpen}
    >
      <h3 className="font-semibold">{title}</h3>
      {isOpen ? <FaChevronUp className="text-gray-400" /> : <FaChevronDown className="text-gray-400" />}
    </div>
    {isOpen && (
      <div>
        {lessons.map((lesson, index) => (
          <LessonItem 
            key={index} 
            lesson={lesson} 
            isActive={activeLesson === `${title}-${index}`}
            onClick={() => setActiveLesson(`${title}-${index}`)}
          />
        ))}
      </div>
    )}
  </div>
);

export default LessonSection;
