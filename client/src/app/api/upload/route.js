import { NextResponse } from "next/server";

import {v2 as cloudinary} from "cloudinary"
          
cloudinary.config({ 
  cloud_name: 'dlmzmi7js', 
  api_key: '939447634578667', 
  api_secret: 'U5tqy-suAjwguGJQuS4o54mMjcY' 
});

export async function POST(request) {
    const data = await request.formData()
    const image = data.get("file")

    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const response = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({}, (error, result) => {
            if(error){
                reject(error)
            } 
            resolve(result)
        }).end(buffer)
    })
    return NextResponse.json({
        url: response.secure_url
    })

}