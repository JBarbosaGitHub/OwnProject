import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker'; // Importa o DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Importa o CSS do DatePicker
import './ProfilePage.css';

function ProfilePage() {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null); // Alterado para objeto Date
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  // Função auxiliar para converter string DD/MM/YYYY para objeto Date
  const parseDateString = (dateString) => {
    if (!dateString) return null;
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day); // Mês é 0-indexado
  };

  // Função auxiliar para formatar objeto Date para string DD/MM/YYYY
  const formatDateObject = (dateObject) => {
    if (!dateObject) return '';
    return dateObject.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  useEffect(() => {
    if (!loading && !currentUser) {
      navigate('/login');
    }

    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setName(userData.name);
            setEmail(userData.email);
            // Converte a string DD/MM/YYYY para Date object
            setDateOfBirth(parseDateString(userData.dateOfBirth));
          } else {
            setEmail(currentUser.email);
            // Pode ser um utilizador antigo sem dados extra, ou registado antes da alteração
            // Definir data de nascimento como null para evitar erros
            setDateOfBirth(null);
          }
        } catch (err) {
          console.error('Erro ao buscar dados do utilizador:', err);
          setError('Erro ao carregar os dados do perfil.');
        }
      }
    };

    fetchUserData();
  }, [currentUser, loading, navigate]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage('');

    if (!name.trim()) {
      setError('O nome não pode estar vazio.');
      return;
    }

    if (!dateOfBirth) {
      setError('A data de nascimento não pode estar vazia.');
      return;
    }

    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      // Formata a data de volta para string DD/MM/YYYY antes de atualizar
      await updateDoc(userDocRef, {
        name: name,
        dateOfBirth: formatDateObject(dateOfBirth),
      });
      setMessage('Perfil atualizado com sucesso!');
      setIsEditing(false);
    } catch (err) {
      console.error('Erro ao atualizar perfil:', err);
      setError('Erro ao atualizar os dados do perfil.');
    }
  };

  if (loading) {
    return <div className="profile-loading">A carregar perfil...</div>;
  }

  if (!currentUser) {
    return null;
  }

  return (
    <div className="profile-container">
      <h1>Perfil do Utilizador</h1>
      <form onSubmit={handleUpdateProfile} className="profile-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} disabled className="disabled-input" />
        </div>

        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isEditing}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dateOfBirth">Data de Nascimento:</label>
          {!isEditing ? (
            <input
              type="text"
              id="dateOfBirth"
              value={formatDateObject(dateOfBirth)}
              disabled
              className="disabled-input"
            />
          ) : (
            <DatePicker
              id="dateOfBirth"
              selected={dateOfBirth}
              onChange={(date) => setDateOfBirth(date)}
              dateFormat="dd/MM/yyyy"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              placeholderText="DD/MM/YYYY"
              required
              className="react-datepicker-custom-input"
            />
          )}
        </div>

        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}

        {!isEditing ? (
          <button type="button" onClick={() => setIsEditing(true)} className="edit-button">Editar Perfil</button>
        ) : (
          <div className="edit-actions">
            <button type="submit" className="save-button">Guardar Alterações</button>
            <button type="button" onClick={() => {
              setIsEditing(false);
              setError(null);
              setMessage('');
              if (currentUser) {
                const userDocRef = doc(db, 'users', currentUser.uid);
                getDoc(userDocRef).then(userDocSnap => {
                  if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    setName(userData.name);
                    // Converte a string DD/MM/YYYY para Date object ao cancelar edição
                    setDateOfBirth(parseDateString(userData.dateOfBirth));
                  } else {
                    setName('');
                    setDateOfBirth(null);
                  }
                }).catch(err => console.error('Erro ao recarregar dados:', err));
              }
            }} className="cancel-button">Cancelar</button>
          </div>
        )}
      </form>
    </div>
  );
}

export default ProfilePage;
