import React, { useState, useEffect } from 'react'; // Importa useState e useEffect
import { db } from '../firebase'; // Importa a instância do Firestore
import { collection, getDocs } from 'firebase/firestore'; // Importa funções do Firestore
import './Courses.css';

function Courses() {
    const [courses, setCourses] = useState([]); // Estado para armazenar os cursos
    const [isLoading, setIsLoading] = useState(true); // Estado de carregamento
    const [error, setError] = useState(null); // Estado para erros

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'courses'));
                const fetchedCourses = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setCourses(fetchedCourses);
            } catch (err) {
                console.error('Erro ao buscar cursos:', err);
                setError('Erro ao carregar os cursos. Tente novamente.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (isLoading) {
        return <div className="courses-container">A carregar cursos...</div>;
    }

    if (error) {
        return <div className="courses-container error-message">{error}</div>;
    }

    return (
        <div className="courses-container">
            <h1>Cursos e Aulas Particulares</h1>
            <p>
                Oferecemos uma variedade de cursos e aulas particulares para impulsionar o seu conhecimento e habilidades.
                Seja para finanças, carreira ou desenvolvimento pessoal, temos a opção certa para si.
            </p>
            <div className="course-card-grid">
                {courses.length === 0 ? (
                    <p>Nenhum curso disponível no momento.</p>
                ) : (
                    courses.map(course => (
                        <div className="course-card" key={course.id}>
                            {course.imageUrl && <img src={course.imageUrl} alt={course.title} className="course-card-image" />}
                            <h3>{course.title}</h3>
                            <p>{course.description}</p>
                            <button className="course-button" onClick={() => alert('Detalhes do curso: ' + course.title)}>Saiba Mais</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Courses;