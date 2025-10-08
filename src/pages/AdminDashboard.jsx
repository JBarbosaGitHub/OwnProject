import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore'; // Importa deleteDoc
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import AddCourseForm from '../components/AddCourseForm';
import EditCourseForm from '../components/EditCourseForm';
import './AdminDashboard.css';

function AdminDashboard() {
  const { currentUser, loading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [error, setError] = useState(null);
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [isEditCourseModalOpen, setIsEditCourseModalOpen] = useState(false);
  const [selectedCourseForEdit, setSelectedCourseForEdit] = useState(null);

  const fetchCourses = async () => {
    if (!currentUser || !isAdmin) return;

    setIsLoadingCourses(true);
    setError(null);
    try {
      const q = query(collection(db, 'courses'), where('creatorId', '==', currentUser.uid));
      const querySnapshot = await getDocs(q);
      const fetchedCourses = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCourses(fetchedCourses);
    } catch (err) {
      console.error('Erro ao buscar cursos:', err);
      setError('Erro ao carregar os cursos.');
    } finally {
      setIsLoadingCourses(false);
    }
  };

  useEffect(() => {
    if (loading) return;

    if (!currentUser || !isAdmin) {
      navigate('/');
      return;
    }

    fetchCourses();
  }, [currentUser, loading, isAdmin, navigate]);

  const handleAddCourseClick = () => {
    setIsAddCourseModalOpen(true);
  };

  const handleCloseAddCourseModal = () => {
    setIsAddCourseModalOpen(false);
  };

  const handleCourseAdded = () => {
    fetchCourses();
    handleCloseAddCourseModal();
  };

  const handleEditClick = (course) => {
    setSelectedCourseForEdit(course);
    setIsEditCourseModalOpen(true);
  };

  const handleCloseEditCourseModal = () => {
    setIsEditCourseModalOpen(false);
    setSelectedCourseForEdit(null);
  };

  const handleCourseUpdated = () => {
    fetchCourses();
    handleCloseEditCourseModal();
  };

  const handleDeleteClick = async (courseId, creatorId) => {
    if (!currentUser || currentUser.uid !== creatorId) {
      alert('Você não tem permissão para excluir este curso.');
      return;
    }

    if (window.confirm('Tem certeza que deseja excluir este curso?')) {
      try {
        await deleteDoc(doc(db, 'courses', courseId));
        alert('Curso excluído com sucesso!');
        fetchCourses(); // Recarrega os cursos após a exclusão
      } catch (err) {
        console.error('Erro ao excluir curso:', err);
        alert('Erro ao excluir o curso. Tente novamente.');
      }
    }
  };

  if (loading || isLoadingCourses) {
    return <div className="admin-dashboard-loading">A carregar dashboard...</div>;
  }

  if (!currentUser || !isAdmin) {
    return null;
  }

  return (
    <div className="admin-dashboard-container">
      <h1>Gestão de Cursos</h1>
      <button onClick={handleAddCourseClick} className="add-course-button">
        Adicionar Novo Curso
      </button>
      {error && <p className="error-message">{error}</p>}

      {courses.length === 0 ? (
        <p>Ainda não criou nenhum curso.</p>
      ) : (
        <div className="courses-list">
          {courses.map(course => (
            <div key={course.id} className="course-item">
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <div className="course-actions">
                <button onClick={() => handleEditClick(course)} className="edit-button">Editar</button>
                <button onClick={() => handleDeleteClick(course.id, course.creatorId)} className="delete-button">Excluir</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={isAddCourseModalOpen} onClose={handleCloseAddCourseModal}>
        <AddCourseForm onCourseAdded={handleCourseAdded} onClose={handleCloseAddCourseModal} />
      </Modal>

      {selectedCourseForEdit && (
        <Modal isOpen={isEditCourseModalOpen} onClose={handleCloseEditCourseModal}>
          <EditCourseForm course={selectedCourseForEdit} onCourseUpdated={handleCourseUpdated} onClose={handleCloseEditCourseModal} />
        </Modal>
      )}
    </div>
  );
}

export default AdminDashboard;
