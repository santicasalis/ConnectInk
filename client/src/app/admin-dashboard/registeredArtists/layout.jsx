import AdminTopBarOptions from "../../../components/admintopBarOptions/AdminTopBarOptions";
import { RiAddFill } from "react-icons/ri";
import Link from 'next/link'


export default function RegisteredLayout({ children }) {
    return (
      <div className='bg-secondary-900 shadow-admin/50 shadow-lg p-8 rounded-xl w-full'>
          <div className="flex ">
              <h1 className='text-4xl font-rocksalt'> Tatuadores </h1>
              
          </div>
         
          <hr className='my-8 border-gray-500'/>
          <AdminTopBarOptions />
          {children}
      </div>    
    )
  }