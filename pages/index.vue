<template>
  <section class="main-page">
    <div>
      <v-select
        v-model="genre"
        class="main-page__selector"
        :items="genres"
        label="Виберiть жанр"
        solo
      />
    </div>
    <div v-if="movies" class="all-movies">
      <FilmsItem
        v-for="film in movies"
        :key="film.id"
        :film="film"
        @moreInfo="moreInfo"
      />
    </div>
  </section>
</template>

<script>
import FilmsItem from '~/components/home/FilmsItem'
import APIFilms from '~/service/films'

export default {
  name: 'HomePage',
  components: { FilmsItem },
  async asyncData ({ $axios }) {
    const movies = await APIFilms.getMovies($axios)
    return {
      movies
    }
  },
  data () {
    return {
      add: 1,
      genre: '',
      genres: [
        'БОЙОВИК',
        'ПРИГОДИ',
        'КОМЕДІЯ',
        'ДРАМА',
        'ЖАХИ',
        'ВЕСТЕРНИ'
      ]
    }
  },
  watch: {
    genre () {
      APIFilms.getMoviesGenre(this.$axios, this.genres.indexOf(this.genre))
        .then((data) => {
          this.movies = data
          return data
        })
    }
  },
  methods: {
    moreInfo (id) {
      this.$router.push({
        path: '/film',
        query: { id }
      })
    }
  }
}
</script>
