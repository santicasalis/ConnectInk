"use client"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  
  console.log(loading);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post("http://localhost:3001/publications", {image, description, artist_id})
  
  };

  return (
    <form className='w-full p-4 flex flex-col items-center' onSubmit={handleSubmit}>
      <div className='grid md:grid-cols-2 grid-cols-1 items-center'>

          <div className='relative md:col-span-1 flex justify-center items-center mb-8'>
              <img className='w-[70%] aspect-w-16 aspect-h-9 object-cover' src={ image!=null ? image : 'https://b.rgbimg.com/users/b/ba/badk/600/qMuS4nU.jpg'} />
              {
                loading && <p className='text-black-500 text-sm absolute top-[50%] left-[50%]'>Cargando...</p>
              }
              {
                image==null && <label htmlFor='post' className='text-[20px] px-4 py-3 cursor-pointer bg-secondary-100 absolute rounded-lg hover:shadow-lg'>
                Subir Imagen
                </label> 
              }
              {
                image==null &&  <p className='text-gray-500 text-sm absolute top-[60%]'>
                Extensiones permitidas: png, jpg, jpeg
                </p>
              }
              
              <input className='hidden' id='post' type="file" onChange={handleImageChange} />
          </div>
          
          
          <textarea className='md:col-span-1 flex justify-center items-center text-lg text-black mb-8 p-3 outline-none rounded-lg' rows="10"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Descripción"
          />
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
