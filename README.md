# Own Project

Welcome to the Own Project! This application is a React-based web platform designed to provide a comprehensive suite of adult simulators, private courses, and a dedicated contact area. It features a modern, responsive design and integrates Firebase for user authentication (login/registration) and password recovery.

## Table of Contents

-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
    -   [Running the Application](#running-the-application)
-   [Project Structure](#project-structure)
-   [Firebase Configuration](#firebase-configuration)
-   [Pages & Components](#pages--components)
-   [Responsiveness](#responsiveness)
-   [Contact](#contact)

## Features

-   **Adult Simulators Page:** A dedicated section featuring various interactive simulators with elegant, detailed cards and modal pop-ups for each simulator.
-   **Courses Page:** Information about available courses and private lessons.
-   **Contact Page:** A functional contact form for user inquiries.
-   **User Authentication:** Secure login and registration system using Firebase.
-   **Password Recovery:** Allows users to reset their forgotten passwords via email.
-   **Responsive Design:** Optimized for seamless viewing and interaction across various devices (desktops, tablets, and mobile phones).
-   **Modern UI:** Clean and appealing design with vibrant colors.
-   **Global Header & Footer:** Consistent navigation and branding across all pages.

## Technologies Used

-   **React:** Frontend JavaScript library for building user interfaces.
-   **Vite:** Fast frontend tooling for development.
-   **React Router DOM:** For declarative routing in the application.
-   **Material-UI (MUI):** UI library for React components and styling (e.g., AppBar, Icons).
-   **Firebase Authentication:** Google's authentication service for managing user accounts.
-   **CSS Modules (or inline CSS with MUI `sx` prop):** For component-scoped styling and global styles.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Make sure you have Node.js and npm (or Yarn) installed on your machine.

-   [Node.js](https://nodejs.org/) (LTS version recommended)
-   [npm](https://www.npmjs.com/get-npm) (comes with Node.js) or [Yarn](https://yarnpkg.com/getting-started/install)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd oenproject
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Firebase Setup:**
    Ensure your Firebase project is correctly set up. The `src/firebase.js` file already contains your project configuration.
    **Important:** Verify that the "Password reset" email template is enabled in your Firebase Console (`Authentication > Templates`).

### Running the Application

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will typically run on `http://localhost:5173`. Open this URL in your browser.

## Project Structure

The project follows a standard React application structure, with a focus on modularity:

-   `src/`: Main application source code.
    -   `assets/`: Static assets.
    -   `components/`: Reusable UI components (e.g., `AppBar`, `Footer`, `SimulatorCard`).
        -   `components/simulators/`: Individual simulator components.
    -   `context/`: React Context for global state management (e.g., `AuthContext`).
    -   `pages/`: Top-level components representing different pages (e.g., `Home`, `AdultSimulatorsPage`, `LoginPage`).
    -   `App.jsx`: Main application component, handles routing.
    -   `index.css`: Global CSS styles.
    -   `main.jsx`: Entry point for the React application.
    -   `firebase.js`: Firebase configuration and initialization.

## Firebase Configuration

Your Firebase configuration is located in `src/firebase.js`. It is pre-configured with the necessary API keys and project IDs. Ensure that Firebase Authentication is enabled in your Firebase project console.

## Pages & Components

-   **Home Page (`/`):** A welcoming landing page with a brief overview and a call to action.
-   **Simulators Page (`/simuladores`):** Displays interactive simulator cards. Each card opens a modal with the respective simulator component.
-   **Courses Page (`/cursos`):** Presents information about available courses with descriptive cards.
-   **Contact Page (`/contacte-nos`):** A form for users to send inquiries.
-   **Login Page (`/login`):** Allows existing users to sign in. Includes a link to password recovery.
-   **Register Page (`/register`):** Enables new users to create an account.
-   **Reset Password Page (`/reset-password`):** Provides a form to request a password reset email.
-   **AppBar:** Navigation bar with dynamic links for authentication (Login/Register or Logout).
-   **Footer:** Consistent footer with navigation links, social media icons, and copyright information.
-   **Modal:** Reusable component for displaying simulator content.
-   **SimulatorCard:** Component for displaying individual simulator details.

## Responsiveness

The application is fully responsive, adapting its layout and elements to provide an optimal viewing experience across a wide range of devices, from desktops to mobile phones.

## Contact

For any questions or feedback, please reach out via the contact form on the website.