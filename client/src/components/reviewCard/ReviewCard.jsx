import { useEffect, useState } from "react"
import axios from "axios"
import Image from "next/image"
import { comment } from "postcss"

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
        <div>
            {customer.fullName ? (
                <div className="border-b-[1px] border-primary/30 mt-6">
                    <h1>Review hecha por {customer.fullName}</h1>
                    <Image className="w-20" unoptimized loader={imageLoader} src={customer.image} alt={customer.fullName} width={40} height={40} />
                    <h2>Puntaje: {rating}</h2>
                    <h3 className="mb-4">{comment}</h3>
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