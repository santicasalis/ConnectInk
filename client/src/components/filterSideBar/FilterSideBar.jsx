"use client"
import { useSelector, useDispatch } from "react-redux";
import { getAllArtists, filterAllArtists } from "../../app/redux/features/artists/artistActions";
import { useEffect, useState } from "react";
import { getAllStyles } from "../../app/redux/features/styles/stylesActions";



export default function FilterSideBar() {
  const dispatch = useDispatch();
  const styles = useSelector((state) => state.styles.names);
  const [styleSelected, setStyleSelected]= useState([])
  const [filters, setFilters] = useState({
    location: "",
    tattooStyle: [], 
  });
    
  
  useEffect(()=>{
    
    dispatch(filterAllArtists(filters)) //
  },[filters])

  const handleChange = async (event) => {
    let value = event.target.value;

    setFilters({
      ...filters,
      [event.target.name]: value,
    });
    
  };

  const handleSubmit = (event)=>{
    event.preventDefault()
  }

  const handleStyleChange =(event)=>{
    if(styleSelected.includes(event.target.value)) {
      setStyleSelected(styleSelected.filter((style) => style !== event.target.value))
      
  }else{
        setStyleSelected([...styleSelected, event.target.value]);
  }
   
  }

  useEffect(()=>{
     setFilters({...filters,tattooStyle:styleSelected});
   
  },[styleSelected])

console.log(styles , "estilos")
  return (
    <div className="w-full">
    
      <div className={`xl:h-[100vh] overflow-y-scroll fixed xl:static md:w-[40%] ls:w-[30%] xl:w-auto w-[80%] h-full top-0 bg-secondary-100 p-4 flex flex-col transition-all`}>
        <h2 className='text-center text-2xl font-bold mb-[50px]'> Filtros <span className='text-primary text-4xl'>.</span></h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-center mb-8">
            <label className='text-lg font-weight:800 text flex items-center gap-4 px-4 py-1 justify-center' htmlFor="city">
              Ciudad:
            </label>
            <input className="mb-8 mx-auto" list="cities" id="city" name="location" onChange={handleChange} />
          </div>
          <div className="flex flex-col items-center justify-center mb-8">
            <label className='text-lg font-weight:800 text flex items-center gap-4 px-4 py-1 justify-center mb-6' htmlFor="style">
              Estilo de Tatuaje:
            </label>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {
                styles.map((style)=>{
                 return <label className="flex items-center gap-2" htmlFor={style.name} key={style.name}>
                    <input
                      type="checkbox"
                      key={style.id}
                      id={style.name}
                      name="tattooStyle"
                      value={style.name}
                      checked={styleSelected.includes(style.name)}
                      onChange={handleStyleChange}
                    />
                    {style.name}
                  </label>
                })
              }
                         
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded ">Filtrar</button>
          </div>
        </form>
      </div>
    
  </div>
  );
}