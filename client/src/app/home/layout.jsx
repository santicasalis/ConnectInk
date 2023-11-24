import SideBar from "@/components/sidebar/SideBar";
import Header from "@/components/header/Header";
import Link from 'next/link'

export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>
          <div className="min-h-screen grid grid-cols-1 xl:grid-cols-6">
                <SideBar />
                <div className="xl:col-span-5 ">
                    <Header/>
                    <div className="h-[92vh] overflow-y-scroll p-8 flex flex-col items-center font-bold text-gray-300 text-sm">
                        <nav className="flex items-center bg-secondary-100 rounded-md mb-8">
                          <Link href='/home'>
                            <button className="px-4 py-2 hover:bg-secondary-900">
                              My Profile
                            </button>
                          </Link >
                          <Link href='/home/tattoo-gallery'>
                            <button className="px-4 py-2  hover:bg-secondary-900">
                              Create Tattoo
                            </button>
                          </Link>
                            <button className="px-4 py-2  hover:bg-secondary-900">
                              Option 3
                            </button>
                            <button className="px-4 py-2  hover:bg-secondary-900">
                              Option 4
                            </button>
                        </nav>
                        {children}
                    </div>
                </div>
          </div>
        </body>
      </html>
    )
  }
  