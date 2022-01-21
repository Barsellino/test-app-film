<template>
  <v-snackbar
    v-model="isOpen"
    :timeout="timeout"
    color="green"
  >
    <p>{{ text }}</p>
    <p>Номер бiлету <span class="text--accent-1">{{ ticketkey }}</span></p>
    <template #action="{ attrs }">
      <v-btn
        color="black"
        text
        v-bind="attrs"
        @click="isOpen = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>

export default {
  props: {
    snackbar: {
      type: Boolean,
      required: true
    },
    ticketkey: {
      type: String,
      required: true
    }
  },
  data: () => ({
    isOpen: false,
    text: 'Бiлет успiшно куплений',
    timeout: 2000
  }),
  watch: {
    snackbar () {
      this.isOpen = this.snackbar
    },
    isOpen () {
      if (!this.isOpen) {
        this.$emit('close', this.isOpen)
      }
    }
  }
}
</script>

<style scoped>
p {
  font-weight: bold;
  color: #051336;
}
p span {
  color: #a94242;
  font-weight: bold;
}
</style>
