<template>
  <section class="film">
    <div class="film__img">
      <img :src="currentFilm.image" alt="123">
    </div>
    <div class="all-movies__additional film__info" v-html="currentFilm.additional" />
    <div class="sessions">
      <v-select
        v-model="date"
        :items="dates"
        label="Виберiть дату"
        solo
      />
      <div v-if="date" class="sessions__buttons">
        <SessionTime
          v-for="time in session"
          :key="time.index"
          :session="time"
          @chooseTime="chooseTime"
        />
      </div>
    </div>
  </section>
</template>

<script>
import SessionTime from '~/components/film/SessionTime'
import APIFilms from '~/service/films'

export default {
  name: 'FilmPage',
  components: { SessionTime },
  async asyncData ({ query, $axios }) {
    const movies = await APIFilms.getMovies($axios)
    const movieShows = await APIFilms.getMovieShows($axios, query.id)
    return {
      movies,
      movieShows
    }
  },
  data () {
    return {
      date: '',
      currentId: this.$route.query.id
    }
  },
  computed: {
    currentFilm () {
      return this.movies.filter(film => +film.id === +this.currentId)[0]
    },
    dates () {
      return this.movieShows[this.currentId].map(date => date.showdate)
    },
    session () {
      return this.movieShows[this.currentId].filter((day) => {
        if (day.showdate === this.date) {
          return day
        }
        return false
      })[0].daytime.split(';')
    }
  },
  methods: {
    chooseTime (time) {
      this.$router.push({
        path: 'tickets',
        query: {
          id: this.currentId,
          daytime: time,
          showdate: this.date,
          name: this.currentFilm.name
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
