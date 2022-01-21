<template>
  <button class="session" @click="chooseTime">
    {{ session }}
  </button>
</template>

<script>
export default {
  name: 'SessionTime',
  props: {
    session: {
      type: String,
      required: true
    }
  },
  methods: {
    chooseTime () {
      this.$emit('chooseTime', this.session)
    }
  }
}
</script>

<style scoped>

</style>
