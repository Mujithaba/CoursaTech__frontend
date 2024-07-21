import Api from "../services/axios";
import adminRoutes from "../services/endPoints/adminEndPoints";
import errorHandler from "./error";
import { AxiosError } from "axios";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
  isBlocked: boolean;
}

export const getUsers = async (): Promise<User[]> => {
  try {
    const res = await Api.get(adminRoutes.allUsers);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorHandler(error);
    } else {
      console.error("Unexpected error:", error);
    }
    return []; // Return an empty array on error
  }
};

export const userBlock = async (userID: string) => {
  try {
    const res = await Api.patch(adminRoutes.blockUser, { userID });
    return res;
  } catch (error) {
    console.log("error:", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};

// unblock user
export const userUnblock = async (userID: string) => {
  try {
    const res = await Api.patch(adminRoutes.unblockUser, { userID });
    return res;
  } catch (error) {
    console.log("error:", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};

// getting all tutors
export const getTutors = async (): Promise<User[]> => {
    try {
      const res = await Api.get(adminRoutes.allTutors);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorHandler(error);
      } else {
        console.error("Unexpected error:", error);
      }
      return []; // Return an empty array on error
    }
  };

//   tutor block
  export const tutorBlock = async (tutorID: string) => {
    try {
      const res = await Api.patch(adminRoutes.blockTutor, { tutorID });
      return res;
    } catch (error) {
      console.log("error:", error);
      const err: Error = error as Error;
      return errorHandler(err);
    }
  };
//   tutor unblock
export const tutorUnblock = async (tutorID: string) => {
    try {
      const res = await Api.patch(adminRoutes.unblockTutor, { tutorID });
      return res;
    } catch (error) {
      console.log("error:", error);
      const err: Error = error as Error;
      return errorHandler(err);
    }
  };