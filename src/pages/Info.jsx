import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import bckimg from '/frise.png'
import '../pages/styles/quiz-skin.css'
import './styles/home.css'
import './styles/info.css'

const ExitFab = () => (
    <Link className="quiz-exit-fab" to="/" aria-label="Accueil" title="Accueil">
        <svg viewBox="0 0 24 24" width="64" height="64" aria-hidden>
            <path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12 5.7 16.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4Z" />
        </svg>
    </Link>
)

// ------------------ CARROUSEL ÉCOUTER ------------------
const EcouterCarousel = () => {
    const slides = [
        {
            title: "Les quais",
            text: "Les quais de Bordeaux, « port de la Lune », mêlent mémoire des négociants et dockers d’hier aux joggeurs, cyclistes et promeneurs d’aujourd’hui.",
            image:
                "https://www.sncf-connect.com/assets/styles/scale_max_width_961/public/media/2022-10/bordeaux-miroir-d-eau.jpg?itok=EF24q8ma",
            link: "/globe1"
        },
        {
            title: "La Garonne",
            text: "Fleuve puissant et imprévisible, la Garonne rythme Bordeaux par ses marées, ses crues et son mascaret.",
            image:
                "https://www.bougerabordeaux.com/wp-content/uploads/2025/07/garonne-scaled-1.jpeg",
            link: "/globe2"
        },
        {
            title: "Les capucins",
            text: "Le marché des Capucins, surnommé « le ventre de Bordeaux », vibre de voix, d’odeurs et de couleurs.",
            image:
                "https://media.sudouest.fr/13081786/1000x625/sudouest-photo-1-32154012-1600.jpg?v=1700822902",
            link: "/globe3"
        },
    ];

    const [current, setCurrent] = useState(0)
    const [dir, setDir] = useState(1) // 1 next, -1 prev
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

        const prevSlide = () => {
            setDir(-1)
            setCurrent(p => p === 0 ? slides.length - 1 : p - 1)
        }

        const nextSlide = () => {
            setDir(1)
            setCurrent(p => p === slides.length - 1 ? 0 : p + 1)
        }

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
            <div className="info-card">
                <div className="info-carousel" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
                    <Link to={slides[current].link}>
                        <img
                            key={current}
                            src={slides[current].image}
                            alt={slides[current].title}
                            className={`info-img ${dir === 1 ? 'anim-next' : 'anim-prev'}`}
                            style={{ cursor: 'pointer' }}
                        />
                    </Link>
                    <div className="info-dots">
                        {slides.map((_, i) => <span key={i} className={i === current ? 'dot dot--active' : 'dot'} />)}
                    </div>
                </div>
                <div key={current + '-t'} className={`info-text ${dir === 1 ? 'anim-next' : 'anim-prev'}`}>
                    <h3>{slides[current].title}</h3>
                    <p>{slides[current].text}</p>
                </div>
                <div className="info-arrows">
                    <button onClick={prevSlide} aria-label="Précédent">←</button>
                    <button onClick={nextSlide} aria-label="Suivant">→</button>
                </div>
            </div>
        )
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

    const [current, setCurrent] = useState(0)
    const [dir, setDir] = useState(1)

    const prevSlide = () => { setDir(-1); setCurrent(p => p === 0 ? slides.length -1 : p -1) }
    const nextSlide = () => { setDir(1); setCurrent(p => p === slides.length -1 ? 0 : p +1) }

        return (
                    <div className="info-mini-carousel">
                    <div key={current} className={`mini-card ${dir===1?'anim-next':'anim-prev'}`}>
                        <img src={slides[current].image} alt={slides[current].name} />
                        <div className="mini-body">
                            <h4>{slides[current].name}</h4>
                            <p>{slides[current].text}</p>
                        </div>
                    </div>
                <div className="info-arrows small">
                    <button onClick={prevSlide} aria-label="Précédent">←</button>
                    <button onClick={nextSlide} aria-label="Suivant">→</button>
                </div>
            </div>
        )
};
// ------------------ PANORAMA CONNAÎTRE ------------------ 
const PanoramaScroller = () => {
  const panoRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [bgX, setBgX] = useState(0);

  useEffect(() => {
    const pano = panoRef.current;

    const handlePointerDown = (e) => {
      setIsDragging(true);
      setStartX(e.clientX || e.touches?.[0]?.clientX);
    };

const handlePointerMove = (e) => {
  if (!isDragging) return;
  const currentX = e.clientX || e.touches?.[0]?.clientX;
  const deltaX = currentX - startX;

  const sensitivity = 0.3; // <-- vitesse augmentée
  let newBgX = bgX - deltaX * sensitivity; // <-- inversion du sens

  newBgX = Math.max(0, Math.min(100, newBgX));

  setBgX(newBgX);
  gsap.to(pano, {
    backgroundPosition: `${newBgX}% center`,
    duration: 0.2,
    ease: "power2.out",
  });

  setStartX(currentX);
};


    const handlePointerUp = () => {
      setIsDragging(false);
    };

    pano.addEventListener("pointerdown", handlePointerDown);
    pano.addEventListener("pointermove", handlePointerMove);
    pano.addEventListener("pointerup", handlePointerUp);
    pano.addEventListener("pointerleave", handlePointerUp);

    pano.addEventListener("touchstart", handlePointerDown);
    pano.addEventListener("touchmove", handlePointerMove);
    pano.addEventListener("touchend", handlePointerUp);

    return () => {
      pano.removeEventListener("pointerdown", handlePointerDown);
      pano.removeEventListener("pointermove", handlePointerMove);
      pano.removeEventListener("pointerup", handlePointerUp);
      pano.removeEventListener("pointerleave", handlePointerUp);

      pano.removeEventListener("touchstart", handlePointerDown);
      pano.removeEventListener("touchmove", handlePointerMove);
      pano.removeEventListener("touchend", handlePointerUp);
    };
  }, [isDragging, startX, bgX]);

return (
  <div
    ref={panoRef}
    className="w-full cursor-grab active:cursor-grabbing"
    style={{
      width: "auto",
      height: "80vh",
      backgroundImage: `url(${bckimg})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "auto 100%",   // <-- au lieu de "cover"
      backgroundPosition: `${bgX}% center`,
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
            <div className="info-root">
                <AlphabetNavigation sections={sections} onLetterClick={scrollToSection} selectedSection={selectedSection} />
                <h1 className="info-title">Guide de Communication</h1>
                {sections.map(s => (
                    <section key={s.id} id={s.id} className="info-section">
                        <h2>{s.title}</h2>
                        {s.id === 'ecouter' ? <EcouterCarousel />
                            : s.id === 'connaitre' ? <PanoramaScroller />
                                : s.id === 'se-comprendre' ? <SeComprendreCarousel />
                                    : <p className="info-paragraph">Ceci est un paragraphe d’exemple pour la section <b>{s.title}</b>. Personnalisez ce texte.</p>}
                    </section>
                ))}
                <ExitFab />
            </div>
        )
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
            <div className="alpha-nav">
                <div ref={alphabetRef} className="alpha-stack" onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
                    {sections.map(sec => {
                        const active = selectedSection?.id === sec.id
                        const hover = hoveredSection?.id === sec.id
                        return (
                            <button key={sec.id} onTouchStart={(e) => handleTouchStart(e, sec)} onClick={() => onLetterClick(sec.id, true)} className={'alpha-btn' + (active ? ' is-active' : '') + (hover ? ' is-hover' : '')}>{sec.letter}</button>
                        )
                    })}
                </div>
            </div>
        )
};

export default ScrollingAlphabet;
