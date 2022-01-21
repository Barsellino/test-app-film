<template>
  <div class="text-center">
    <v-dialog
      v-model="isOpen"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 red lighten-2">
          <span class="text-h6 mr-3">Купити квиток на: </span> {{ ticketInfo.name }}
        </v-card-title>

        <v-card-text>
          <div class="pt-9">
            <h4>ваш ряд</h4>
            <p>{{ ticketInfo.row }}</p>
          </div>
          <div>
            <h4>ваше мiсце</h4>
            <p>{{ ticketInfo.seat }}</p>
          </div>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <button v-ripple class="elevation-2 light-blue py-2 px-4" @click="$emit('confirm')">
            Купити
          </button>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'AcceptDialog',
  props: {
    dialog: {
      type: Boolean,
      required: true
    },
    ticketInfo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isOpen: false
    }
  },
  watch: {
    dialog () {
      this.isOpen = this.dialog
    },
    isOpen () {
      if (!this.isOpen) {
        this.$emit('close', this.isOpen)
      }
    }
  }
}
</script>
