

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className='min-h-screen flex items-center justify-center p-4'>
            {children}
        </div>
      </body>
    </html>
  )
}
