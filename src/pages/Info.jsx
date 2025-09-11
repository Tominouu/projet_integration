import React, { useState, useRef, useEffect } from "react";

// ------------------ CARROUSEL ÉCOUTER ------------------
const EcouterCarousel = () => {
  const slides = [
    {
      title: "Les quais",
      text: "Les quais de Bordeaux, « port de la Lune », mêlent mémoire des négociants et dockers d’hier aux joggeurs, cyclistes et promeneurs d’aujourd’hui. Lieu de passage et de vie, ils relient la ville à son fleuve et au monde.",
      image:
        "https://www.sncf-connect.com/assets/styles/scale_max_width_961/public/media/2022-10/bordeaux-miroir-d-eau.jpg?itok=EF24q8ma",
    },
    {
      title: "La Garonne",
      text: "Fleuve puissant et imprévisible, la Garonne rythme Bordeaux par ses marées, ses crues et son mascaret. Elle relie l’histoire de la cité à l’estuaire et à l’océan.",
      image:
        "https://www.bougerabordeaux.com/wp-content/uploads/2025/07/garonne-scaled-1.jpeg",
    },
    {
      title: "Les capucins",
      text: "Le marché des Capucins, surnommé « le ventre de Bordeaux », vibre de voix, d’odeurs et de couleurs. C’est le rendez-vous populaire où se croisent maraîchers, habitants et voyageurs.",
      image:
        "https://media.sudouest.fr/13081786/1000x625/sudouest-photo-1-32154012-1600.jpg?v=1700822902",
    },
  ];

  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      {/* Image */}
      <div className="mb-4 relative">
        <img
          src={slides[current].image}
          alt={slides[current].title}
          className="w-full h-56 object-cover rounded-2xl shadow-lg"
        />
        {/* Indicateurs */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === current ? "bg-[#6C0F26]" : "bg-[#FFF5C2]"
              }`}
            ></span>
          ))}
        </div>
      </div>

      {/* Texte */}
      <div
        className="p-6 rounded-xl shadow-md"
        style={{ backgroundColor: "#6C0F26" }}
      >
        <h2
          className="text-2xl font-extrabold mb-3 tracking-wide"
          style={{ color: "#fff" }}
        >
          {slides[current].title}
        </h2>
        <p className="text-base leading-relaxed" style={{ color: "#fff" }}>
          {slides[current].text}
        </p>
      </div>

      {/* Flèches */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md hover:scale-110 transition"
          style={{ backgroundColor: "#6C0F26" }}
        >
          ←
        </button>
        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md hover:scale-110 transition"
          style={{ backgroundColor: "#6C0F26" }}
        >
          →
        </button>
      </div>
    </div>
  );
};

// ------------------ PAGE PRINCIPALE ------------------
const ScrollingAlphabet = () => {
  const [selectedSection, setSelectedSection] = useState(null);

  const sections = [
    { letter: "E", title: "Écouter", id: "ecouter", color: "#6C0F26" },
    { letter: "C", title: "Connaître", id: "connaitre", color: "#6C0F26" },
    { letter: "C", title: "Comprendre", id: "comprendre", color: "#6C0F26" },
    {
      letter: "S",
      title: "Se comprendre",
      id: "se-comprendre",
      color: "#6C0F26",
    },
    { letter: "C", title: "Communiquer", id: "communiquer", color: "#6C0F26" },
  ];

  const scrollToSection = (sectionId, smooth = true) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: smooth ? "smooth" : "auto",
        block: "start",
      });
      setSelectedSection(sections.find((s) => s.id === sectionId));
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFEBD4" }}>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1
          className="text-4xl md:text-5xl font-extrabold text-center mb-16 relative"
          style={{ color: "#6C0F26" }}
        >
          Guide de Communication
          <span className="block w-32 h-1 bg-[#FF7497] mx-auto mt-4 rounded-full"></span>
        </h1>

        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="mb-20 scroll-mt-24"
          >
            <div className="px-4">
              {/* Titre section */}
              <div className="flex items-center mb-6">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 shadow-md"
                  style={{ backgroundColor: section.color }}
                >
                  {section.letter}
                </div>
                <h2
                  className="text-3xl font-bold relative"
                  style={{ color: section.color }}
                >
                  {section.title}
                  <span
                    className="block w-16 h-1 mt-1 rounded-full"
                    style={{ backgroundColor: section.color }}
                  ></span>
                </h2>
              </div>

              {/* Contenu spécifique */}
              {section.id === "ecouter" ? (
                <EcouterCarousel />
              ) : (
                <div
                  className="leading-relaxed text-lg"
                  style={{ color: "#101434" }}
                >
                  <p>
                    Ceci est un paragraphe d’exemple pour la section{" "}
                    <b>{section.title}</b>. Vous pouvez personnaliser ce texte
                    pour compléter le guide et rendre la lecture agréable.
                  </p>
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Navigation alphabet */}
      <AlphabetNavigation
        sections={sections}
        onLetterClick={scrollToSection}
        selectedSection={selectedSection}
      />
    </div>
  );
};

// ------------------ MENU ALPHABET ------------------
const AlphabetNavigation = ({ sections, onLetterClick }) => {
  const [hoveredSection, setHoveredSection] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const alphabetRef = useRef(null);
  const pressedSection = useRef(null);
  const pressTimer = useRef(null);
  const longPressTriggered = useRef(false);

  useEffect(() => {
    if (isDragging) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isDragging]);

  const triggerHaptic = () => {
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
  };

  const startPress = (section) => {
    pressedSection.current = section;
    pressTimer.current = setTimeout(() => {
      longPressTriggered.current = true;
      setIsDragging(true);
      setHoveredSection(section);
      triggerHaptic();
    }, 300);
  };

  const cancelPress = () => clearTimeout(pressTimer.current);

  const handleTouchStart = (e, section) => {
    e.preventDefault();
    longPressTriggered.current = false;
    startPress(section);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !alphabetRef.current) return;
    const touch = e.touches[0];
    const rect = alphabetRef.current.getBoundingClientRect();
    const relativeY = touch.clientY - rect.top;
    const sectionHeight = 40;
    const sectionIndex = Math.floor(relativeY / sectionHeight);
    if (sectionIndex >= 0 && sectionIndex < sections.length) {
      const newSection = sections[sectionIndex];
      if (hoveredSection?.id !== newSection.id) {
        setHoveredSection(newSection);
        onLetterClick(newSection.id, false);
        triggerHaptic();
      }
    }
  };

  const handleTouchEnd = () => {
    cancelPress();
    if (!longPressTriggered.current && pressedSection.current) {
      onLetterClick(pressedSection.current.id, true);
    } else if (isDragging && hoveredSection) {
      onLetterClick(hoveredSection.id, true);
    }
    setIsDragging(false);
    setHoveredSection(null);
    pressedSection.current = null;
  };

  return (
    <div
      className="fixed top-1/2 transform -translate-y-1/2 z-50"
      style={{ right: "4px" }}
    >
      <div
        ref={alphabetRef}
        className="flex flex-col items-center space-y-3 py-4 px-2"
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {sections.map((section) => {
          const isHovered = hoveredSection?.id === section.id;
          return (
            <button
              key={section.id}
              onTouchStart={(e) => handleTouchStart(e, section)}
              className={`w-9 h-9 flex items-center justify-center text-base font-bold rounded-lg select-none transition-all duration-200 shadow-md`}
              style={{
                backgroundColor: isHovered ? section.color : "#FFF5C2",
                color: isHovered ? "#FFF5C2" : "#101434",
                boxShadow: isHovered
                  ? "0 4px 10px rgba(0,0,0,0.3)"
                  : "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              {section.letter}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollingAlphabet;
