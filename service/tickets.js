const getStatusTickets = function ($axios, currentSession = {}) {
  return $axios.$get(`/showPlaces?movie_id=${currentSession.id}&daytime=${currentSession.daytime}&showdate=${currentSession.showdate}`)
    .then(response => response.data)
}
const byeTicket = function ($axios, ticketData = {}) {
  return $axios.$post('/bookPlace', ticketData)
}

export default {
  getStatusTickets,
  byeTicket
}
