import Api from "../services/axios";
import adminRoutes from "../services/endPoints/adminEndPoints";
import errorHandler from "./error";
// import { AxiosError } from "axios";
import axios from "axios";
import {TutorsResponse,UsersResponse} from '../services/types'



export const getUsers = async (
  page: number,
  limit: number
): Promise<UsersResponse> => {
  try {
    const res = await Api.get(adminRoutes.allUsers, {
      params: { page, limit },
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorHandler(error);
    } else {
      console.error("Unexpected error:", error);
    }
    return { users: [], totalUsers: 0 };
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
export const getTutors = async (page: number,
  limit: number
): Promise<TutorsResponse> => {
  try {
    const res = await Api.get(adminRoutes.allTutors, {
      params: { page, limit },
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorHandler(error);
    } else {
      console.error("Unexpected error:", error);
    }
    return { tutors: [], totalTutors: 0 };
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
