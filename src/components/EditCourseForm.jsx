import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import './EditCourseForm.css'; // Usaremos um CSS dedicado, mas pode ser similar ao AddCourseForm.css

function EditCourseForm({ course, onCourseUpdated, onClose }) {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [content, setContent] = useState(course.content);
  const [imageUrl, setImageUrl] = useState(course.imageUrl || '');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Atualiza o estado interno se o curso prop mudar (ex: se o modal for reutilizado para outro curso)
  useEffect(() => {
    if (course) {
      setTitle(course.title);
      setDescription(course.description);
      setContent(course.content);
      setImageUrl(course.imageUrl || '');
      setError(null);
      setMessage('');
    }
  }, [course]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage('');

    if (!title.trim() || !description.trim() || !content.trim()) {
      setError('Por favor, preencha todos os campos obrigatórios (Título, Descrição, Conteúdo).');
      return;
    }

    if (!currentUser || currentUser.uid !== course.creatorId) {
      setError('Erro: Permissão negada. Você só pode editar seus próprios cursos.');
      return;
    }

    setIsSubmitting(true);
    try {
      const courseRef = doc(db, 'courses', course.id);
      await updateDoc(courseRef, {
        title,
        description,
        content,
        imageUrl,
      });
      setMessage('Curso atualizado com sucesso!');
      if (onCourseUpdated) onCourseUpdated(); // Notifica o componente pai
      onClose(); // Fecha o formulário/modal
    } catch (err) {
      console.error('Erro ao atualizar curso:', err);
      setError('Erro ao atualizar o curso. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="edit-course-form-container">
      <h2>Editar Curso</h2>
      <form onSubmit={handleSubmit} className="edit-course-form">
        <div className="form-group">
          <label htmlFor="edit-title">Título:</label>
          <input
            type="text"
            id="edit-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="edit-description">Descrição:</label>
          <textarea
            id="edit-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="edit-content">Conteúdo:</label>
          <textarea
            id="edit-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="edit-imageUrl">URL da Imagem (Opcional):</label>
          <input
            type="text"
            id="edit-imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}

        <div className="form-actions">
          <button type="submit" disabled={isSubmitting} className="submit-button">
            {isSubmitting ? 'A Atualizar...' : 'Guardar Alterações'}
          </button>
          <button type="button" onClick={onClose} className="cancel-button">Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default EditCourseForm;
