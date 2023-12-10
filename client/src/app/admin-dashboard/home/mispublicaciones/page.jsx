"use client"
import { getAllArtists } from '../../../../app/redux/features/artists/artistActions'
import PostsDashboard from '../../../../components/postsDashboard/PostsDashboard'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUserId } from '../../../../app/redux/features/user/userActions'
import { useRouter } from "next/navigation";

const MyPosts = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.logedInUser);
  const router = useRouter();

  useEffect(() => {
    if (!user.userType) {
      router.replace("/auth");
    } else if (user.userType !== "admin") {
      router.replace("/");
    }
  }, []);

  return (
    <div>
      <PostsDashboard />
    </div>
  );
};

export default MyPosts;
