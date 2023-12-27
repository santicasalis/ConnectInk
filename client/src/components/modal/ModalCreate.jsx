"use client"

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiUpload2Fill, RiMoreFill, RiEmotionHappyLine, RiCloseFill, RiCheckFill } from "react-icons/ri";
import axios from "axios"
import Image from 'next/image';
import {RiEdit2Line} from "react-icons/ri"
import { closeModalCreateAction } from '../../app/redux/features/modalCreate/modalCreateAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {CldUploadWidget} from "next-cloudinary"

const ModalCreate = () => {
  const dispatch = useDispatch();
  const { isOpen} = useSelector((state) => state.modalCreate);
  const artist = useSelector((state) => state.user.logedInUser)
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleClose = () => {
    dispatch(closeModalCreateAction());
    setImage(null);
    setDescription('');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post("http://localhost:3001/publications", {
            image,
            description,
            tattooArtistId:artist.id,
        }); 
        toast.success("Tu publicación se subió con éxito", {
            className:'toastSuccess',
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
         });
        dispatch(closeModalCreateAction());

    } catch (error) {
        toast.error("Hubo un error al crear la publicación", {
            className:'toastError',
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
         });
    }

    
    
  };

  function handleChangeImage(result) {
    setLoading(true);
    setImage(result.info.secure_url)
    setLoading(false)
  }

  const imageLoader = ({src}) => {
    return src
  }


  return (

    <>
        {
            isOpen && 
            <div className='fixed top-0 left-0 flex justify-center items-center w-full h-full z-40'  style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }} >
                <div className='w-full h-full flex justify-center items-center relative'>
                    <RiCloseFill className='absolute top-2 right-2 text-artistfont text-[35px] cursor-pointer hover:text-artist' onClick={handleClose}/>
                    <form className='w-[900px] bg-secondary-900 p-4 flex flex-col items-center shadow-lg shadow-artist/40' onSubmit={handleSubmit}>
                        <div className='grid md:grid-cols-2 grid-cols-1 items-center gap-x-10' >

                        <div className='flex flex-col'>
                            {/* <label htmlFor='post' className='w-1/2 font-newrocker flex gap-x-1.5 items-center mb-1 text-[17px] px-4 py-3 cursor-pointer bg-secondary-900/70 text-artistfont border-artistfont border-[1px] rounded-lg hover:shadow-lg hover:bg-secondary-900 hover:text-artist hover:border-artist'>
                                <RiUpload2Fill/>
                                Subir imagen
                            </label>  */}
                            {/* <input className='hidden' name='post' id='post' type="file" onChange={handleImageChange} /> */}
                            <CldUploadWidget uploadPreset="cloudinary-upload-images-connectInk" onUpload={handleChangeImage}>
                                {({ open }) => {
                                    return (
                                    <button type="button" className='w-1/2 font-newrocker flex gap-x-1.5 items-center mb-1 text-[17px] px-4 py-3 cursor-pointer bg-secondary-900/70 text-artistfont border-artistfont border-[1px] rounded-lg hover:shadow-lg hover:bg-secondary-900 hover:text-artist hover:border-artist' onClick={() => open()}>
                                        <RiUpload2Fill/>
                                        Subir imagen
                                    </button>
                                    );
                                }}
                            </CldUploadWidget>
                            <p className='text-artist text-sm mb-3'>
                            Extensiones permitidas: png, jpg, jpeg
                            </p> 
                            <label htmlFor='description' className='font-newrocker text-artistfont'>Descripción</label>
                            <textarea className='bg-secondary-100 resize-none opacity-80 w-[400px] h-[240px] md:col-span-1 flex justify-center items-center text-[15px] text-artistfont mb-8 p-3 outline-none rounded-lg' rows="10"
                            id='description'
                            name='description'
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            placeholder="Agrega descripción..."
                            />
                            <div className='w-100 flex justify-center items-center gap-x-4 '>
                                <button onClick={handleClose} className='flex items-center gap-x-1 font-newrocker text-[20px] py-3 px-6  rounded-lg hover:text-artist  text-artistfont'><RiCloseFill className='font-bold text-[30px]'/> Cancelar </button>
                                <button className={` flex items-center gap-x-1  text-artistfont font-newrocker py-3 px-6 text-[20px]  bg-transparent rounded-lg transition duration-200 ease-in-out ${
                                    !image ? 'opacity-50 cursor-not-allowed' : 'hover:text-artistfont/60 '
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
                                            {artist.image && 
                                            <Image unoptimized loader={imageLoader} src={artist.image} height={32} width={32} alt={artist.fullName} style={{width:'100%', height:'100%' }}/>
                                            }
                                        </div>
                                        <span className='text-[15px] text-artistfont'>{`${artist.fullName}`}</span>
                                    </div>
                                    <div className='p-2 flex items-center justify-center'>
                                    <RiMoreFill className='text-artistfont text-[25px]'/>
                                    </div>
                            </div>
                        
                        
                        
                            <div className={`bg-black ${image == null ? 'opacity-50' : ''} w-full h-[300px] relative mb-2`}>
                                {loading  && <div className='font-newrocker flex items-center justify-center w-full h-full bg-black opacity-70 text-[30px] text-artistfont absolute transform-translate z-20'>Cargando...</div>}
                                <img className='w-full h-full aspect-w-16 aspect-h-9 object-cover' src={image != null ? image : 'https://img.freepik.com/vector-premium/icono-marco-fotos-foto-vacia-blanco-vector-sobre-fondo-transparente-aislado-eps-10_399089-1290.jpg'} />
                            </div>
                            <div className='w-full pr-3 flex justify-between gap-x-3'>
                            <textarea className=' text-[17px] resize-none w-full mb-1 bg-transparent text-artistfont' rows={3} value={description}></textarea>
                            <div className='pt-1 ml-auto'>
                                <RiEmotionHappyLine className=' top-0 text-[17px]'/>
                            </div>
                            </div>
                        </div>


                        
                    </div>
                    </form>
                </div>
            </div>   
        }
    </>
    
  );
};

export default ModalCreate;