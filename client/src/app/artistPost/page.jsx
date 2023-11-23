"use client"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postPosts } from "../redux/features/artists/artistActions";

const ArtistPost = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    console.log(file)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //dispatch(postPosts({ image, description }));
    const response = await fetch("http://localhost") // VER RUTA
    method: "POST",
    body({image, description})
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


// import { useState } from 'react';
// import { v2 as cloudinary } from 'cloudinary';
// import fs from "fs"

// const MyForm = () => {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async () => {
//     try {
//       // Configurar Cloudinary (esto también podría ir en un archivo separado)
//       cloudinary.config({
//         cloud_name: 'tu_cloud_name',
//         api_key: 'tu_api_key',
//         api_secret: 'tu_api_secret',
//       });

//       // Subir la imagen a Cloudinary
//       const formData = new FormData();
//       formData.append('file', file);

//       // const response = await fetch(`https://api.cloudinary.com/v1_1/tu_cloud_name/image/upload`, {
//       //   method: 'POST',
//       //   body: formData,
//       // });

//       console.log(formData)

//       if (response.ok) {
//         const data = await response.json();
//         console.log('URL de la imagen en Cloudinary:', data.secure_url);

//         // Puedes manejar la URL de la imagen según tus necesidades
//       } else {
//         console.error('Error al subir la imagen a Cloudinary');
//       }
//     } catch (error) {
//       console.error('Error de red:', error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleSubmit}>Subir Imagen</button>
//     </div>
//   );
// };

// export default MyForm;