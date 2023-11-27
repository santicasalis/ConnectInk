"use client"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiUpload2Fill } from "react-icons/ri";
import axios from "axios"
import { uploadImage } from '@/app/utils/uploadImage';
import {RiEdit2Line} from "react-icons/ri"

const ArtistPost = () => {
  const dispatch = useDispatch();
  const artist_id = useSelector((state) => state.user.id)
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

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
      artist_id,
    });
  };

  return (
    <form className='w-full p-4 flex flex-col items-center' onSubmit={handleSubmit}>
      <div className='grid md:grid-cols-2 grid-cols-1 items-center gap-x-10'>

          <div className='flex flex-col'>
              <label htmlFor='post' className='w-1/2 flex gap-x-1 items-center mb-1 text-[15px] px-4 py-3 cursor-pointer bg-secondary-900/70 text-white border-white/60 border-[1px] rounded-lg hover:shadow-lg hover:bg-secondary-900 hover:text-primary hover:border-primary'>
                  <RiUpload2Fill/>
                  Cargar Imagen
              </label>
              <p className='text-primary/50 text-sm mb-2'>
                Extensiones permitidas: png, jpg, jpeg
              </p> 
              <label htmlFor='description'>Descripción</label>
              <textarea className='bg-secondary-100 resize-none opacity-80 w-[400px] h-[240px] md:col-span-1 flex justify-center items-center text-[15px] text-white mb-8 p-3 outline-none rounded-lg' rows="10"
                id='description'
                name='description'
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Agrega descripción..."
              />
          </div>


          <div className='w-[400px] h-[320px] relative md:col-span-1 flex justify-center items-center mb-8 rounded-lg overflow-hidden'>
            <div className={`bg-black ${image == null && 'opacity-30' }  w-full h-full`} >
                <img className='w-full h-full aspect-w-16 aspect-h-9 object-cover' src={ image!=null ? image : 'https://static.vecteezy.com/system/resources/previews/002/538/522/original/dark-red-gradient-blur-background-vector.jpg'} />
            </div>
              
              {
                (loading && image == null) && <div className='flex items-center justify-center w-full h-full bg-black opacity-70 text-[30px] text-white absolute transform-translate z-10'>Cargando...</div>
              }
              
              <input className='hidden' id='post' type="file" onChange={handleImageChange} />
          </div>

          
      </div>
      <button className={`py-3 px-5 text-[20px] bg-secondary-100 border border-500 rounded-lg transition duration-300 ease-in-out ${
          !image ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white hover:text-black'
        }`}
        type="submit"
        disabled={!image} >
            Subir Post

      </button>
    </form>
  );
};

export default ArtistPost;
