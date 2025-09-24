import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css'; // Estilos para a página de registo

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('As palavras-passe não correspondem!');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Registo efetuado com sucesso!');
      navigate('/'); // Redireciona para a página inicial após o registo
    } catch (err) {
      console.error('Erro no registo:', err.message);
      setError(err.message);
    }
  };

  return (
    <div className="register-container">
      <h1>Registar</h1>
      <form onSubmit={handleRegister} className="register-form">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Palavra-passe:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="confirmPassword">Confirmar Palavra-passe:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="register-button">Registar</button>
      </form>
    </div>
  );
}

export default RegisterPage;
