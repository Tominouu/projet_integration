import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import bckimg from '/frise.png'
import '../pages/styles/quiz-skin.css'
import './styles/home.css'
import './styles/info.css'


gsap.registerPlugin(ScrollTrigger, Draggable);

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
            text: "Les quais de Bordeaux, « port de la Lune », mêlent mémoire des négociants et dockers d’hier aux joggeurs, cyclistes et promeneurs d’aujourd’hui. Cliquez sur l'image pour les découvrir en 360° !",
            image:
                "https://www.sncf-connect.com/assets/styles/scale_max_width_961/public/media/2022-10/bordeaux-miroir-d-eau.jpg?itok=EF24q8ma",
            link: "/globe1"
        },
        {
            title: "La Garonne",
            text: "Fleuve puissant et imprévisible, la Garonne rythme Bordeaux par ses marées, ses crues et son mascaret.",
            image:
                "https://www.bougerabordeaux.com/wp-content/uploads/2025/07/garonne-scaled-1.jpeg",
        },
        {
            title: "Les capucins",
            text: "Le marché des Capucins, surnommé « le ventre de Bordeaux », vibre de voix, d’odeurs et de couleurs. Cliquez sur l'image pour les découvrir en 360° !",
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
            text: "Charles-Louis de Secondat, baron de Montesquieu (1689–1755), est un philosophe des Lumières étroitement lié à Bordeaux, sa ville natale. Issu d’une famille de magistrats, il hérite de la charge de président à mortier au parlement de Bordeaux, ce qui l’ancre dans la vie politique et judiciaire locale. Son œuvre majeure, De l’esprit des lois (1748), s’inspire en partie de ses observations sur les institutions bordelaises et la diversité des climats, qu’il relie à la théorie de la séparation des pouvoirs. Bordeaux, alors port dynamique ouvert sur le monde, influence sa réflexion sur le commerce, la liberté et la modération des gouvernements. Son héritage intellectuel reste marqué par cette double identité : penseur universel et enfant de la Garonne.",
            image:
                "https://www.worldhistory.org/uploads/images/18101.jpg",
        },
        {
            name: "Michel de Montaigne",
            text: "Michel de Montaigne (1533–1592), philosophe humaniste, fut maire de Bordeaux (1581–1585) et vécut près de la ville, dans son château de Périgord. C’est là qu’il écrivit ses Essais, mêlant observations locales et réflexions universelles. Bordeaux, centre intellectuel et politique, marqua sa pensée et son engagement pendant les guerres de Religion.",
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIOL_zZO0YOBpBSIMZOSpXps8hkTkPKVzMCw&s",
        },
        {
            name: "Jacques Ellul",
            text: "Jacques Ellul (1912–1994), philosophe bordelais, est célèbre pour sa critique de la technique moderne et de son emprise sur la société. Professeur à l’université de Bordeaux, il dénonce dans ses œuvres (La Technique ou l’Enjeu du siècle) l’aliénation de l’homme par la technologie et la propagande. Son pensée, ancrée dans le contexte local, reste une référence en sociologie et écologie politique.",
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
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const pano = panoRef.current;

    // Animation au scroll
    const scrollAnim = gsap.to(pano, {
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

    // Détection swipe horizontal
    let startX = 0;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = endX - startX;

if (Math.abs(diff) > 50) {
  setShowPopup(true);
  setTimeout(() => setShowPopup(false), 5000); // ⏱️ reste 5 secondes
}

    };

    pano.addEventListener("touchstart", handleTouchStart);
    pano.addEventListener("touchend", handleTouchEnd);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      scrollAnim?.kill();
      pano.removeEventListener("touchstart", handleTouchStart);
      pano.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div className="relative w-full">
      {/* Panorama */}
      <div
        ref={panoRef}
        className="w-full"
        style={{
          width: "auto",
          height: "80vh",
          backgroundImage: `url(${bckimg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "0% center",
        }}
      ></div>

      {/* Popup stylée */}
      {/* Popup FIXÉE à l’écran */}
{showPopup && (
  <div className="popup-toast-fixed">
    Faites défiler vers le bas pour explorer 👇
  </div>
)}

    </div>
  );
};


// ------------------ PAGE PRINCIPALE ------------------
const ScrollingAlphabet = () => {
    const [selectedSection, setSelectedSection] = useState(null);

    const sections = [
        { letter: "E", title: "Écouter", id: "ecouter" },
        { letter: "C", title: "Connaître et comprendre", id: "connaitre" },
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
                                    : <p className="info-paragraph">Communiquer Bordeaux, c’est entendre celles et ceux qui l’ont racontée ou peinte, de Montaigne à Mauriac, de Goya à Rosa Bonheur. Entre musées, rues animées et murs graffés, la ville mêle mémoire et création, donnant à chaque époque une voix nouvelle.</p>}
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
