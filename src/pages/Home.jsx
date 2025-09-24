import React from "react";
import { Link } from 'react-router-dom';

import './Home.css';

function Home() {
    return (
        <div className="home-container">
            <h1>Bem-vindo ao INPI Project</h1>
            <img src="https://www.fmt.se/wp-content/uploads/2023/02/logo-placeholder-image.png" alt="placeholder"/>
            <p>
                Explore os nossos simuladores, cursos e aulas particulares.
                <br/>
                Descubra novas oportunidades e planeie o seu futuro com as nossas ferramentas interativas.
            </p>
            <Link to="/simuladores">
              <button className="home-button">Ver Simuladores</button>
            </Link>
        </div>
    )
}

export default Home;