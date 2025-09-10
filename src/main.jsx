import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import Choix from "./pages/Choice.jsx";
import Infos from "./pages/Info.jsx";
import QuizGlobal from "./pages/quizGlobal";
import App from './App.jsx'
//import Home from "./Home";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> {/* 👈 nouvelle page */}

        <Route path="/choix" element={<Choix />} />
        <Route path="/infos" element={<Infos />} />
        <Route path="/quizglobal" element={<QuizGlobal />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
