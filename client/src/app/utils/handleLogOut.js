// import { useRouter } from "next/navigation";

// import { auth } from "../../firebase";
// import { signOut } from "firebase/auth";

// import { logOut } from "@/app/redux/features/user/userActions";
// import { useDispatch } from "react-redux";

// const router = useRouter();
// const dispatch = useDispatch();

// export const handleLogOut = async () => {
//   console.log("Cerrar sesión");

//   try {
//     await signOut(auth);
//     dispatch(logOut());
//     router.replace("/");
//   } catch (error) {
//     console.error("Error al cerrar sesión:", error);
//   }
// };
