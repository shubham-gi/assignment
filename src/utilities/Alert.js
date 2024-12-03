import { toast } from "react-toastify";
export const Alert = (msg, flag='w') => {
    if(flag=='s'){
        toast.success(msg)
    }else if(flag=='f'){
        toast.error(msg)
    }else{
        toast.warning(msg)
    }
  };