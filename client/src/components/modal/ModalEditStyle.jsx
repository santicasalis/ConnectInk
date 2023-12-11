'use client'

import React,{useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiCloseFill, RiEmotionHappyLine, RiCheckFill  } from "react-icons/ri";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { closeModalAction } from '../../app/redux/features/modalEdit/modalEditAction';
import axios from 'axios';
import { useRouter } from 'next/navigation'

const Modal = () => {
 
  const dispatch = useDispatch();
  const { isOpen, data } = useSelector((state) => state.modalEdit);
  const [id,setId] = useState('');
  const [descriptionData, setDescriptionData] = useState('');

  useEffect(()=>{
        setDescriptionData(data.description);
        setId(data.id);
  },[data]);

  const handleClose = () => {
    dispatch(closeModalAction());
  };

  const handleChange = (event) => {
    setDescriptionData(event.target.value);
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
       
        await axios.put(`${URL_BASE}/publications/${id}`,{description:descriptionData}); 
        
        dispatch(closeModalAction()); 
        toast.success(`La publicacion se actualizó con éxito`, {
          className: "toastSuccess",
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
          hideProgressBar: true,
        });
    } catch (error) {
      toast.error(`Hubo un error al editar la publicación`, {
        className: "toastError",
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  }

  return (
    <>
        {
            isOpen &&
            <div className='fixed top-0 left-0 flex justify-center items-center w-full h-full z-40'  style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }} >
                <div className='w-full h-full flex justify-center items-center relative'>
                    <RiCloseFill className='absolute top-2 right-2 text-white text-[35px] cursor-pointer hover:text-artist' onClick={handleClose}/>
                    <div className="bg-secondary-900 z-50 opacity-100  w-[400px] flex flex-col p-6 rounded-lg">
                        <form onSubmit={handleSubmit} className='flex flex-col'>
                            <h3 className='font-newrocker text-[20px] mb-4 text-artistfont/70'>Editar  Publicación</h3>
                            <div className='flex justify-between gap-x-2 mb-6'>
                                <textarea className='resize-none bg-transparent w-full outline-none border-transparent border-b-white/25 border-[1px] text-[14px] text-artistfont' onChange={handleChange} placeholder='Descripción...' name="description" id="description" rows="5" value={descriptionData} />
                                <RiEmotionHappyLine className='text-[17px] mt-1 cursor-pointer text-artistfont'/>
                            </div>
                            
                            <div className='flex gap-x-5 w-full justify-center items-center'>
                                <label className='cursor-pointer flex gap-x-0.5 items-center text-artistfont hover:text-artist ' onClick={handleClose} > <RiCloseFill  /> Cancelar</label>
                                <button type='submit' className='flex gap-x-0.5 items-center text-artistfont hover:text-artistfont/60'> <RiCheckFill className='text-[18px]'/> Guardar Cambios</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        }
    </>
  );
};

export default Modal;