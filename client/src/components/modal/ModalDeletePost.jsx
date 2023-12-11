import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RiAlertFill, RiCloseFill, RiCheckFill } from "react-icons/ri";
import { closeModalDeleteAction } from '../../app/redux/features/modalDelete/modalDeleteAction';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalDeletePost = () => {
    const dispatch = useDispatch();
    const URL_BASE = "https://serverconnectink.up.railway.app"
    const [id, setId] = useState('');
    const {isOpen,data} = useSelector((state) => state.modalDelete);

    const handleClose =  () => {
        dispatch(closeModalDeleteAction());
    }

    useEffect(() => {
      setId(data.id);
    },[id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.delete(`${URL_BASE}/publications/${id}`);
            dispatch(closeModalDeleteAction());
            toast.success(`La publicacion se eliminó con éxito`, {
              className: "toastSuccess",
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 3000,
              hideProgressBar: true,
            });
        } catch (error) {
            toast.error(`Hubo un error al eliminar la publicación`, {
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
                    <RiCloseFill className='absolute top-2 right-2 text-artistfont text-[35px] cursor-pointer hover:text-artist' onClick={handleClose}/>
                    <div className="bg-secondary-900 z-50 opacity-100  w-[400px] flex flex-col p-6 rounded-lg">
                        <form onSubmit={handleSubmit} className='flex flex-col'>
                            <h3 className='font-newrocker text-[20px] mb-4 text-artistfont flex'> <RiAlertFill className='text-artist/70 text-[30px]'/> Estás seguro que quieres borrar esta publicación?</h3>
                            
                            <div className='flex gap-x-5 w-full justify-center items-center'>
                                <label className='cursor-pointer flex gap-x-0.5 items-center hover:text-artist text-artistfont' onClick={handleClose} > <RiCloseFill className='text-[18px] ' /> Cancelar</label>
                                <button type='submit' className='flex gap-x-0.5 items-center hover:text-artistfont/70 text-artistfont'> <RiCheckFill className='text-[18px] '/> Borrar Publicación</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        }
    </>
  )
}

export default ModalDeletePost