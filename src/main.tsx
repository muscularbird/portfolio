import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './routes/App.tsx'
import Navbar from './components/navbar-components/navbar.tsx'
import Project from "./routes/Project.tsx";
import Projects from "./routes/Projects.tsx";
import About from "./routes/About.tsx";

function AppLayout() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<App />} />
        <Route path="/projects/:projectName" element={<Project />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>,
)
