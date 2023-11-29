import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./redux/provider";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ConnectInk",
  description: "ConnectInk App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap" rel="stylesheet"/>
          <link href="https://fonts.googleapis.com/css2?family=New+Rocker&display=swap" rel="stylesheet"></link>
      </head>
      <body className="bg-secondary-100 text-gray-300">
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
