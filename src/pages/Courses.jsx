import React from 'react';
import './Courses.css';

function Courses() {
    const courses = [
        {
            id: 1,
            title: 'Planeamento Financeiro Pessoal',
            description: 'Aprenda a gerir as suas finanças, a poupar e a investir para o futuro.',
            link: '#'
        },
        {
            id: 2,
            title: 'Introdução ao Investimento',
            description: 'Conheça os conceitos básicos de investimento e as principais opções do mercado.',
            link: '#'
        },
        {
            id: 3,
            title: 'Desenvolvimento de Carreira e Liderança',
            description: 'Desenvolva habilidades essenciais para avançar na sua carreira e liderar equipas.',
            link: '#'
        }
    ];

    return (
        <div className="courses-container">
            <h1>Cursos e Aulas Particulares</h1>
            <p>
                Oferecemos uma variedade de cursos e aulas particulares para impulsionar o seu conhecimento e habilidades.
                Seja para finanças, carreira ou desenvolvimento pessoal, temos a opção certa para si.
            </p>
            <div className="course-card-grid">
                {courses.map(course => (
                    <div className="course-card" key={course.id}>
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        <button className="course-button" onClick={() => window.location.href = course.link}>Saiba Mais</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Courses;