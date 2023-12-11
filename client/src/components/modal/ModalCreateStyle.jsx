'use client'

import { RiCloseFill, RiEmotionHappyLine, RiCheckFill  } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { addNewStyle } from "../../app/redux/features/styles/stylesActions";
import { closeModalCreateStyleAction } from '../../app/redux/features/modalCreateStyle/modaCreateStyleActions';
import { useState } from 'react';

const ModalCreateStyle = () => {

    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.modalCreateStyle.isOpen);
    const [descriptionData, setDescriptionData] = useState('');


    const handleClose = () => {
        dispatch(closeModalCreateStyleAction());
    };

    const handleChange = (event) => {
        setDescriptionData(event.target.value);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (descriptionData.trim() !== '') {
            dispatch(addNewStyle({ name: descriptionData }));
            dispatch(closeModalCreateStyleAction());
        }
     }

  return (
    <>
        {
            isOpen &&
            <div className='fixed top-0 left-0 flex justify-center items-center w-full h-full z-50'  style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }} >
                <div className='w-full h-full flex justify-center items-center relative'>
                    <RiCloseFill className='absolute top-2 right-2 text-white text-[35px] cursor-pointer hover:text-admin' onClick={handleClose}/>
                    <div className="bg-secondary-900 z-50 opacity-100  w-[400px] flex flex-col p-6 rounded-lg shadow-admin/40 shadow-lg">
                        <form onSubmit={handleSubmit} className='flex flex-col'>
                            <h3 className='font-newrocker text-[20px] mb-4 text-artistfont'>Ingresa un nuevo Estilo:</h3>
                            <div className='flex justify-between gap-x-2 mb-6'>
                                <textarea className='resize-none bg-transparent w-full outline-none border-transparent border-b-admin/25 border-[1px] text-[14px] text-artistfont' onChange={handleChange} placeholder='Nuevo estilo...' name="description" id="description" rows="5" value={descriptionData} />
                                <RiEmotionHappyLine className='text-[17px] mt-1 cursor-pointer text-artistfont'/>
                            </div>
                            
                            <div className='flex gap-x-5 w-full justify-center items-center'>
                                <label className='cursor-pointer flex gap-x-0.5 items-center text-artistfont hover:text-admin ' onClick={handleClose} > <RiCloseFill  /> Cancelar</label>
                                <button type='submit' className='flex gap-x-0.5 items-center text-artistfont hover:text-artistfont/60'> <RiCheckFill className='text-[18px]'/> Crear Estilo</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        }
    </>
  )
}

export default ModalCreateStyle