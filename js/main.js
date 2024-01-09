  
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjQxYzU1NzkxYjg5ZGVhNGY4NWFkN2FiNzZiNjQyNiIsInN1YiI6IjY1OTc3ZjhjZWY5ZDcyMzdmMzEyYjZmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WNj_AnHQeoSnrAc8qZtz8_iwyIYS7G0ystXjjfOPims'
    }
};
function createMovieCard(movie) {
    const { id, poster_path, original_title, overview, vote_average } = movie;
    const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
    const movieVoteFix = vote_average.toFixed(2);

    return `
        <div class="col clickable-card" onclick="clickid('${original_title}', ${id})">
            <div class="card h-100">
                <img src="${imageUrl}" class="card-img-top" alt="${original_title}">
                <div class="card-body">
                    <h5 class="card-title">${original_title}</h5>
                    <p class="card-text">${overview}</p>
                </div>
                <div class="card-footer">
                    <small class="text-body-secondary">⭐ ${movieVoteFix}</small>
                </div>
            </div>
        </div>`;
}

function displayMovies(movies) {
    const namesContainer = document.getElementById('movieCard');
    namesContainer.innerHTML = movies.map(createMovieCard).join('');
}

function apiImport() {
    const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            const movies = data.results;
            displayMovies(movies);
        })
        .catch(error => {
            console.error('데이터를 가져오는 중 에러 발생:', error);
        });
}

function clickid(movieTitle, movieId) {
    alert(`${movieTitle}의 ID는 ${movieId}입니다.`);
}

function searchMovies() {
    const searchInput = document.getElementById('floatingInput').value;
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchInput}&language=en-US&page=1&include_adult=false`;

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            const movies = data.results;
            displayMovies(movies);
        })
        .catch(error => {
            console.error('데이터를 가져오는 중 에러 발생:', error);
        });
}

apiImport();

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('floatingInput').focus();
});

document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();
    searchMovies();
});

