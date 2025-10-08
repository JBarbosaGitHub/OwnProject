import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker'; // Importa o DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Importa o CSS do DatePicker
import './RegisterPage.css';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null); // Alterado para null, para trabalhar com objetos Date
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validatePassword = (pwd) => {
    if (pwd.length < 8) {
      return 'A palavra-passe deve ter pelo menos 8 caracteres.';
    }
    if (!/[A-Z]/.test(pwd)) {
      return 'A palavra-passe deve conter pelo menos uma letra maiúscula.';
    }
    if (!/[a-z]/.test(pwd)) {
      return 'A palavra-passe deve conter pelo menos uma letra minúscula.';
    }
    if (!/[0-9]/.test(pwd)) {
      return 'A palavra-passe deve conter pelo menos um número.';
    }
    if (!/[^A-Za-z0-9]/.test(pwd)) {
      return 'A palavra-passe deve conter pelo menos um caractere especial.';
    }
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('As palavras-passe não correspondem!');
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (!name.trim()) {
      setError('Por favor, insira o seu nome.');
      return;
    }

    if (!dateOfBirth) {
      setError('Por favor, insira a sua data de nascimento.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Formata a data para DD/MM/YYYY antes de guardar no Firestore como string
      const formattedDateOfBirth = dateOfBirth.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' });

      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: email,
        dateOfBirth: formattedDateOfBirth,
      });

      alert('Registo efetuado com sucesso!');
      navigate('/');
    } catch (err) {
      console.error('Erro no registo:', err.message);
      setError(err.message);
    }
  };

  return (
    <div className="register-container">
      <h1>Registar</h1>
      <form onSubmit={handleRegister} className="register-form">
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="dateOfBirth">Data de Nascimento:</label>
        <DatePicker
          id="dateOfBirth"
          selected={dateOfBirth}
          onChange={(date) => setDateOfBirth(date)}
          dateFormat="dd/MM/yyyy"
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={100} // Mostra 100 anos no dropdown
          placeholderText="DD/MM/YYYY"
          required
          className="react-datepicker-custom-input"
        />

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
