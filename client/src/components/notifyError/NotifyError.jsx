import { toast } from "react-toastify";

export const notifyError = (error) => {
  const message =
    error.response?.data?.message ||
    error.message ||
    "Ocurrió un error inesperado";
  toast.error(message);
};