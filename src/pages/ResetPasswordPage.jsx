import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './ResetPasswordPage.css'; // Estilos para a página de recuperação

function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError(null);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Um email de recuperação de password foi enviado para o seu endereço!');
      setEmail(''); // Limpa o campo de email
    } catch (err) {
      console.error('Erro ao enviar email de recuperação:', err.message);
      setError(err.message);
    }
  };

  return (
    <div className="reset-password-container">
      <h1>Recuperar Palavra-passe</h1>
      <p>Insira o seu endereço de email para receber um link de recuperação da password.</p>
      <form onSubmit={handleResetPassword} className="reset-password-form">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="reset-password-button">Enviar Link de Recuperação</button>
      </form>
    </div>
  );
}

export default ResetPasswordPage;
