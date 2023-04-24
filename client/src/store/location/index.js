import { thunk, action } from 'easy-peasy'
import { getLocationPathApi, getLocationChildrenApi, deleteLocationApi, createLocationApi } from '../../api/location';

export default {
  locationPath: { status: 0, payload: null },
  setLocationPath: action((state, payload = null) => {
    state.locationPath = payload
  }),
  getLocationPath: thunk(async (actions, locationId) => {
    actions.setLocationPath({ status: 1, payload: null })

    getLocationPathApi(locationId)
      .then(response => {
        actions.setLocationPath({
          status: 2,
          payload: response.data,
        })
      })
      .catch(e =>
        actions.setLocationPath({
          status: 3,
          payload: typeof e.response !== 'undefined' ? e.response.data : e,
        }),
      )
  }),
  locationChildren: { status: 0, payload: null },
  setLocationChildren: action((state, payload = null) => {
    state.locationChildren = payload
  }),
  getLocationChildren: thunk(async (actions, parentLocationId) => {
    actions.setLocationChildren({ status: 1, payload: null })

    getLocationChildrenApi(parentLocationId)
      .then(response => {
        actions.setLocationChildren({
          status: 2,
          payload: response.data,
        })
      })
      .catch(e =>
        actions.setLocationChildren({
          status: 3,
          payload: typeof e.response !== 'undefined' ? e.response.data : e,
        }),
      )
  }),
  deletedLocation: { status: 0, payload: null },
  setDeletedLocation: action((state, payload = null) => {
    state.deletedLocation = payload
  }),
  deleteLocation: thunk(async (actions, parentLocationId) => {
    actions.setDeletedLocation({ status: 1, payload: null })

    deleteLocationApi(parentLocationId)
      .then(response => {
        actions.setDeletedLocation({
          status: 2,
          payload: response.data,
        })
      })
      .catch(e =>
        actions.setDeletedLocation({
          status: 3,
          payload: typeof e.response !== 'undefined' ? e.response.data : e,
        }),
      )
  }),
  createdLocation: { status: 0, payload: null },
  setCreatedLocation: action((state, payload = null) => {
    state.createdLocation = payload
  }),
  createLocation: thunk(async (actions, {name, parentLocationId}) => {
    actions.setCreatedLocation({ status: 1, payload: null })

    createLocationApi({name, parentLocationId})
      .then(response => {
        actions.setCreatedLocation({
          status: 2,
          payload: response.data,
        })
      })
      .catch(e =>
        actions.setCreatedLocation({
          status: 3,
          payload: typeof e.response !== 'undefined' ? e.response.data : e,
        }),
      )
  }),
}
