  
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjQxYzU1NzkxYjg5ZGVhNGY4NWFkN2FiNzZiNjQyNiIsInN1YiI6IjY1OTc3ZjhjZWY5ZDcyMzdmMzEyYjZmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WNj_AnHQeoSnrAc8qZtz8_iwyIYS7G0ystXjjfOPims'
    }
};

function apiImport() {
    const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
    const namesContainer = document.getElementById('movieCard');

    namesContainer.innerHTML = '';

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            let rows = data['results'];
            rows.forEach(row => {
                let movieId = row['id'];
                let apiImage = row['poster_path'];
                let movieTitle = row['original_title'];
                let movieOverview = row['overview'];
                let movieVote = row['vote_average'];
                let imageUrl = `https://image.tmdb.org/t/p/w500${apiImage}`;
                let movieVoteFix = movieVote.toFixed(2);

                let temp_html = `
                    <div class="col" onclick="clickid('${movieTitle}', ${movieId})">
                        <div class="card h-100">
                            <img src="${imageUrl}" class="card-img-top" alt="${movieTitle}">
                            <div class="card-body">
                                <h5 class="card-title">${movieTitle}</h5>
                                <p class="card-text">${movieOverview}</p>
                            </div>
                            <div class="card-footer">
                                <small class="text-body-secondary">⭐ ${movieVoteFix}</small>
                            </div>
                        </div>
                    </div>`;


                namesContainer.innerHTML += temp_html;
            });
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
    const namesContainer = document.getElementById('movieCard');
    namesContainer.innerHTML = '';

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            let movies = data['results'];

            let htmlContent = movies.map(movie => {
                let movieId = movie['id'];
                let apiImage = movie['poster_path'];
                let movieTitle = movie['original_title'];
                let movieOverview = movie['overview'];
                let movieVote = movie['vote_average'];
                let imageUrl = `https://image.tmdb.org/t/p/w500${apiImage}`;
                let movieVoteFix = movieVote.toFixed(2);

                return `
            <div class="col clickable-card" onclick="clickid('${movieTitle}', ${movieId})">
                <div class="card h-100">
                    <img src="${imageUrl}" class="card-img-top" alt="${movieTitle}">
                    <div class="card-body">
                        <h5 class="card-title">${movieTitle}</h5>
                        <p class="card-text">${movieOverview}</p>
                    </div>
                    <div class="card-footer">
                        <small class="text-body-secondary">⭐ ${movieVoteFix}</small>
                    </div>
                </div>
            </div>`;
            }).join('');

            namesContainer.innerHTML = htmlContent;
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


