import Image from "next/image"

export default function Card ({name, location, tattoo}){
    return (
        <div className="w-80 h-80 mx-8 bg-white rounded text-black flex flex-col items-center">
            <h1>{name}</h1>
            <p>{location}</p>
            <Image
            src={tattoo.src}
            alt={tattoo}
            width={500}
            height={500}
            className="object-center object-cover w-64 h-64 m-2 rounded"
            />
        </div>
    )
}