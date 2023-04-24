import { useState, useEffect } from "react"
import { useStoreState, useStoreActions } from "easy-peasy"
import LocationChild from './LocationChild'


const LocationChildren = () => {
  const [results, setResults] = useState([])

  const state = useStoreState(s => ({
    updatedBookLocation: s.updatedBookLocation,
    locationChildren: s.locationChildren,
    deletedLocation: s.deletedLocation,
    deletedBook: s.deletedBook,
    currentLocation: s.currentLocation,
    createdLocation: s.createdLocation,
    createdBook: s.createdBook
  }))

  const actions = useStoreActions(a => ({
    getLocationChildren: a.getLocationChildren,
  }))

  useEffect(() => {
    actions.getLocationChildren(state.currentLocation)
  }, [state.currentLocation])

  useEffect(() => {
    const {status} = state.deletedLocation
    if (status === 2) {
      actions.getLocationChildren(state.currentLocation)
    }
  }, [state.deletedLocation])

  useEffect(() => {
    const {status} = state.updatedBookLocation
    if (status === 2) {
      actions.getLocationChildren(state.currentLocation)
    }
  }, [state.updatedBookLocation])

  useEffect(() => {
    const {status} = state.deletedBook
    if (status === 2) {
      actions.getLocationChildren(state.currentLocation)
    }
  }, [state.deletedBook])

  useEffect(() => {
    const {status, payload} = state.locationChildren
    if (status === 2) {
      setResults(payload)
    }
  }, [state.locationChildren])

  useEffect(() => {
    const {status} = state.createdLocation
    if (status === 2) {
      actions.getLocationChildren(state.currentLocation)
    }
  }, [state.createdLocation])

  useEffect(() => {
    const {status} = state.createdBook
    if (status === 2) {
      actions.getLocationChildren(state.currentLocation)
    }
  }, [state.createdLocation, state.createdBook])  

  if (results.length === 0) {
    return <div className="p-3">No result</div>
  }

  return results.map(({type, name, id}, index) => (
    <LocationChild type={type} name={name}  key={index} id={id} />
  ))
}

export default LocationChildren