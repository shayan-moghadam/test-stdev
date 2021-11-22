import { toast } from "react-toastify";

export function alertError(message) {
  toast.error(`${message}`, {
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: false,
  });
}

export function alertSuccess(message) {
  toast.success(`${message}`, {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: false,
  });
}
