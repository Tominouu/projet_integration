import React, { useState, useRef } from "react";

const ScrollingAlphabet = () => {
  const [selectedSection, setSelectedSection] = useState(null);

  const sections = [
    { letter: "E", title: "Écouter", id: "ecouter" },
    { letter: "C", title: "Connaître", id: "connaitre" },
    { letter: "C", title: "Comprendre", id: "comprendre" },
    { letter: "S", title: "Se comprendre", id: "se-comprendre" },
    { letter: "C", title: "Communiquer", id: "communiquer" },
  ];

  const scrollToSection = (sectionId, finalize = true) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      if (finalize) {
        const found = sections.find((s) => s.id === sectionId);
        setSelectedSection(found || null);
      }
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
                {section.id === "ecouter" && (
                  <p>
                    Savoir écouter, c’est offrir à l’autre un espace où il se
                    sent entendu et respecté. Cela implique une attention réelle
                    et une absence de jugement.
                  </p>
                )}
                {section.id === "connaitre" && (
                  <p>
                    Connaître une personne, c’est aller au-delà des apparences
                    et prendre le temps de découvrir ses valeurs, ses besoins et
                    son histoire.
                  </p>
                )}
                {section.id === "comprendre" && (
                  <p>
                    Comprendre, c’est chercher à interpréter correctement ce que
                    l’autre exprime, en tenant compte de ses émotions et de son
                    contexte.
                  </p>
                )}
                {section.id === "se-comprendre" && (
                  <p>
                    Se comprendre soi-même permet de mieux gérer ses émotions et
                    de communiquer plus clairement ses attentes et ses limites.
                  </p>
                )}
                {section.id === "communiquer" && (
                  <p>
                    Communiquer, c’est créer un échange ouvert et sincère où
                    chacun peut exprimer ses idées, ses ressentis et ses
                    besoins.
                  </p>
                )}
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
  const alphabetRef = useRef(null);
  const longPressTimeout = useRef(null);
  const pressedSection = useRef(null);
  const longPressTriggered = useRef(false);

  const LONG_PRESS_DELAY = 200; // ms

  const vibrate = () => {
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  const getSectionFromY = (clientY) => {
    if (!alphabetRef.current) return null;
    const rect = alphabetRef.current.getBoundingClientRect();
    const relY = clientY - rect.top;
    const sectionHeight = rect.height / sections.length;
    const index = Math.floor(relY / sectionHeight);
    return sections[index] || null;
  };

  const startPress = (section) => {
    pressedSection.current = section;
    longPressTriggered.current = false;
    longPressTimeout.current = setTimeout(() => {
      setIsDragging(true);
      setHoveredSection(section);
      onLetterClick(section.id, false);
      vibrate();
      longPressTriggered.current = true;
    }, LONG_PRESS_DELAY);
  };

  const cancelPress = () => {
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current);
      longPressTimeout.current = null;
    }
  };

  // ------------------------------
  // Touch events (mobile)
  // ------------------------------
  const handleTouchStart = (e, section) => {
    cancelPress();
    startPress(section);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    if (e.cancelable) e.preventDefault();
    const touch = e.touches[0];
    const sec = getSectionFromY(touch.clientY);
    if (sec && sec.id !== hoveredSection?.id) {
      setHoveredSection(sec);
      onLetterClick(sec.id, false);
      vibrate();
    }
  };

  const handleTouchEnd = () => {
    cancelPress();
    if (!longPressTriggered.current && pressedSection.current) {
      // 👉 tap court
      onLetterClick(pressedSection.current.id, true);
    } else if (isDragging && hoveredSection) {
      // 👉 fin du défilement
      onLetterClick(hoveredSection.id, true);
    }
    setIsDragging(false);
    setHoveredSection(null);
    pressedSection.current = null;
  };

  // ------------------------------
  // Mouse events (desktop)
  // ------------------------------
  const handleMouseDown = (e, section) => {
    if (e.button !== 0) return;
    cancelPress();
    startPress(section);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const sec = getSectionFromY(e.clientY);
    if (sec && sec.id !== hoveredSection?.id) {
      setHoveredSection(sec);
      onLetterClick(sec.id, false);
      vibrate();
    }
  };

  const handleMouseUp = () => {
    cancelPress();
    if (!longPressTriggered.current && pressedSection.current) {
      // 👉 clic court
      onLetterClick(pressedSection.current.id, true);
    } else if (isDragging && hoveredSection) {
      // 👉 fin du défilement
      onLetterClick(hoveredSection.id, true);
    }
    setIsDragging(false);
    setHoveredSection(null);
    pressedSection.current = null;
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50">
      <div
        ref={alphabetRef}
        className="flex flex-col items-center space-y-2 py-4 px-2"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {sections.map((section) => {
          const isHovered = hoveredSection?.id === section.id;
          const isSelected = selectedSection?.id === section.id;
          const showTooltip = isHovered && !isSelected;

          return (
            <div key={section.id} className="relative flex items-center">
              <button
                onMouseDown={(e) => handleMouseDown(e, section)}
                onTouchStart={(e) => handleTouchStart(e, section)}
                className={`
                  w-8 h-8 flex items-center justify-center text-sm font-bold
                  transition-all duration-300 ease-in-out rounded-lg select-none
                  ${isHovered && !isSelected ? "opacity-0" : ""}
                  ${
                    isSelected
                      ? "bg-pink-500 text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-pink-100 hover:text-pink-700 hover:shadow-sm"
                  }
                `}
              >
                {section.letter}
              </button>

              {showTooltip && (
                <div
                  className={`
                    absolute right-full mr-3 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg px-3 py-1
                    shadow-lg border border-gray-200 whitespace-nowrap z-10
                    transition-all duration-200 ease-in-out
                  `}
                >
                  <span className="text-sm font-medium text-gray-700">
                    {section.title}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollingAlphabet;
