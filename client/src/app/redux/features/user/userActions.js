import { getUser, cleanUser } from "./userSlice";
import axios from "axios";

const URL_BASE = "http://localhost:3001";

export const getUserByEmail =
  (email, password, router, toast) => async (dispatch) => {
    try {
      const response = await axios.post(`${URL_BASE}/auth`, {
        email: email,
        password: password,
      });

      if (response.data.access) {
        const user = response.data.user;
        dispatch(getUser(user));
        router.replace("/a-dashboard/home");
      }
    } catch (error) {
      toast.error("Usuario y/o contraseña incorrectos", {
        className: "toastError",
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };


  dispatch(cleanUser());
};
