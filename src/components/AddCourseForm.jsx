import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import './AddCourseForm.css';

function AddCourseForm({ onCourseAdded, onClose }) {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage('');

    if (!title.trim() || !description.trim() || !content.trim()) {
      setError('Por favor, preencha todos os campos obrigatórios (Título, Descrição, Conteúdo).');
      return;
    }

    if (!currentUser) {
      setError('Erro: Utilizador não autenticado.');
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'courses'), {
        title,
        description,
        content,
        imageUrl,
        creatorId: currentUser.uid, // Associa o curso ao ID do utilizador criador
        createdAt: serverTimestamp(),
      });
      setMessage('Curso adicionado com sucesso!');
      setTitle('');
      setDescription('');
      setContent('');
      setImageUrl('');
      if (onCourseAdded) onCourseAdded(); // Notifica o componente pai
      onClose(); // Fecha o formulário/modal
    } catch (err) {
      console.error('Erro ao adicionar curso:', err);
      setError('Erro ao adicionar o curso. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-course-form-container">
      <h2>Adicionar Novo Curso</h2>
      <form onSubmit={handleSubmit} className="add-course-form">
        <div className="form-group">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descrição:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="content">Conteúdo:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">URL da Imagem (Opcional):</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}

        <div className="form-actions">
          <button type="submit" disabled={isSubmitting} className="submit-button">
            {isSubmitting ? 'A Adicionar...' : 'Adicionar Curso'}
          </button>
          <button type="button" onClick={onClose} className="cancel-button">Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default AddCourseForm;
