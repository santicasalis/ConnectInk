"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { uploadImage } from "@/app/utils/uploadImage";

const ArtistPost = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const handleImageChange = async (event) => {
    const imageUrl = await uploadImage(event.target.files[0]);
    setImage(imageUrl);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //dispatch(postPosts({ image, description }));
    const response = await axios.post("http://localhost:3001/publications", {
      image,
      description,
      artist_id: "b0035e46-1f77-49f8-9410-f0df689e3ebc",
    });
  };

  return (
    <form
      className="w-full p-4 flex flex-col items-center"
      onSubmit={handleSubmit}
    >
      <input className="p-8 " type="file" onChange={handleImageChange} />
      {image !== null && (
        <img src={image} className="w-[200px] h-[200px] mb-8" />
      )}

      <textarea
        className="w-1/3 text-lg text-black mb-8"
        rows="10"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Descripción"
      />
      <button
        className={`py-2 px-4 bg-secondary-100 border border-500 rounded-lg transition duration-300 ease-in-out ${
          !image
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-white hover:text-black"
        }`}
        type="submit"
        disabled={!image}
      >
        Subir Post
      </button>
    </form>
  );
};

export default ArtistPost;
