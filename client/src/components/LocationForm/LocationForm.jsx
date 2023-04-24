import { useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useFormik } from 'formik'
import { AiOutlineSave } from 'react-icons/ai'
import cx from 'classnames'
import * as Yup from 'yup'
import { useEffect } from 'react'

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Please enter location name')
    .nullable()
})


const LocationForm = () => {
  const state = useStoreState(s => ({
    currentLocation: s.currentLocation,
    createdLocation: s.createdLocation
  }))

  const actions = useStoreActions(a => ({
    createLocation: a.createLocation
  }))

  const [error, setError] = useState('')

  // Use to handle form validations and submissions
  const formik = useFormik({
    initialValues: {
      name: ''
    }, // Initial form validations
    validationSchema, // From validations
    enableReinitialize: true,
    async onSubmit (values) {
      await actions.createLocation({
        ...values,
        parentLocationId: state.currentLocation
      })
      setError('')
    }
  })

  useEffect(() => {
    const {status, payload} = state.createdLocation
    if (status === 3) {
      setError(payload)
    }
  }, [state.createdLocation])
    
  return (
    <div className="w-full">
      <form 
        method='post'
        onSubmit={formik.handleSubmit}
        noValidate
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="name" 
            type="text" 
            placeholder="Location Name"
            name='name'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {((formik.errors.name && formik.touched.name) || error) ? (
            <div className='text-sm text-red-900'>{formik.errors.name || error}</div>
          ) : null}
        </div>
        <div className="text-right">
          <button 
            type="submit"
            className={cx("bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline", {
              'bg-gray-500': !formik.values.name,
              'hover:bg-gray-500': !formik.values.name,
              'cursor-not-allowed': !formik.values.name,
            })}
            disabled={!formik.values.name || state.createdLocation.status === 1}
          >
            <AiOutlineSave className='inline-block mr-2' /> 
            {state.createdLocation.status === 1 ? 'Saving...': 'Save Location'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default LocationForm