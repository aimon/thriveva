import { useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useFormik } from 'formik'
import { AiOutlineSave } from 'react-icons/ai'
import cx from 'classnames'
import * as Yup from 'yup'
import { useEffect } from 'react'

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Please enter title')
    .nullable()
})


const BookForm = () => {
  const state = useStoreState(s => ({
    currentLocation: s.currentLocation,
    createdBook: s.createdBook
  }))

  const actions = useStoreActions(a => ({
    createBook: a.createBook
  }))

  const [error, setError] = useState('')

  // Use to handle form validations and submissions
  const formik = useFormik({
    initialValues: {
      title: ''
    }, // Initial form validations
    validationSchema, // From validations
    enableReinitialize: true,
    async onSubmit (values) {
      await actions.createBook({
        ...values,
        locationId: state.currentLocation
      })
      setError('')
    }
  })

  useEffect(() => {
    const {status, payload} = state.createdBook
    if (status === 3) {
      setError(payload)
    }
  }, [state.createdBook])
    
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
            id="title" 
            type="text" 
            placeholder="Book Title"
            name='title'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {((formik.errors.title && formik.touched.title) || error) ? (
            <div className='text-sm text-red-900'>{formik.errors.title|| error}</div>
          ) : null}
        </div>
        <div className="text-right">
          <button 
            type="submit"
            className={cx("bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline", {
              'bg-gray-500': !formik.values.title,
              'hover:bg-gray-500': !formik.values.title,
              'cursor-not-allowed': !formik.values.title,
            })}
            disabled={!formik.values.title|| state.createdBook.status === 1}
          >
            <AiOutlineSave className='inline-block mr-2' /> 
            {state.createdBook.status === 1 ? 'Saving...': 'Save Book'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default BookForm