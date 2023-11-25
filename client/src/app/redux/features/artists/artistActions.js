import { getArtists, uploadPost } from "./artistsSlice";

//Hardcodeado hasta que tengamos las rutas, los tatuadores y los tatuajes
import tatuaje1 from "../../../../../public/assets/tatuaje1.jpeg"
import tatuaje2 from "../../../../../public/assets/tatuaje2.jpeg"
import tatuaje3 from "../../../../../public/assets/tatuaje3.jpeg"
import tatuaje4 from "../../../../../public/assets/tatuaje4.jpeg"

const allArtists = [
    {
        id: 1,
        name: "Pablo",
        location: "Caballito",
        tattoos: [
            tatuaje1, tatuaje2
        ]
    },
    {
        id: 2,
        name: "Marcos",
        location: "Zona norte",
        tattoos: [
            tatuaje3
        ]
    },
    {
        id: 3,
        name: "Carla",
        location: "Devoto",
        tattoos: [
            tatuaje4
        ]
    }
]

export const getAllArtists = () => (dispatch) =>{
    dispatch(getArtists(allArtists))
}

