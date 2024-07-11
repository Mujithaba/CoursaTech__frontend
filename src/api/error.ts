import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { ErrorResponse } from "react-router-dom";


const errorHandler = (err: AxiosError<ErrorResponse>) => {
    
    console.log("error happened",err)
    
    const errorMessage:any = err.response?.data;
    console.log(errorMessage,"yesss")
    toast.error(errorMessage,{position:"top-center"});
};

export default errorHandler;