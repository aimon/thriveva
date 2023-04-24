import { useRef } from "react"
import { useStoreActions } from "easy-peasy"
import { AiOutlineFolder, AiOutlineDrag, AiFillFile, AiOutlineDelete } from 'react-icons/ai'
import cx from 'classnames'

const LocationChild = ({ type, name, id }) => {
  const dragItem = useRef();
  const dragOverItem = useRef();

  const actions = useStoreActions(a => ({
    setCurrentLocation: a.setCurrentLocation,
    updateBookLocation: a.updateBookLocation,
    deleteLocation: a.deleteLocation,
    deleteBook: a.deleteBook
  }))


  const handleDelete = (type, id) => {
    if (type === 'location') {
      actions.deleteLocation(id)
    } else {
      actions.deleteBook(id)
    }
  }

  const handleChangeLocation = (type, id) => {
    if (type === 'location') {
      actions.setCurrentLocation(id)
    }
  }

  const dragStart = (data) => {
    dragItem.current = data;
  }
 
  const dragEnter = (data) => {
    dragOverItem.current = data;
  }

  const drop = () => {
    const {type, id} = dragOverItem.current
    console.log(dragItem.current, dragOverItem.current)
    if (type === 'book') {
      actions.updateBookLocation({
        bookId: dragItem.current.id,
        locationId: id
      })
    }
  }

  return (
    <div
      className="flex flex-row p-3 justify-between border-b"
      onDragStart={() => dragStart({type, name, id})}
      onDragEnter={() => dragEnter({type, name, id})}
      onDragEnd={drop}
      draggable
    >
      <div 
        onClick={() => handleChangeLocation(type, id)} 
        className={type === 'location' ? 'cursor-pointer': ''} 
        aria-hidden="true"
        >
        {type === 'location' 
          ? <AiOutlineFolder className="mr-2 inline-block" />  
          : <AiFillFile className="mr-2 inline-block" />}
        {name}
      </div>

      <div>
        {type === 'book' && (
          <>
            <div 
              className={
              cx('mr-2 inline-block cursor-move', {})
            }>
              <AiOutlineDrag />
            </div>
            <div className="inline-block cursor-pointer">
              <AiOutlineDelete onClick={() => handleDelete(type, id)} />
            </div>
          </>
        )}            
      </div>   
    </div>
  )
}

export default LocationChild