import React, { useState, useRef } from 'react';

const ScrollingAlphabet = () => {
  const [selectedSection, setSelectedSection] = useState(null);

  const sections = [
    { letter: 'E', title: 'Écouter', id: 'ecouter' },
    { letter: 'C', title: 'Connaître', id: 'connaitre' },
    { letter: 'C', title: 'Comprendre', id: 'comprendre' },
    { letter: 'S', title: 'Se comprendre', id: 'se-comprendre' },
    { letter: 'C', title: 'Communiquer', id: 'communiquer' },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
      setSelectedSection(sections.find((s) => s.id === sectionId));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Contenu principal avec sections */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Guide de Communication
        </h1>
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="mb-16 scroll-mt-20">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  {section.letter}
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{section.title}</h2>
              </div>
              {/* Contenu des sections */}
              <div className="text-gray-600 leading-relaxed">
                {/* Contenu des sections inchangé */}
              </div>
            </div>
          </section>
        ))}
      </div>
      <AlphabetNavigation
        sections={sections}
        onLetterClick={scrollToSection}
        selectedSection={selectedSection}
      />
    </div>
  );
};

const AlphabetNavigation = ({ sections, onLetterClick, selectedSection }) => {
  const [hoveredSection, setHoveredSection] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [currentDragSection, setCurrentDragSection] = useState(null);
  const alphabetRef = useRef(null);

  const handleSectionHover = (section) => {
    if (!isDragging) {
      setHoveredSection(section);
    }
  };

  const handleSectionLeave = () => {
    if (!isDragging) {
      setHoveredSection(null);
    }
  };

  const handleTouchStart = (e, section) => {
    e.preventDefault();
    setCurrentDragSection(section);
    setHoveredSection(section);
    setTimeout(() => {
      setIsDragging(true);
    }, 200);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !alphabetRef.current) return;
    e.preventDefault();
    const touch = e.touches[0];
    const rect = alphabetRef.current.getBoundingClientRect();
    const relativeY = touch.clientY - rect.top;
    const sectionHeight = 40;
    const sectionIndex = Math.floor(relativeY / sectionHeight);
    if (sectionIndex >= 0 && sectionIndex < sections.length) {
      const newSection = sections[sectionIndex];
      setHoveredSection(newSection);
      onLetterClick(newSection.id);
    }
  };

  const handleTouchEnd = (e) => {
    setIsDragging(false);
    setCurrentDragSection(null);
    setHoveredSection(null);
  };

  const handleMouseDown = (e, section) => {
    e.preventDefault();
    setCurrentDragSection(section);
    setHoveredSection(section);
    setTimeout(() => {
      setIsDragging(true);
    }, 200);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !alphabetRef.current) return;
    const rect = alphabetRef.current.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;
    const sectionHeight = 40;
    const sectionIndex = Math.floor(relativeY / sectionHeight);
    if (sectionIndex >= 0 && sectionIndex < sections.length) {
      const newSection = sections[sectionIndex];
      setHoveredSection(newSection);
      onLetterClick(newSection.id);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setCurrentDragSection(null);
    setHoveredSection(null);
  };

  const handleSectionClick = (section) => {
    if (!isDragging) {
      onLetterClick(section.id);
    }
  };

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
      {hoveredSection && !isDragging && (
        <div className="absolute right-16 top-0 bg-white bg-opacity-85 backdrop-blur-md rounded-lg shadow-xl border border-white border-opacity-30 py-2 px-3 min-w-48">
          <div className="text-xs text-gray-600 mb-2 font-semibold">Lettre {hoveredSection.letter}</div>
          <button
            onClick={() => onLetterClick(hoveredSection.id)}
            className="block w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-700 rounded transition-colors"
          >
            {hoveredSection.title}
          </button>
        </div>
      )}
      <div
        ref={alphabetRef}
        className="flex flex-col items-center space-y-2 bg-transparent py-4 px-2"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {sections.map((section) => (
          <div key={section.id} className="relative flex items-center">
            <button
              onMouseEnter={() => handleSectionHover(section)}
              onMouseLeave={handleSectionLeave}
              onMouseDown={(e) => handleMouseDown(e, section)}
              onTouchStart={(e) => handleTouchStart(e, section)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onClick={() => handleSectionClick(section)}
              className={`
                w-8 h-8 flex items-center justify-center text-sm font-bold
                transition-all duration-200 ease-out rounded-lg select-none
                ${
                  selectedSection?.id === section.id
                    ? 'bg-pink-500 text-white shadow-lg transform scale-110 -translate-x-12'
                    : hoveredSection?.id === section.id
                    ? 'bg-pink-200 text-pink-800 shadow-md transform scale-105 -translate-x-12'
                    : 'bg-white text-gray-600 hover:bg-pink-100 hover:text-pink-700 hover:shadow-sm'
                }
              `}
            >
              {section.letter}
            </button>
            {(hoveredSection?.id === section.id || selectedSection?.id === section.id) && (
              <div
                className={`
                  absolute left-10 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg px-3 py-1
                  shadow-lg border border-gray-200 whitespace-nowrap z-10
                  transition-all duration-200 ease-out
                  ${
                    hoveredSection?.id === section.id || selectedSection?.id === section.id
                      ? 'opacity-100 -translate-x-1'
                      : 'opacity-0'
                  }
                `}
              >
                <span className="text-sm font-medium text-gray-700">
                  {section.title}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingAlphabet;
