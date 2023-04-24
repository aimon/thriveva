import { useState, useEffect, Fragment } from "react"
import { useStoreState, useStoreActions } from "easy-peasy"
import { AiOutlineRight, AiOutlineFolder, AiFillFile } from 'react-icons/ai'
import LocationForm from "../LocationForm"
import BookForm from "../BookForm"
import cx from 'classnames'

const Breadcrumbs = () => {
  const [results, setResults] = useState([])
  const [showLocationForm, setShowLocationForm] = useState(false)
  const [showBookForm, setShowBookForm] = useState(false)

  const state = useStoreState(s => ({
    locationPath: s.locationPath,
    currentLocation: s.currentLocation,
    createdLocation: s.createdLocation,
    createdBook: s.createdBook
  }))

  const actions = useStoreActions(a => ({
    setCurrentLocation: a.setCurrentLocation,
    setCreatedLocation: a.setCreatedLocation,
    setCreatedBook: a.setCreatedBook,
    getLocationPath: a.getLocationPath
  }))

  useEffect(() => {
    actions.getLocationPath(state.currentLocation)
  }, [state.currentLocation])

  useEffect(() => {
    const {status, payload} = state.locationPath
    if (status === 2) {
      setResults(payload)
    }
  }, [state.locationPath])

  useEffect(() => {
    const {status} = state.createdLocation
    if (status === 2) {
      setShowLocationForm(false)
      actions.setCreatedLocation({status: 0, payload: null})
    } else if (status === 3 ) {
      actions.setCreatedLocation({status: 0, payload: null})
    }
  }, [state.createdLocation])

  useEffect(() => {
    const {status} = state.createdBook
    if (status === 2) {
      setShowBookForm(false)
      actions.setCreatedBook({status: 0, payload: null})
    } else if (status === 3 ) {
      actions.setCreatedBook({status: 0, payload: null})
    }
  }, [state.createdBook])

  const handleChangeLocation = (id) => {
    actions.setCurrentLocation(id)
  }

  const handleToggleLocationForm = () => {
    setShowLocationForm(prev=> !prev)
    setShowBookForm(false)
  }

  const handleToggleBookForm = () => {
    setShowLocationForm(false)
    setShowBookForm(prev=> !prev)
  }

  return (
    <div>
      <div className="rounded-md border p-3 mb-3">
        <div 
          onClick={() => handleChangeLocation(0)}
          className="inline-block cursor-pointer" 
          aria-hidden="true"
        >
          Root
        </div>
        {results.length > 0 && <AiOutlineRight className="mx-2 inline-block" />}

        {results.map(({name, id}, index) => (
          <Fragment key={id} >
            <div 
              onClick={() => handleChangeLocation(id)}
              className={cx("inline-block cursor-pointer", {
                'font-bold': results.length -1 === index
              })}
              aria-hidden="true"
            >
              {name}
            </div>
            { index < results.length-1 && <AiOutlineRight className="mx-2 inline-block" />}
          </Fragment>
        ))}
      </div>
      <div className="text-center m-2">
        <button 
          onClick={handleToggleLocationForm}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-2">
          <AiOutlineFolder className="inline-block" /> Add Location
        </button>
        <button 
          onClick={handleToggleBookForm}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          <AiFillFile className="inline-block" /> Add Book
        </button>
      </div>

      {showLocationForm && <LocationForm />}
      {showBookForm && <BookForm />}
    </div>
  )
}

export default Breadcrumbs