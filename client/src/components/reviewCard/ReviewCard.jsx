import { useEffect, useState } from "react"
import axios from "axios"
import Image from "next/image"
import { comment } from "postcss"
import { RiUser3Line } from "react-icons/ri";
import StarDetail from "../stardetail/StarDetail";

const ReviewCard = ({customerId, comment, image, rating}) => {
    const [customer, setCustomer] = useState({})
    const imageLoader = ({src}) => {
        return src
    }


    const getCustomerInfo = async () => {
        const response = await axios(`http://localhost:3001/customers/${customerId}`)
        setCustomer(response.data)
    }

    useEffect(() => {
        getCustomerInfo()
    }, [])

    return (
        <div className="bg-secondary-100 rounded-lg  p-3 w-full mb-4">
            {customer.fullName ? (

                <div >
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex gap-x-1">
                            <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                                <Image className="w-full h-full" unoptimized loader={imageLoader} src={customer.image} alt={customer.fullName} width={40} height={40} />
                            </div>
                            <h1 className="flex gap-x-0.5 items-center font-newrocker text-[20px]"> {customer.fullName}</h1>
                        </div>
                        <div className="flex">
                            <StarDetail value={1} rating={rating}/>
                            <StarDetail value={2} rating={rating}/>
                            <StarDetail value={3} rating={rating}/>
                            <StarDetail value={4} rating={rating}/>
                            <StarDetail value={5} rating={rating}/>
                        </div>
                    </div>
                    
                    <h3>{comment}</h3>

                    {image && 
                    <div>
                        Imagen final: 
                        <Image loader={imageLoader} src={image} alt={customer.fullName} width={80} height={80} />
                    </div>
                    }
                </div>
            ) : (
                <h1>Cargando informacion...</h1>
            )}
        </div>
    )
}

export default ReviewCard