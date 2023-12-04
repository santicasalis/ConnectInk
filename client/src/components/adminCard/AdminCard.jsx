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
import { openModalDeleteArtistAction } from "@/app/redux/features/modalDeleteArtist/modalDeleteArtistAction";


export default function AdminCard({fullName,location,shopName,image, id}){
  
  const dispatch = useDispatch()

   const handleBannear = ()=>{
     dispatch(openModalDeleteArtistAction(id))
    
   }
    
    const imageLoader = ({ src }) => {
        return src;
      };

    

      // const closeModal = () => {
      //   setIsModalOpen(false);
      // };
       

      // const openModal = () => {
      //   setIsModalOpen(true);
      // };
    
      // const confirmDelete = () => {
      //   dispatch(DeleteArtists(id));
      //   closeModal();
         
      // };
    
     


    return (
        <div>
            <div className="bg-secondary-100 w-[550px] h-[250px] ml-[10px] mb-[10px] rounded-xl">
            <div className="flex gap-x-1 items-center p-4">
            <Image
            unoptimized
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
                            <Link href={`registeredArtists/${id}`} className='flex items-center gap-2 text-sm py-1.5'>
                                <RiEyeLine  />
                                Ver Publicaciones
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <button onClick={handleBannear} className='flex items-center gap-2 text-sm py-1.5'>
                                <MdBlock  />
                                Bannear artista
                            </button>
                        </MenuItem>
                    </Menu>
                </div>
          </div>
          <div className="font-bolt text-center text-4xl font-newrocker">
            {shopName}
          </div>
          <div className="font-bolt text-center text-xl mt-[20px] font-newrocker">
            {location}
          </div>
          
          <div className="mt-[40px] ml-[10px]">
          ☆☆☆☆☆	
          </div>
        
            </div>
            
            
           
           
        </div>
    )
}
