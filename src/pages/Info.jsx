import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bckimg from "../assets/pano.png";

// ------------------ CARROUSEL ÉCOUTER ------------------
const EcouterCarousel = () => {
  const slides = [
    {
      title: "Les quais",
      text: "Les quais de Bordeaux, « port de la Lune », mêlent mémoire des négociants et dockers d’hier aux joggeurs, cyclistes et promeneurs d’aujourd’hui.",
      image:
        "https://www.sncf-connect.com/assets/styles/scale_max_width_961/public/media/2022-10/bordeaux-miroir-d-eau.jpg?itok=EF24q8ma",
    },
    {
      title: "La Garonne",
      text: "Fleuve puissant et imprévisible, la Garonne rythme Bordeaux par ses marées, ses crues et son mascaret.",
      image:
        "https://www.bougerabordeaux.com/wp-content/uploads/2025/07/garonne-scaled-1.jpeg",
    },
    {
      title: "Les capucins",
      text: "Le marché des Capucins, surnommé « le ventre de Bordeaux », vibre de voix, d’odeurs et de couleurs.",
      image:
        "https://media.sudouest.fr/13081786/1000x625/sudouest-photo-1-32154012-1600.jpg?v=1700822902",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      {/* Image + swipe */}
      <div
        className="mb-4 relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={slides[current].image}
          alt={slides[current].title}
          className="w-full h-56 object-cover rounded-2xl shadow-lg cursor-pointer"
          onClick={nextSlide}
        />
        {/* Indicateurs ronds */}
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
        <h2 className="text-2xl font-extrabold mb-3 text-white tracking-wide">
          {slides[current].title}
        </h2>
        <p className="text-base leading-relaxed text-white">
          {slides[current].text}
        </p>
      </div>

      {/* Flèches en dessous */}
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

// ------------------ CARROUSEL "SE COMPRENDRE" ------------------
const SeComprendreCarousel = () => {
  const slides = [
    {
      name: "Montesquieu",
      text: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://www.worldhistory.org/uploads/images/18101.jpg",
    },
    {
      name: "Michel de Montaigne",
      text: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIOL_zZO0YOBpBSIMZOSpXps8hkTkPKVzMCw&s",
    },
    {
      name: "Jacques Ellul",
      text: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://img.mapado.net/2024/2/21/65d5b9bae09b5-jacques-ellul-un-homme-engage-jean-ellul.jpeg_thumbs/500-500.jpeg",
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
    <div className="max-w-md mx-auto">
      {/* Carte affichée */}
      <div className="bg-[#FFD9C0] rounded-2xl p-4 mb-6 shadow-md flex items-center space-x-4">
        <img
          src={slides[current].image}
          alt={slides[current].name}
          className="w-20 h-20 object-cover rounded-lg"
        />
        <div>
          <h3 className="text-xl font-bold" style={{ color: "#6C0F26" }}>
            {slides[current].name}
          </h3>
          <p className="text-sm text-gray-800">{slides[current].text}</p>
        </div>
      </div>

      {/* Flèches */}
      <div className="flex justify-between mt-4">
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

// ------------------ PANORAMA CONNAÎTRE ------------------
const PanoramaScroller = () => {
  const panoRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const pano = panoRef.current;

    gsap.to(pano, {
      backgroundPosition: "100% center",
      ease: "none",
      scrollTrigger: {
        trigger: pano,
        start: "center center",
        end: "+=2000",
        scrub: true,
        pin: true,
        pinSpacing: true,
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div
      ref={panoRef}
      className="w-full"
      style={{
        width: "100%",
        height: "300px",
        backgroundImage: `url(${bckimg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "0% center",
      }}
    ></div>
  );
};

// ------------------ PAGE PRINCIPALE ------------------
const ScrollingAlphabet = () => {
  const [selectedSection, setSelectedSection] = useState(null);

  const sections = [
    { letter: "E", title: "Écouter", id: "ecouter" },
    { letter: "C", title: "Connaître", id: "connaitre" },
    { letter: "C", title: "Comprendre", id: "comprendre" },
    { letter: "S", title: "Se comprendre", id: "se-comprendre" },
    { letter: "C", title: "Communiquer", id: "communiquer" },
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
          className="text-5xl md:text-6xl font-extrabold text-center mb-16"
          style={{ color: "#6C0F26" }}
        >
          Guide de Communication
        </h1>

        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="mb-20 scroll-mt-24"
          >
            <div className="px-4">
              <div className="flex items-center mb-6">
                <h2
                  className="text-3xl font-bold relative"
                  style={{ color: "#6C0F26" }}
                >
                  {section.title}
                </h2>
              </div>
              {section.id === "ecouter" ? (
                <EcouterCarousel />
              ) : section.id === "connaitre" ? (
                <PanoramaScroller />
              ) : section.id === "se-comprendre" ? (
                <SeComprendreCarousel />
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

      <AlphabetNavigation
        sections={sections}
        onLetterClick={scrollToSection}
        selectedSection={selectedSection}
      />
    </div>
  );
};

// ------------------ MENU ALPHABET NIAGARA ------------------
const AlphabetNavigation = ({ sections, onLetterClick, selectedSection }) => {
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
    <div className="fixed right-2 top-1/2 transform -translate-y-1/2 z-50">
      <div
        ref={alphabetRef}
        className="flex flex-col items-center space-y-3 py-4 px-2"
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {sections.map((section) => {
          const isActive = selectedSection?.id === section.id;
          const isHovered = hoveredSection?.id === section.id;

          return (
            <button
              key={section.id}
              onTouchStart={(e) => handleTouchStart(e, section)}
              onClick={() => onLetterClick(section.id, true)}
              className="w-9 h-9 flex items-center justify-center text-base font-bold rounded-lg select-none transition-all duration-200"
              style={{
                backgroundColor: isActive
                  ? "#6C0F26"
                  : isHovered
                  ? "#6C0F26"
                  : "#ffffffff",
                color: isActive || isHovered ? "#FFF5C2" : "#101434",
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
