const {writeFile} = require("fs/promises")
const cloudinary = require('cloudinary').v2;
const path = require("path")

cloudinary.config({ 
    cloud_name: 'ds1t28shw', 
    api_key: '757939339518781', 
    api_secret: 'EkD0cOx0t4TK3h9tWiUydeosNe8' 
  });

async function getImageController(data) {
    const image = data.get("image")

    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const filePath = path.join(process.cwd(), "public", image.name)
    await writeFile(filePath, buffer)

    const response = await cloudinary.uploader.upload(filePath)
    console.log(response)
}

module.exports = getImageController