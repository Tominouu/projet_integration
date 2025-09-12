import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client";
import Home from "./Home";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import './index.css'
import Choix from "./pages/Choice.jsx";
import Infos from "./pages/Info.jsx";
import QuizGlobal from "./pages/quizGlobal.jsx";
import Resultats from "./pages/Resultats.jsx";
import Globe from "./pages/GlobeViewer.jsx";
import App from './App.jsx'
import PageTransition from './components/PageTransition.jsx'

function RoutedApp(){
  const location = useLocation()
  return (
    <>
      <PageTransition pathname={location.pathname} />
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/globe" element={<Globe />} />
        <Route path="/choix" element={<Choix />} />
        <Route path="/infos" element={<Infos />} />
        <Route path="/quizglobal" element={<QuizGlobal />} />
        <Route path="/resultats" element={<Resultats />} />
      </Routes>
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <RoutedApp />
    </BrowserRouter>
  </StrictMode>,
)
