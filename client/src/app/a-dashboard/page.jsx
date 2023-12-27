"use client"
import React from "react";
import { RiEdit2Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ADashboard = () => {
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
    <div className="bg-secondary-900 p-8 rounded-xl w-full">
      <h1 className="text-4xl"> Home</h1>
      <hr className="my-8 border-gray-500" />
    </div>
  );
};

export default ADashboard;
