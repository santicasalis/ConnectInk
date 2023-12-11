import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

export const forgetPass = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);

    toast.success(
      `Se ha enviado el correo de reestablecimiento  de contraseña a  ${email} `,
      {
        className: "toastSuccess",
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
      }
    );
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(
      `Error al enviar el correo electrónico: ${errorCode} - ${errorMessage}`
    );
    toast.error("Debes ingresar un correo electrónico ", {
      className: "toastError",
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      hideProgressBar: true,
    });
  }
};
