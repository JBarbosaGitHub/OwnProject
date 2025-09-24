import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdultSimulatorsPage from './pages/AdultSimulatorsPage';
import Courses from './pages/Courses';
import Contact from './pages/Contact';
import LoginPage from './pages/LoginPage'; // Importa a página de Login
import RegisterPage from './pages/RegisterPage'; // Importa a página de Registo
import ResetPasswordPage from './pages/ResetPasswordPage'; // Importa a página de recuperação
import Header from './components/Header'; // Import Header
import Footer from './components/Footer'; // Import Footer
import { AuthProvider } from './context/AuthContext'; // Importa AuthProvider
import './App.css';

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/simuladores" element={<AdultSimulatorsPage />} />
          <Route path="/cursos" element={<Courses />} />
          <Route path="/contacte-nos" element={<Contact />} />
          <Route path="/login" element={<LoginPage />} /> {/* Nova rota para Login */}
          <Route path="/register" element={<RegisterPage />} /> {/* Nova rota para Registo */}
          <Route path="/reset-password" element={<ResetPasswordPage />} /> {/* Nova rota para Recuperação de Password */}
        </Routes>
        <Footer />
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
