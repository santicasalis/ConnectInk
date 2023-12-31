"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostCards from "../../components/postCards/PostCards";
import { getAllPosts } from "../redux/features/posts/postsActions";
import axios from "axios";
import { orderPosts } from "../utils/ordenarPosts";
import UserPostDash from "../../components/userPostDash/UserPostDash";
import { useRouter } from "next/navigation";
import { getUserById } from "../redux/features/user/userActions";
import { notifyError } from "../../components/notifyError/NotifyError";

function UDashboard() {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const user = useSelector((state) => state.user.logedInUser);
  // const fireBaseUser = useSelector((state) => state.user.fireBaseUser)

  // useEffect (() => {
  // dispatch(getUserById(fireBaseUser.tokenId))
  // },[fireBaseUser])

  useEffect(() => {
    if (!user.userType) {
      router.replace("/auth");
    } else if (user.userType !== "customer") {
      router.replace("/");
    }
    const fetchData = async () => {
      try {
        const artists = (await axios.get("http://localhost:3001/tattooArtists"))
          .data;
        let allPosts = [];

        artists.forEach((artist) => {
          if (artist?.publications?.length > 0) {
            artist.publications.forEach((publi) => {
              publi["nameArtist"] = artist.fullName;
              publi["profilePic"] = artist.image;
              publi["artistId"] = artist.id;
            });
          }

          allPosts = [...allPosts, ...artist.publications];
        });

        allPosts = orderPosts(allPosts);
        setPosts(allPosts);
      } catch (error) {
        notifyError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-secondary-900 md:p-8 p-1 md:rounded-xl w-full shadow-primary/50 shadow-lg">
      <h1 className="text-4xl text-artistfont font-rocksalt md:pl-5 pl-4 pt-4">
        {" "}
        Inicio{" "}
      </h1>
      <hr className="my-8 border-primary/30" />
      <div className="flex flex-col items-center w-full ">
        {posts.map((post) => {
          return <UserPostDash publication={post} userId = {user.id}/>
        })}
      </div>
    </div>
  );
}

export default UDashboard;
