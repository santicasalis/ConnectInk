import { useSelector, useDispatch } from "react-redux"
import { getAllArtists } from "../../app/redux/features/artists/artistActions"
import { useEffect, useState } from "react"
import { getAllStyles } from "../../app/redux/features/styles/stylesActions"
import axios from "axios"


export default function FilterSideBar({ onFilterChange }) {

    const dispatch = useDispatch()
    const artists = useSelector((state) => state.artists.people)
    const styles = useSelector((state) => state.styles.names)
    const [filters, setFilters] = useState({
        location: "", 
        tattooStyle: [""]
    }) // si no hay tatto ""
    
    useEffect(() => {
        dispatch(getAllStyles())
        dispatch(getAllArtists())
    }, [])

  const handleChange = async (event)=> {
    setFilters({
      ...filters,
      [event.target.name]:event.target.value
      })
     
      console.log(filters)
      try {
        if(filters.tattooStyle.length < 1){
            setFilters({...filters, tattooStyle:[""]})
        }
        const {data} = await axios.get("http://localhost:3001/filters", filters) // post!
          console.log(data)
      } catch (error) {
        console.log(error)
      }

    //dispatch(getAllArtists(data))
      
  }



return(
    <>
    <div className={`xl:h-[100vh] overflow-y-scroll fixed xl:static md:w-[40%] ls:w-[30%] xl:w-auto w-[80%] h-full top-0 bg-secondary-100 p-4 flex flex-col transition-all`}>
      <h2 className='text-center text-2xl font-bold mb-[50px]'> Investiga <span className='text-primary text-4xl'>.</span></h2>
      <div>
        <label className='text-lg font-weight:800 text flex items-center gap-4 px-4 py-1 justify-center' htmlFor="city">
          Ciudad:
        </label>
        <input list="cities" id="city" name="location" onChange={handleChange} />
      </div>
      <div>
        <label className='text-lg font-weight:800 text flex items-center gap-4 px-4 py-1 justify-center' htmlFor="style">
          Estilo de Tatuaje:
        </label>
        <select id="style" name="tattooStyle" onChange={handleChange} value={filters.tattooStyle}>
          <option value="">Selecciona un estilo de tatuaje</option>
          {styles.map((style) => (
            <option key={style.id} value={style.name}>
              {style.name}
            </option>
          ))}
        </select>
      </div>
      
    </div>
  </>
);

}


