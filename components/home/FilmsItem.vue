<template>
  <div class="all-movies__item">
    <div class="all-movies__wrap">
      <img
        :src="film.image"
        class="all-movies__img"
        alt="photo"
      >
      <div
        class="all-movies__filter"
        @click="moreInfo(film.id)"
      >
        <p>&#10148; Купити квиток</p>
      </div>
    </div>
    <div class="all-movies__additional" v-html="film.additional" />
  </div>
</template>

<script>
export default {
  name: 'FilmsItem',
  props: {
    film: {
      type: Object,
      required: true
    }
  },
  methods: {
    moreInfo (id) {
      this.$emit('moreInfo', id)
    }
  }
}
</script>

<style scoped>

</style>
