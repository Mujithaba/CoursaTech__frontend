import React, { useState } from 'react';
import LessonSection from './LessonSection';
import { Lesson, Section } from '../../../../services/types';

const Curriculum: React.FC = () => {
  const [openSections, setOpenSections] = useState<string[]>(['Lesson #01']);
  const [activeLesson, setActiveLesson] = useState<string>('Lesson #01-0');

  const toggleSection = (title: string) => {
    setOpenSections(prev => 
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  const sections: Section[] = [
    {
      title: "Lesson #01",
      lessons: [
        { type: 'video', title: "Course Intro", duration: "3.27", preview: true },
        { type: 'video', title: "Course Outline", duration: "5.00", preview: true },
        { type: 'document', title: "Course Materials" },
        { type: 'document', title: "Assignment" },
      ]
    },
    { title: "Lesson #02", lessons: [] },
    { title: "Lesson #03", lessons: [] },
    { title: "Lesson #04", lessons: [] },
  ];

  return (
    <div className="flex max-w-6xl mx-auto p-4 gap-4">
      <div className="w-1/3">
        {sections.map((section, index) => (
          <LessonSection 
            key={index} 
            {...section} 
            isOpen={openSections.includes(section.title)}
            toggleOpen={() => toggleSection(section.title)}
            activeLesson={activeLesson}
            setActiveLesson={setActiveLesson}
          />
        ))}
      </div>
      <div className="w-2/3">
        <div className="bg-indigo-600 text-white p-3 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Video Content lesson 01</h2>
          <button className="text-sm">Close</button>
        </div>
        <div className="aspect-w-16 aspect-h-9 bg-black">
          {/* Replace with actual video embed */}
          <img 
            src="https://via.placeholder.com/800x450.png?text=Video+Player" 
            alt="Video placeholder"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Curriculum;
