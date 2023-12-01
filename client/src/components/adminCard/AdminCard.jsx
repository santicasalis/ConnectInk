import Image from "next/image"
import { SlOptions } from "react-icons/sl";
import { Menu, MenuItem, MenuButton} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import { RiMoreFill,  RiEyeLine  } from "react-icons/ri";
import { MdBlock } from "react-icons/md";
import { DeleteArtists } from "@/app/redux/features/artists/artistActions";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import Modal from 'react-modal';
import Link from "next/link";

export default function AdminCard({fullName,location,shopName,image, id}){

  const [isModalOpen, setIsModalOpen] = useState(false);


    
    const imageLoader = ({ src }) => {
        return src;
      };

      const dispatch = useDispatch();

      const closeModal = () => {
        setIsModalOpen(false);
      };
       

      const openModal = () => {
        setIsModalOpen(true);
      };
    
      const confirmDelete = () => {
        dispatch(DeleteArtists(id));
        closeModal();
         
      };
    
     


    return (
        <div>
            <div className="bg-secondary-100 w-[550px] h-[250px] ml-[10px] mb-[10px] rounded">
            <div className="flex gap-x-1 items-center">
            <Image
              className="rounded-full object-cover"
              src={image}
              loader={imageLoader}
              width={40}
              height={40}
              alt={`${fullName} profile pic`}
            />
            <h1 className="font-bold col-span-2">
              {fullName}
            </h1>
         
           <div className='p-2 flex items-center justify-center ml-auto'>
                    <Menu menuButton={
                        <MenuButton >  
                            <RiMoreFill className='text-white text-[25px] cursor-pointer'/>
                        </MenuButton>}
                    transition
                    menuClassName={'hover:bg-red text-red-500'}>
                        <MenuItem>
                            <Link href='' className='flex items-center gap-2 text-sm py-1.5'>
                                <RiEyeLine  />
                                Ver Publicaciones
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <button onClick={openModal} className='flex items-center gap-2 text-sm py-1.5'>
                                <MdBlock  />
                                Bannear artista
                            </button>
                        </MenuItem>
                    </Menu>
                </div>
          </div>
          <div className="font-bolt text-center text-4xl">
            {shopName}
          </div>
          <div className="font-bolt text-center text-xl mt-[20px]">
            {location}
          </div>
          
          <div className="mt-[40px] ml-[10px]">
          ☆☆☆☆☆	
          </div>
        
            </div>
            
            <Modal
             isOpen={isModalOpen}
             onRequestClose={closeModal}
            
             className="w-1/4 mx-auto p-4 border rounded-md bg-secondary-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
             >

            <div className="bg-secondary-100   text-center h-[50px] rounded">
            <p className="font-bold" >¿Estás seguro de que quieres bannear este artista?</p>
            <div className="gap-[20px] flex items-center justify-center">
            <button onClick={confirmDelete} className="text-green-500">Sí</button>
            <button onClick={closeModal} className="text-red-500">No</button>
               </div>
           
          </div>
            </Modal>
           
           
        </div>
    )
}
