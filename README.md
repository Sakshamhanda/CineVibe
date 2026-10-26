# CineVibe 🎬

A modern, responsive web application for discovering movies, exploring trending titles, and searching through curated cinema collections.

---

## 🌟 Features

- **Trending Movies**: Highlights top trending titles in a sleek, horizontal showcase.
- **Instant Search**: Real-time filtering by movie title, director, or cast.
- **Top Trending & Latest Releases**: Real-time data powered by TMDB API.
- **Responsive & Modern UI**: Built with a sleek dark theme, glassmorphism accents, and mobile-friendly layouts.

---

## 🛠️ Tech Stack

- **HTML5**: Semantic markup and structure
- **CSS3**: Vanilla CSS, Flexbox, Grid, CSS Variables, and Glassmorphism styling
- **JavaScript (ES6+)**: DOM manipulation, event listeners, async/await fetch
- **Vite**: Ultra-fast dev server and production bundler with native `.env` support

---

## 📁 Project Structure

```text
CineVibe/
├── .public/
│   └── movie-poster.png   # Default fallback poster
├── index.html             # Application entry point
├── style.css              # Vanilla CSS styles
├── script.js              # Application logic
├── .env                   # Environment variables (git-ignored)
├── .env.example           # Example environment template
├── package.json           # Dependencies and scripts
└── README.md
```

---

## 🚀 Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Sakshamhanda/CineVibe.git
   cd CineVibe
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure API Key:**

   Create a `.env` file in the project root (you can copy from `.env.example`) and add your TMDB API Key from [TheMovieDB](https://www.themoviedb.org/settings/api):

   ```bash
   cp .env.example .env
   ```

   Inside `.env`:

   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open the URL shown in your terminal (typically `http://localhost:5173`).

---

## 🌐 Deployment (Vercel / Netlify)

### Vercel
1. Import your GitHub repository into Vercel.
2. Vercel will automatically detect **Vite**:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Add Environment Variable in Vercel project settings:
   - Key: `VITE_TMDB_API_KEY`
   - Value: `your_tmdb_api_key`
4. Click **Deploy**.

### Netlify
1. Connect your repository on Netlify.
2. Build Settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Add Environment Variable in **Site configuration > Environment variables**:
   - `VITE_TMDB_API_KEY` = `your_tmdb_api_key`
4. Click **Deploy Site**.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
