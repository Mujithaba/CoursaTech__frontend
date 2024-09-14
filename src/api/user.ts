import Api from "../services/axios";
import errorHandler from "./error";
import userRoutes from "../services/endPoints/userEndPoints";
import { AxiosError, AxiosResponse } from "axios";
import { IReportIssues } from "../services/types";

interface userFormData {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   isBlocked: boolean;
// }

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
    const res = await Api.post(userRoutes.verify, data);

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
export const login = async (loginData: loginInfo) => {
  try {
    const res = await Api.post(userRoutes.login, loginData);

    return res;
  } catch (error) {
    console.log("error:", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};

export const resendOTP = async (name: string, email: string) => {
  try {
    const res = await Api.post(userRoutes.resendOtp, { name, email });
    return res;
  } catch (error) {
    console.log("error:", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};

// google sign up or login api
export const googleIN = async (data: {}) => {
  try {
    const res = await Api.post(userRoutes.googleUse, data);
    return res;
  } catch (error) {
    console.log("error:", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};

export const forgotPasswordEmail = async (email: string) => {
  try {
    const res = await Api.post(userRoutes.forgotPasswordEmail, { email });
    return res;
  } catch (error) {
    console.log("error:", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};

export const forgotOTPverify = async (data: {}) => {
  try {
    const res = await Api.post(userRoutes.forgotOtpVerify, data);
    return res;
  } catch (error) {
    console.log("error:", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};

export const newPasswordSet = async (email: string, password: string) => {
  try {
    console.log(email, password, "jjjjj");

    const res = await Api.patch(userRoutes.forgotPassReset, {
      email,
      password,
    });
    console.log(res, "gggttt");

    return res;
  } catch (error) {
    console.log("error:", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};

export const homePageData = async (userId: string): Promise<any> => {
  try {
    console.log(userId, "kkk");

    const res = await Api.get(userRoutes.homePage, { params: { id: userId } });
    return res;
  } catch (error) {
    console.log("error:", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};

// get all courses
export const getCourses = async (page: number, limit: number) => {
  try {
    const res = await Api.get(userRoutes.getCourse, {
      params: { page, limit },
    });
    return res.data;
  } catch (error) {
    console.log("error", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};
// viewCoureseDetails
export const viewCoureseDetails = async (course_id: string, userid: string) => {
  try {
    console.log(course_id, "cours....id");

    const res = await Api.get(userRoutes.getViewCourse, {
      params: {
        id: course_id,
        userId: userid,
      },
    });
    // console.log(res,"data course view");

    return res.data;
  } catch (error) {
    console.log("error:", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};
// payment
export const createPayment = async (courseId: string) => {
  try {
    console.log(courseId, "id course for payment ");

    const res = await Api.post(userRoutes.createPayment, { courseId });
    return res;
  } catch (error) {
    console.log("error", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};
// payment success
export const paymentSuccess = async (data: {}) => {
  try {
    const res = await Api.post(userRoutes.paymentSuccess, { data });
    return res;
  } catch (error) {
    console.log("error", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};
// sendUserMsg
export const sendUserMsg = async (
  message: string,
  userId: string,
  instructorId: string,
  username: string
) => {
  try {
    console.log(message, userId, instructorId, username, "ppppppppp");
    const res = await Api.post(userRoutes.sendusermsg, {
      message,
      userId,
      instructorId,
      username,
    });
    console.log(res, "res chat ");

    return res;
  } catch (error) {
    console.log("error", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};
// uploadReviews
export const uploadReviews = async (
  rating: number,
  feedback: string,
  courseId: string,
  userId: string,
  userName: string
) => {
  try {
    const res = await Api.post(userRoutes.uploadReview, {
      rating,
      feedback,
      courseId,
      userId,
      userName,
    });
    return res;
  } catch (error) {
    console.log("error", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};
// reviewsFetching
export const reviewsFetching = async (courseId: string) => {
  try {
    const res = await Api.get(userRoutes.reviewsFetch, {
      params: {
        courseId,
      },
    });

    return res.data;
  } catch (error) {
    console.log("error", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};
// eachAssignmentsFetch
export const eachAssignmentsFetch = async (courseId: string) => {
  try {
    console.log(courseId, "ppp");

    const res = await Api.get(userRoutes.fetchAssignments, {
      params: {
        courseId,
      },
    });
    console.log(res, "assignment res");

    return res.data;
  } catch (error) {
    console.log("error", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};
// getInstructorData
export const getInstructorData = async (instructorId: string) => {
  try {
    console.log(instructorId, "ppp");

    const res = await Api.get(userRoutes.getInstructor, {
      params: {
        instructorId,
      },
    });
    console.log(res, "data instructor");

    return res.data;
  } catch (error) {
    console.log("error", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};
// submitTheReport
export const submitTheReport = async (
  courseId: string,
  userId: string,
  formState: IReportIssues
) => {
  try {
    console.log(courseId, userId, formState, "Sending data");
    const res = await Api.post(userRoutes.submitReport, {
      courseId,
      userId,
      formState,
    });
    return res.data;
  } catch (error) {
    console.log("error", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};

// getRatings
export const getRatings = async () => {
  try {
    const res = await Api.get(userRoutes.getRating);
    return res.data;
  } catch (error) {
    console.log("error", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};
