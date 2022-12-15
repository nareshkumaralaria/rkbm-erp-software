import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

// Success - Colored with custom icon
export const SUCCESS_COLORED_TOP_RIGHT = (message) => toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    pauseOnFocusLoss: false,
    draggable: true,
    progress: undefined,
    icon: "🚀",
    theme: "colored",
});

// Success - Light with custom icon 
export const SUCCESS_LIGHT_TOP_RIGHT = (message) => toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    pauseOnFocusLoss: false,
    draggable: true,
    progress: undefined,
    icon: "🚀",
    theme: "light",
});

// Error - Colored with custom icon
export const ERROR_COLORED_TOP_RIGHT = (message) => toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    pauseOnFocusLoss: false,
    draggable: true,
    progress: undefined,
    icon: "😢",
    theme: "colored",
});

// Error - Light with custom icon 
export const ERROR_LIGHT_TOP_RIGHT = (message) => toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    pauseOnFocusLoss: false,
    draggable: true,
    progress: undefined,
    icon: "😢",
    theme: "light",
});

