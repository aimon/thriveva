import Breadcrumbs from "./components/Breadcrumbs"
import LocationChildren from "./components/LocationChildren"

function App() {
  return (
    <div className="w-2/3 p-5 m-auto">
      <Breadcrumbs />
      <div className="rounded-md border">
        <LocationChildren />
      </div>
    </div>
  )
}

export default App
