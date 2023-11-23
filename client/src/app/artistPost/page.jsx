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
    
    const response = await axios.post("/api/upload", formData, {headers: {"Content-Type": `multipart/form-data; boundary=${formData._boundary}`}})
    setImage(response.data.url);
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(postPosts({ image, description }));
    const response = await fetch("http://localhost", {
      method: "POST",
      body: {image, description}
    })
  
  };

 const getImageUrl = ()=>{
  setImage(data.url) // VER 
 }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleImageChange} />
      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Descripción"
      />
      <button type="submit">Subir Post</button>
    </form>
    
  );
};

export default ArtistPost;
