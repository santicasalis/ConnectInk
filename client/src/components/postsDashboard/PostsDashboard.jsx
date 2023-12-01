"use client";

import React from "react";
import PostDashboard from "../postDashboard/PostDashboard";
import { useSelector } from "react-redux";

const PostsDashboard = () => {
  const user = useSelector((state) => state.user.logedInUser);
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
