# 🎬 Movie Explorer App

A React application for searching and exploring movies using the TMDb API. This project allows users to search for movies, view details, and save their favorites.

---

## ✨ Features

- 🔍 **Search Functionality**: Search for movies by title.
- 🎛️ **Filtering Options**: Filter movies by genre, year, or rating.
- 📈 **Trending Movies**: Display popular movies from the TMDb API.
- 📝 **Movie Details**: View detailed info including overview, cast, and genres.
- ❤️ **Favorites Management**: Save and manage your favorite movies.
- 📱 **Responsive Design**: Mobile-first, responsive UI.
- 🌙 **Dark/Light Mode**: Toggle between dark and light themes.
- 🔁 **Infinite Scrolling**: Load more search results as users scroll (with optional Load More button).
- 💾 **Persistent Storage**: Save favorites and preferences in local storage.

---

## 🛠 Tech Stack

- **React** – Frontend library for building user interfaces.
- **React Router** – For client-side routing.
- **Material-UI (MUI)** – UI component library for styling and theming.
- **Axios** – Promise-based HTTP client for API requests.
- **Context API** – For global state management.
- **Local Storage** – To persist user data across sessions.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/movie-explorer-app.git
cd movie-explorer-app

# Install dependencies
npm install

# Create .env file for TMDb API key
echo "REACT_APP_TMDB_API_KEY=your_tmdb_api_key" > .env

# Start the development server
npm start
