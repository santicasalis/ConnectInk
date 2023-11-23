import SideBar from "@/components/sidebar/SideBar";
import Header from "@/components/header/Header";

export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>
          <div className="min-h-screen grid grid-cols-1 xl:grid-cols-6">
                <SideBar />
                <div className="xl:col-span-5 ">
                    <Header/>
                    <div className="h-[92vh] overflow-y-scroll p-8">
                        {children}
                    </div>
                </div>
          </div>
        </body>
      </html>
    )
  }
  