import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RiAlertFill, RiCloseFill, RiCheckFill } from "react-icons/ri";
import { closeModalDeleteAppointmentAction } from '@/app/redux/features/modalDeleteAppointment/modalDeleteAppointmentAction';
import axios from 'axios';
import { removeAppointment } from '@/app/redux/features/appointments/appointmentsActions';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalDeleteAppointment = () => {
    const dispatch = useDispatch();
    const URL_BASE = "http://localhost:3001"
    const [id, setId] = useState('');
    const {isOpen,data} = useSelector((state) => state.modalDeleteAppointment);

    const handleClose =  () => {
        dispatch(closeModalDeleteAppointmentAction());
    }

    useEffect(() => {
      setId(data);
    },[id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            //await axios.delete(`${URL_BASE}/appointments/${id}`);
            console.log(id, "modalid")
           dispatch(removeAppointment(id))
            dispatch(closeModalDeleteAppointmentAction());
            toast.success(`La reserva se eliminó con éxito`, {
              className: "toastSuccess",
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 3000,
              hideProgressBar: true,
            });
        } catch (error) {
            toast.error(`Hubo un error al eliminar la reserva`, {
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
            <div className='fixed top-0 left-0 flex justify-center items-center w-full h-full z-50'  style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }} >
                <div className='w-full h-full flex justify-center items-center relative'>
                    <RiCloseFill className='absolute top-2 right-2 text-white text-[35px] cursor-pointer hover:text-primary' onClick={handleClose}/>
                    <div className="bg-secondary-900 z-50 opacity-100  w-[400px] flex flex-col p-6 rounded-lg">
                        <form onSubmit={handleSubmit} className='flex flex-col'>
                            <h3 className='font-rocksalt text-[18px] mb-4 text-white'> <RiAlertFill className='text-red-600'/> Estás seguro que quieres cancelar esta reserva?</h3>
                            
                            <div className='flex gap-x-5 w-full justify-center items-center'>
                                <label className='cursor-pointer flex gap-x-0.5 items-center hover:text-red-400 ' onClick={handleClose} > <RiCloseFill className='text-red-300 text-[18px] hover:text-red-400' /> No</label>
                                <button type='submit' className='flex gap-x-0.5 items-center hover:text-primary/80'> <RiCheckFill className=' text-sky-300 text-[18px] hover:text-primary/80'/> Si </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        }
    </>
  )
}

export default ModalDeleteAppointment