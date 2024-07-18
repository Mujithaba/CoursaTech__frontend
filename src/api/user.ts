import Api from "../services/axios";
import errorHandler from "./error";
import userRoutes from "../services/endPoints/userEndPoints";
import { AxiosError  } from "axios";

interface userFormData {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}

interface loginInfo {
  email: string;
  password: string;
}

// ---signup api---
export const signup = async (userData: userFormData) => {
  try {
    const response = await Api.post(userRoutes.signup, userData);

    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return errorHandler(error);
    }
    // If it's not an AxiosError, rethrow or handle it differently
    throw error;
  }
};

// ---otp verification api---
export const OTPverify = async (data: {}) => {
  try {
    console.log(data);
    const res = await Api.post(userRoutes.verify, data);
    console.log(res);

    return res;
  } catch (error) {
    console.log("error:", error);
    if (error instanceof AxiosError) {
      return errorHandler(error);
    }
    throw error;
  }
};

//login api
export const login = async (loginData: loginInfo)=> {
  try {
    const res = await Api.post(userRoutes.login,loginData)
    console.log(res,"login data user");

    return res
    
  } catch (error) {
    console.log("error:", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};

export const resendOTP = async(name:string,email:string)=>{
  try {

    const res = await Api.post(userRoutes.resendOtp,{name,email});
    return res
    
  } catch (error) {
    console.log("error:", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
}

// google sign up or login api
export const googleIN = async (data:{})=>{
  try {

    const res = await Api.post(userRoutes.googleUse,data);
    return res
    
  } catch (error) {
    console.log("error:", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
}