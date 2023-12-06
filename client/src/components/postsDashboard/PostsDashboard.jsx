"use client";

import React, { useEffect, useState } from "react";
import PostDashboard from "../postDashboard/PostDashboard";
import { useSelector, useDispatch } from "react-redux";
import { bringUserPosts } from "@/app/redux/features/user/userActions";

const PostsDashboard = () => {

  const user = useSelector((state) => state.user.logedInUser);
  const modalCreate = useSelector((state) => state.modalCreate);
  const modalDelete = useSelector((state) => state.modalDelete);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(bringUserPosts(user.id))
  }, [modalCreate, modalDelete])


  return (
    <div className="flex flex-col items-center w-full ">
      {user?.publications?.length > 0 ? (
        user.publications.map((publication) => (
          <PostDashboard
            key={publication.id}
            publication={publication}
            image={user.image}
            name={user.fullName}
          />
        ))
      ) : (
        <p>No hay publicaciones disponibles.</p>
      )}
    </div>
  );
};

export default PostsDashboard;
