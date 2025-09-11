import React, { useState, useRef, useEffect } from "react";

const ScrollingAlphabet = () => {
  const [selectedSection, setSelectedSection] = useState(null);

  const sections = [
    { letter: "E", title: "Écouter", id: "ecouter" },
    { letter: "C", title: "Connaître", id: "connaitre" },
    { letter: "C", title: "Comprendre", id: "comprendre" },
    { letter: "S", title: "Se comprendre", id: "se-comprendre" },
    { letter: "C", title: "Communiquer", id: "communiquer" },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setSelectedSection(sections.find((s) => s.id === sectionId));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Guide de Communication
        </h1>
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="mb-16 scroll-mt-20"
          >
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  {section.letter}
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {section.title}
                </h2>
              </div>
              <div className="text-gray-600 leading-relaxed">
                {/* contenu section */}
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
  const alphabetRef = useRef(null);

  // Gestion du drag / scroll latéral
  useEffect(() => {
    const handleMove = (clientY) => {
      if (!alphabetRef.current) return;
      const rect = alphabetRef.current.getBoundingClientRect();
      const sectionHeight = rect.height / sections.length;
      const index = Math.floor((clientY - rect.top) / sectionHeight);
      if (index >= 0 && index < sections.length) {
        const newSection = sections[index];
        setHoveredSection(newSection);
        onLetterClick(newSection.id);
      }
    };

    const handleTouchMove = (e) => handleMove(e.touches[0].clientY);
    const handleMouseMove = (e) => {
      if (e.buttons === 1) handleMove(e.clientY);
    };

    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [sections, onLetterClick]);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50">
      <div
        ref={alphabetRef}
        className="flex flex-col items-center space-y-2 py-4 px-2"
      >
        {sections.map((section) => (
          <div key={section.id} className="relative flex items-center">
            <button
              onMouseEnter={() => setHoveredSection(section)}
              onMouseLeave={() => setHoveredSection(null)}
              onClick={() => onLetterClick(section.id)}
              className={`
                w-8 h-8 flex items-center justify-center text-sm font-bold
                transition-all duration-200 ease-out rounded-lg select-none
                ${
                  selectedSection?.id === section.id
                    ? "bg-pink-500 text-white shadow-lg transform scale-110 -translate-x-12"
                    : hoveredSection?.id === section.id
                    ? "bg-pink-200 text-pink-800 shadow-md transform scale-105 -translate-x-12"
                    : "bg-white text-gray-600 hover:bg-pink-100 hover:text-pink-700 hover:shadow-sm"
                }
              `}
            >
              {section.letter}
            </button>
            {(hoveredSection?.id === section.id ||
              selectedSection?.id === section.id) && (
              <div
                className={`
                  absolute left-10 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg px-3 py-1
                  shadow-lg border border-gray-200 whitespace-nowrap z-10
                  transition-all duration-200 ease-out
                  ${
                    hoveredSection?.id === section.id ||
                    selectedSection?.id === section.id
                      ? "opacity-100 -translate-x-1"
                      : "opacity-0"
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
