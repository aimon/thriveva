import { thunk, action } from 'easy-peasy'
import { updateBookLocationApi, deleteBookApi, createBookApi } from '../../api/book';

export default {
  updatedBookLocation: { status: 0, payload: null },
  setUpdatedBookLocation: action((state, payload = null) => {
    state.updatedBookLocation = payload
  }),
  updateBookLocation: thunk(async (actions, {bookId, locationId}) => {
    actions.setUpdatedBookLocation({ status: 1, payload: null })

    updateBookLocationApi(bookId, locationId)
      .then(response => {
        actions.setUpdatedBookLocation({
          status: 2,
          payload: response.data,
        })
      })
      .catch(e =>
        actions.setUpdatedBookLocation({
          status: 3,
          payload: typeof e.response !== 'undefined' ? e.response.data : e,
        }),
      )
  }),
  deletedBook: { status: 0, payload: null },
  setDeletedBook: action((state, payload = null) => {
    state.deletedBook = payload
  }),
  deleteBook: thunk(async (actions, parentLocationId) => {
    actions.setDeletedBook({ status: 1, payload: null })

    deleteBookApi(parentLocationId)
      .then(response => {
        actions.setDeletedBook({
          status: 2,
          payload: response.data,
        })
      })
      .catch(e =>
        actions.setDeletedBook({
          status: 3,
          payload: typeof e.response !== 'undefined' ? e.response.data : e,
        }),
      )
  }),
  createdBook: { status: 0, payload: null },
  setCreatedBook: action((state, payload = null) => {
    state.createdBook = payload
  }),
  createBook: thunk(async (actions, {title, locationId}) => {
    actions.setCreatedBook({ status: 1, payload: null })

    createBookApi({ title, locationId})
      .then(response => {
        actions.setCreatedBook({
          status: 2,
          payload: response.data,
        })
      })
      .catch(e =>
        actions.setCreatedBook({
          status: 3,
          payload: typeof e.response !== 'undefined' ? e.response.data : e,
        }),
      )
  }),
}
