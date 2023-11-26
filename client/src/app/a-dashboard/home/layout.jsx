import TopBarOptions from "@/components/topBarOptions/TopBarOptions";


export default function DashboardLayout({ children }) {
    return (
      <div className='bg-secondary-100 p-8 rounded-xl w-full'>
         <h1 className='text-4xl'> Home</h1>
         <hr className='my-8 border-gray-500'/>
         <TopBarOptions />
         {children}
      </div>    
    )
  }