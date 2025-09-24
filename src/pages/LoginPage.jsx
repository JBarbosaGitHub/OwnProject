import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css'; // Estilos para a página de login

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login efetuado com sucesso!');
      navigate('/'); // Redireciona para a página inicial após o login
    } catch (err) {
      console.error('Erro no login:', err.message);
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="login-form">
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

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="login-button">Entrar</button>
        <p className="forgot-password-link"><Link to="/reset-password">Esqueceu-se da password?</Link></p>
        <p className="register-link">Não tem uma conta? <Link to="/register">Registe-se aqui</Link></p>
      </form>
    </div>
  );
}

export default LoginPage;
