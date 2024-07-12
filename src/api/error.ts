import { toast } from "react-toastify";
import { AxiosError } from "axios";
import axios from "axios";

interface IErrorResponse {
    message: string;
    accountType?: string;
  }


  const errorHandler = (error: Error | AxiosError) => {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      if (axiosError.response?.data) {
        const errorResponse = axiosError.response.data as IErrorResponse;
        if (axiosError.response.status === 400) {
          toast.error(errorResponse.message);
        } else if (errorResponse.message) {
          toast.error(errorResponse.message);
        } else {
          console.log("Error response has no message");
          toast.error("An error occurred. Please try again!");
        }
      } else {
        toast.error("An error occurred. Please try again!");
        console.log("axiosError", axiosError.message);
      }
    } else {
      toast.error("An error occurred. Please try again!");
      console.log("Error", error.message);
    }
  };




// const errorHandler = (err: AxiosError<ErrorResponse>) => {
    
//     console.log("error happened",err)
    
//     const errorMessage:any = err.response?.data;
//     console.log(errorMessage,"yesss")
//     toast.error(errorMessage);
// };

export default errorHandler;