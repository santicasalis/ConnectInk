"use client"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from "axios"

const ArtistPost = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');

  const handleImageChange = async (event) => {
    
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    
    const response = await axios.post("http://localhost:3000/api/upload", formData, {headers: {"Content-Type": `multipart/form-data; boundary=${formData._boundary}`}})
    setImage(response.data.url);
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(postPosts({ image, description }));
    const response = await fetch("http://localhost:3001", {
      method: "POST",
      body: {image, description}
    })
  
  };

  return (
    <form className='w-full p-4 flex flex-col items-center' onSubmit={handleSubmit}>
      <input className='p-8 ' type="file" onChange={handleImageChange} />
      {image !== null && <img src={image} className='w-[200px] h-[200px] mb-8' />  }
      
      <textarea className='w-1/3 text-lg text-black mb-8' rows="10"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Descripción"
      />
      <button className={`py-2 px-4 bg-secondary-100 border border-500 rounded-lg transition duration-300 ease-in-out ${
    !image ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white hover:text-black'
  }`}
  type="submit"
  disabled={!image} >Subir Post</button>
    </form>
    
  );
};

export default ArtistPost;
