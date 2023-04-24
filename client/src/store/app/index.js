import { action } from 'easy-peasy'

export default {
  currentLocation: 0,
  setCurrentLocation: action((state, payload = null) => {
    state.currentLocation = payload
  })
}
