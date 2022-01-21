const getMovies = function ($axios) {
  return $axios.get('/movies').then(res => res.data.data)
}
const getMoviesGenre = function ($axios, idGenre) {
  return $axios.get(`/movies?genres=${idGenre}`).then(res => res.data.data)
}

const getMovieShows = function ($axios, id) {
  return $axios.$get(`movieShows?movie_id=${id}`).then(response => response.data)
}

export default {
  getMovies,
  getMovieShows,
  getMoviesGenre
}
