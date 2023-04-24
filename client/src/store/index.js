import { createStore } from 'easy-peasy'

import location from './location'
import book from './book'
import app from './app'

export default createStore({
  ...location,
  ...book,
  ...app
})
