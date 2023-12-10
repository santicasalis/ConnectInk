"use client";

import React, { useEffect, useState } from "react";
import PostDashboard from "../postDashboard/PostDashboard";
import { useSelector, useDispatch } from "react-redux";
import { bringUserPosts } from "../../app/redux/features/user/userActions";

const PostsDashboard = () => {

  const user = useSelector((state) => state.user.logedInUser);
  const isOpenmodalCreate = useSelector((state) => state.modalCreate.isOpen);
  const isOpenModalDelete = useSelector((state) => state.modalDelete.isOpen);
  const isOpenModalEditar = useSelector((state) => state.modalEdit.isOpen);
  const isOpenModaLoading = useSelector((state) => state.modalLoading.isOpen);
  console.log(isOpenModaLoading);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(bringUserPosts(user.id))
  }, [isOpenmodalCreate, isOpenModalDelete, isOpenModalEditar])


  return (
    <div className="flex flex-col items-center w-full ">
      {user?.publications?.length > 0 ? (
        [...user.publications].filter((post) => {return post.disabled == false}).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((publication) => (
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
