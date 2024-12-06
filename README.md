MovieApp
MovieApp is a React-based web application that allows users to search for movies using the OMDb API, view detailed information about each movie, save their favorite movies, and toggle between light and dark themes for a personalized user experience.

Features
Search Movies: Search for movies by title using a responsive search bar with real-time updates (debounce mechanism).
Movie Details: View detailed information about movies, including title, genre, release year, plot, ratings, director, and actors.
Favorites: Save and remove favorite movies, with persistent storage in the browser's localStorage.
Pagination: Navigate through movie search results using a modern, responsive pagination system.
Theme Switcher: Toggle between light and dark themes.
Responsive Design: The app is fully responsive and adapts seamlessly to different screen sizes.
Live Demo
You can find a live demo of this project hosted at Live Demo Link (update with the actual link after deployment).

Tech Stack
React: A JavaScript library for building user interfaces.
React Router: For routing and navigation between pages.
Axios: For making HTTP requests to the OMDb API.
Ant Design (AntD): For UI components such as buttons, inputs, and pagination.
SCSS: For custom styling and maintaining a consistent design system.
Lodash: For debouncing the search functionality.
LocalStorage: To persist user favorites across sessions.
Project Structure
bash
Copy code
MovieApp/
│
├── src/
│ ├── components/ # Reusable UI components
│ │ ├── MovieCard.jsx # Displays individual movie cards
│ │ ├── Header.jsx # Application header with navigation and theme toggle
│ │ ├── Pagination.jsx # Custom pagination component
│ │
│ ├── views/ # Main pages
│ │ ├── Home.jsx # Home page with movie search and listing
│ │ ├── Favourites.jsx # Favourites page displaying saved movies
│ │ ├── MovieDetails.jsx # Detailed view of a movie
│ │
│ ├── Context/ # Context for global state management
│ │ ├── MainContext.jsx # Context for managing theme, movies, and favorites
│ │
│ ├── App.js # Main app entry point
│ ├── index.js # Renders the app to the DOM
│ └── styles/ # Global and component-specific SCSS
│
├── public/ # Public files
├── .env # API key and environment variables
├── package.json # Project dependencies and scripts
└── README.md # Project documentation
Getting Started
Prerequisites
Node.js (v14 or later)
npm or yarn
Setup Instructions
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/MovieApp.git
cd MovieApp
Install dependencies:

bash
Copy code
npm install

# OR

yarn install
Create an .env file in the root directory:

env
Copy code
REACT_APP_OMDB_API_KEY=your_api_key_here
Replace your_api_key_here with your OMDb API key. You can get a free API key from OMDb API.

Run the application:

bash
Copy code
npm start

# OR

yarn start
The app will be available at http://localhost:3000.

Run tests (if applicable):

bash
Copy code
npm test

# OR

yarn test
Third-Party Libraries
Ant Design
Why? To provide ready-to-use, modern, and customizable UI components such as buttons, inputs, and pagination, ensuring consistency and reducing development time.
Axios
Why? To handle HTTP requests to the OMDb API efficiently with built-in support for promises and error handling.
React Router
Why? For declarative routing and navigation between different views (Home, Movie Details, Favourites).
Lodash (Debounce)
Why? To optimize search functionality by limiting the frequency of API calls when the user types in the search bar.
SCSS
Why? For modular and maintainable styles, allowing us to create a clean and consistent design system.
