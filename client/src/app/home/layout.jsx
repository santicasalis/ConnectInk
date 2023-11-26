import SideBar from "@/components/sidebar/SideBar";
import Header from "@/components/header/Header";
import Link from 'next/link'

export default function HomeLayout({ children }) {
    return (
          <div className="min-h-screen grid grid-cols-1 xl:grid-cols-6">
                <SideBar />
                <div className="xl:col-span-5 ">
                    <Header/>
                    <div className="h-[92vh] overflow-y-scroll p-8 flex flex-col items-center font-bold text-gray-300 text-sm">
                        <nav className="flex items-center bg-secondary-100 rounded-md mb-8">
                          <Link href='/home'>
                            <span className="px-4 py-2 hover:bg-secondary-900">
                              My Profile
                            </span>
                          </Link >
                          <Link href='/home/tattoo-gallery'>
                            <span className="px-4 py-2  hover:bg-secondary-900">
                              My Tattoo Gallery
                            </span>
                            <span className="px-4 py-2  hover:bg-secondary-900">
                              Create Tattoo
                            </span>
                          </Link>
                            <span className="px-4 py-2  hover:bg-secondary-900">
                              Option 3
                            </span>
                            <span className="px-4 py-2  hover:bg-secondary-900">
                              Option 4
                            </span>
                        </nav>
                        {children}
                    </div>
                </div>
          </div>
    )
  }
  