
import Link from 'next/link'
import Nav from '@/components/nav/Nav'
import backgroundImage from "../../public/ConnectInk.jpg"

export default function Landing () {
  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
      <Nav/>
        
      </div>
  )
}
