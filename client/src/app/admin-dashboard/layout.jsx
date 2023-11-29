import AdminSideBar from "@/components/adminsidebar/AdminSideBar";
import Header from "@/components/header/Header";
import Link from 'next/link'

export default function DashboardLayout({ children }) {
    return (
          <div className="min-h-screen grid grid-cols-1 xl:grid-cols-6">
                <AdminSideBar /> 
                <div className="xl:col-span-5 ">
                    <Header/>
                    <div className="h-[92vh] overflow-y-scroll p-8 flex flex-col items-center font-bold text-gray-300 text-sm w-full">
                        {children}
                    </div>
                </div>
          </div>
    )
  }
  