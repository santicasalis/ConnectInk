"use client"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiUpload2Fill, RiMoreFill, RiEmotionHappyLine, RiCloseFill, RiCheckFill } from "react-icons/ri";
import axios from "axios"
import { uploadImage } from '@/app/utils/uploadImage';
import Image from 'next/image';
import {RiEdit2Line} from "react-icons/ri"

const ArtistPost = () => {
  const dispatch = useDispatch();
  const artist = useSelector((state) => state.user.logedInUser)
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false)
  const [response, setResponse] = useState(false)

  const handleImageChange = async (event) => {
    setLoading(true);
    const imageUrl = await uploadImage(event.target.files[0])
    setImage(imageUrl)
    setLoading(false);
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post("http://localhost:3001/publications", {
      image,
      description,
      artist_id:artist.id,
    });
    setCreated(true)
    setResponse(response.data)
  };

  const imageLoader = ({src}) => {
    return src
  }

  const handleNextPublication = () => {
    setCreated(false)
    setImage(null)
    setDescription("")
  }

  return (
    created 
    ? ( 
      <div>
        <h1>
          {response}
        </h1>
        <button onClick={handleNextPublication}>
          Crear otra publicación
        </button>
      </div>) 
    :
    (<form className='w-full p-4 flex flex-col items-center' onSubmit={handleSubmit}>
        <div className='grid md:grid-cols-2 grid-cols-1 items-center gap-x-10'>

        <div className='flex flex-col'>
            <label htmlFor='post' className='w-1/2 font-newrocker flex gap-x-1.5 items-center mb-1 text-[17px] px-4 py-3 cursor-pointer bg-secondary-900/70 text-white/70 border-white/60 border-[1px] rounded-lg hover:shadow-lg hover:bg-secondary-900 hover:text-primary hover:border-primary'>
                <RiUpload2Fill/>
                Subir imagen
            </label> 
            <input className='hidden' name='post' id='post' type="file" onChange={handleImageChange} />
            <p className='text-primary/50 text-sm mb-3'>
              Extensiones permitidas: png, jpg, jpeg
            </p> 
            <label htmlFor='description' className='font-newrocker'>Descripción</label>
            <textarea className='bg-secondary-100 resize-none opacity-80 w-[400px] h-[240px] md:col-span-1 flex justify-center items-center text-[15px] text-white mb-8 p-3 outline-none rounded-lg' rows="10"
              id='description'
              name='description'
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Agrega descripción..."
            />
            <div className='w-100 flex justify-center items-center gap-x-4 '>
                <button className='flex items-center gap-x-1 font-newrocker text-[20px] py-3 px-6  rounded-lg hover:text-red-400 '><RiCloseFill className='font-bold text-[30px]'/> Cancelar </button>
                <button className={` flex items-center gap-x-1 font-newrocker py-3 px-6 text-[20px]  bg-transparent rounded-lg transition duration-200 ease-in-out ${
                    !image ? 'opacity-50 cursor-not-allowed' : 'hover:text-primary '
                  }`}
                  type="submit"
                  disabled={!image}
                  >
                    <RiCheckFill className='font-bold text-[30px]'/>
                    Publicar
                </button>
            </div>
        </div>


        <div className='w-[400px]  md:col-span-1 hidden md:flex flex-col justify-center items-center mb-8 rounded-lg '>
            <div className='w-full items-center justify-center mb-4 hidden'> <h3 className='text-[20px] text-center font-newrocker'>Vista Previa:</h3></div>
            <div className='flex justify-between w-full'>
                    <div className='flex gap-x-2 p-2 items-center'>
                        <div className='rounded-full w-[32px] h-[32px] overflow-hidden'>
                            <Image unoptimized loader={imageLoader} src={artist.image} height={32} width={32} alt={artist.name} style={{width:'100%', height:'100%' }}/>
                        </div>
                        <span className='text-[15px]'>{`${artist.name} ${artist.lastName}`}</span>
                    </div>
                    <div className='p-2 flex items-center justify-center'>
                      <RiMoreFill className='text-white text-[25px]'/>
                    </div>
            </div>
          
          
          
            <div className={`bg-black ${image == null ? 'opacity-50' : ''} w-full h-[300px] relative mb-2`}>
                {loading  && <div className='font-newrocker flex items-center justify-center w-full h-full bg-black opacity-70 text-[30px] text-white absolute transform-translate z-20'>Cargando...</div>}
                <img className='w-full h-full aspect-w-16 aspect-h-9 object-cover' src={image != null ? image : 'https://img.freepik.com/vector-premium/icono-marco-fotos-foto-vacia-blanco-vector-sobre-fondo-transparente-aislado-eps-10_399089-1290.jpg'} />
            </div>
            <div className='w-full pr-3 flex justify-between gap-x-3'>
              <textarea className=' text-[17px] resize-none w-full mb-1 bg-transparent text-white/80' rows={3} value={description}></textarea>
              <div className='pt-1 ml-auto'>
                  <RiEmotionHappyLine className=' top-0 text-[17px]'/>
              </div>
            </div>
        </div>


        
      </div>
    </form>)      
  );
};

export default ArtistPost;