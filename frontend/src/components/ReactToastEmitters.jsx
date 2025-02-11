import { toast, Slide } from "react-toastify";

const toastConfig = {
    success: {
        theme: "colored",
        transition: Slide,
        style: {
            backgroundColor: '#009E60',
            color: '#fff'
        },
    },
    error: {
        theme: "colored",
        transition: Slide,
        style: {
            backgroundColor: '#E34E43',
            color: '#fff'
        },
    },
}

const createToast = (type) => (message) => {
    toast[type](message, toastConfig[type])
}

export const successToast = createToast('success')
export const errorToast = createToast('error')