<template>
  <section class="tickets">
    <div class="tickets__title">
      <h3>Дата сеансу:</h3>
      <h5>{{ currentSession.showdate }} o {{ currentSession.daytime }}</h5>
    </div>
    <div
      v-for="(row,index) in statusTickets"
      :key="index"
      class="tickets__row"
    >
      <div class="tickets__row-number">
        ряд: {{ row[0].row }}
      </div>
      <button
        v-for="seat in row[1]"
        :key="seat.seat"
        class="tickets__seat"
        :class="{sales : !seat.is_free}"
        @click="openModal(row[0].row , seat)"
      >
        {{ seat.seat }}
      </button>
    </div>
    <AcceptDialog
      :dialog="isDialog"
      :ticket-info="currentTicketData"
      @close="isDialog = false"
      @confirm="buyingTicket"
    />
    <SuccesSnackbar
      :snackbar="isSnackbar"
      :ticketkey="currentTicketData.ticketkey"
      @close="isSnackbar = false"
    />
  </section>
</template>

<script>
import AcceptDialog from '~/components/tickets/AcceptDialog'
import SuccesSnackbar from '~/components/tickets/SuccesSnackbar'
import APITickets from '~/service/tickets'

export default {
  name: 'TicketsPage',
  components: {
    SuccesSnackbar,
    AcceptDialog
  },
  async asyncData ({ $axios, query }) {
    const statusTickets = await APITickets.getStatusTickets($axios, {
      id: query.id,
      daytime: query.daytime,
      showdate: query.showdate
    })
    return {
      statusTickets
    }
  },
  data () {
    return {
      isDialog: false,
      isSnackbar: false,
      currentSession: {
        id: this.$route.query.id,
        daytime: this.$route.query.daytime,
        showdate: this.$route.query.showdate,
        name: this.$route.query.name
      },
      currentTicketData: { ticketkey: '' }
    }
  },
  methods: {
    async updateStatusTickets () {
      this.statusTickets = await APITickets.getStatusTickets(this.$axios, this.currentSession)
    },
    openModal (row, seat) {
      this.isSnackbar = false
      if (seat.is_free) {
        this.currentTicketData = {
          movie_id: this.currentSession.id,
          row,
          seat: seat.seat,
          showdate: this.currentSession.showdate,
          daytime: this.currentSession.daytime,
          name: this.$route.query.name,
          ticketkey: ''
        }
        this.isDialog = true
      }
    },
    buyingTicket () {
      APITickets.byeTicket(this.$axios, this.currentTicketData).then((res) => {
        this.isDialog = false
        this.currentTicketData.ticketkey = res.data.ticketkey
        this.isSnackbar = true
        this.updateStatusTickets()
        return true
      })
    }
  }
}
</script>
