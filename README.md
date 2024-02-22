# Workout Planner | NextJS Web App

## Table of Contents

1. [About the Project](#about-the-project)
2. [Live Demo](#live-demo)
3. [Folder Structure](#folder-structure)
4. [Technologies](#technologies)
5. [Getting Started](#getting-started)

## About the Project

Workout Planner is a web application designed to help users create, manage, and track their workout routines efficiently. Built with NextJS and TypeScript, it leverages Firebase for backend services including authentication, database, and hosting. The UI is crafted using NextUI, providing a modern and responsive user experience.

## Live Demo

Experience the app in action [here](https://workout-balancer.netlify.app/).

## Folder Structure

- `_components/`: Reusable UI components.
- `_firebase/`: Firebase configurations and utilities.
- `_providers/`: Context providers for state management.
- `_types/`: TypeScript type definitions and interfaces.
- `pages/`: Routes and pages of the application, following Next.js conventions.

## Technologies

This project is built using a range of technologies and libraries, specifically chosen for their efficiency and scalability:

### Frontend

- **NextJS**: A React framework for building server-rendered apps, ensuring fast load times and SEO friendliness.
- **TypeScript**: Provides strong typing to enhance code quality and maintainability.
- **NextUI**: A modern UI library for React, used to design a user-friendly interface.
- **SWR**: For data fetching, caching, and state management, optimized for React and NextJS.

### Backend

- **Firebase**:
  - Firestore: A NoSQL database for storing and syncing data in real-time.
  - Authentication: Manages user sign-up, sign-in, and security.

## Prerequisites

Before you begin, ensure you have a [Firebase account](https://firebase.google.com/). You'll need it to set up the backend services for this project.

## Getting Started

To get a local copy up and running, follow these simple steps:

1. Clone the repository:
`git clone https://github.com/Jaron-S/workout-planner.git`
3. Install NPM packages:
`npm install`
5. Set up your Firebase project and configure the environment variables in a `.env.local` file as follows:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```
6. Run the development server:
`npm run dev`
7. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

For detailed instructions on configuration and deployment, refer to the official NextJS and Firebase documentation.
