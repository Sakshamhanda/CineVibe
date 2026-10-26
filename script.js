const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY || (typeof window !== 'undefined' && window.API_KEY);
const FALLBACK_POSTER = new URL('./.public/movie-poster.png', import.meta.url).href;

if (!API_KEY) {
    console.error("TMDB API Key is missing. Please set VITE_TMDB_API_KEY in your .env file or hosting provider settings.");
}

const trendingSection = document.querySelector('.trending-section');
const trendingGrid = document.querySelector('.trending-grid');
const movieGrid = document.querySelector('.movie-grid');
const searchForm = document.querySelector('.search-bar');
const searchInput = document.getElementById('input-bar');
const searchIcon = document.querySelector('.search-icon');
const movieSectionTitle = document.querySelector('.movie-section h1');

// Trending Movies
async function getTrendingMovies() {
    try {
        const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        const top5 = data.results.slice(0, 5);

        trendingGrid.innerHTML = '';

        top5.forEach((movie, index) => {
            const poster = movie.poster_path
                ? `${IMAGE_BASE_URL}${movie.poster_path}`
                : FALLBACK_POSTER;

            const card = document.createElement('div');
            card.classList.add('trending-card');
            card.innerHTML = `
                <span class="rank-number">${index + 1}</span>
                <img src="${poster}" alt="${movie.title}">
            `;
            trendingGrid.appendChild(card);
        });
    } catch (error) {
        console.error("Trending error:", error);
    }
}

// All Movies
async function getAllMovies() {
    try {
        const url = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        displayMovies(data.results);
    } catch (error) {
        console.error("All movies error:", error);
    }
}

//Search Movies
async function searchMovies(query) {
    const trimmed = query.trim();
    if (!trimmed) {
        if (trendingSection) trendingSection.style.display = 'block';
        movieSectionTitle.innerText = 'LATEST MOVIES';
        getAllMovies();
        return;
    }

    try {
        if (trendingSection) trendingSection.style.display = 'none';
        movieSectionTitle.innerText = `Search Results: "${trimmed}"`;
        const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(trimmed)}`;
        const response = await fetch(url);
        const data = await response.json();

        displayMovies(data.results);
        movieSectionTitle.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (error) {
        console.error("Search error:", error);
    }
}


function displayMovies(movies) {
    movieGrid.innerHTML = '';

    if (!movies || movies.length === 0) {
        movieGrid.innerHTML = '<p style="color: white; padding: 1rem;">No movies found.</p>';
        return;
    }

    movies.forEach(movie => {
        const poster = movie.poster_path
            ? `${IMAGE_BASE_URL}${movie.poster_path}`
            : FALLBACK_POSTER;

        const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
        const year = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';

        const card = document.createElement('div');
        card.classList.add('movie-card');
        card.innerHTML = `
            <img src="${poster}" alt="${movie.title}">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <div class="movie-meta">
                    <span class="rating">⭐ ${rating}</span>
                    <span class="dot">•</span>
                    <span class="year">${year}</span>
                </div>
            </div>
        `;
        movieGrid.appendChild(card);
    });
}


searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    searchMovies(searchInput.value);
});

if (searchIcon) {
    searchIcon.addEventListener('click', () => {
        searchMovies(searchInput.value);
    });
}

let searchTimeout;
searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        searchMovies(searchInput.value);
    }, 400);
});

getTrendingMovies();
getAllMovies();
