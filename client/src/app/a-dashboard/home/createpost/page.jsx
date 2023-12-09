import ArtistPost from "@/components/artistPost/artistPost";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CreatePost = () => {
  const user = useSelector((state) => state.user.logedInUser);
  const router = useRouter();

  useEffect(() => {
    if (!user.userType) {
      router.replace("/auth");
    } else if (user.userType !== "artist") {
      router.replace("/");
    }
  }, []);
  return (
    <div className="w-full">
      <ArtistPost />
    </div>
  );
};

export default CreatePost;
