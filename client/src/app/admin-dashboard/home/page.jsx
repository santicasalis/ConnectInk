import TopBarOptions from "@/components/topBarOptions/TopBarOptions";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const user = useSelector((state) => state.user.logedInUser);
  const router = useRouter();

  useEffect(() => {
    if (!user.userType) {
      router.replace("/auth");
    } else if (user.userType !== "admin") {
      router.replace("/");
    }
  }, []);

  return <div>Inicio</div>;
};

export default Home;
