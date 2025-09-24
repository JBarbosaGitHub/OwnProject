import React from "react";
import './Contact.css';

function Contact() {
    return (
        <div className="contact-container">
            <h1>Fale Connosco!</h1>
            <p>
                Tem alguma dúvida, sugestão ou precisa de suporte? Entre em contacto connosco através do formulário abaixo.
                A Nossa equipa terá o prazer de o ajudar!
            </p>
            <form className="contact-form">
                <label htmlFor="name">Nome:</label>
                <input type="text" id="name" name="name" required />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="message">Mensagem:</label>
                <textarea id="message" name="message" required></textarea>

                <button type="submit">Enviar Mensagem</button>
            </form>
        </div>
    )
}

export default Contact;