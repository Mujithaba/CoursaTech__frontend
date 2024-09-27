import Api from "../services/axios";
import errorHandler from "./error";
import userRoutes from "../services/endPoints/userEndPoints";
import { AxiosError } from "axios";
import { IReportIssues } from "../services/types";

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
    const res = await Api.patch(userRoutes.forgotPassReset, {
      email,
      password,
    });

    return res;
  } catch (error) {
    console.log("error:", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};

export const homePageData = async (userId: string): Promise<any> => {
  try {
    const res = await Api.get(userRoutes.homePage, { params: { id: userId } });
    return res;
  } catch (error) {
    console.log("error:", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};

// get all courses
export const getCourses = async (
  page: number,
  limit: number,
  searchTerm: string,
  category: string
) => {
  try {
    const res = await Api.get(userRoutes.getCourse, {
      params: { page, limit, searchTerm, category },
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
    const res = await Api.get(userRoutes.getViewCourse, {
      params: {
        id: course_id,
        userId: userid,
      },
    });

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
  username: string,
  instructorName: string
) => {
  try {
    console.log(
      message,
      userId,
      instructorId,
      username,
      instructorName,
      "ppppppppp"
    );
    const res = await Api.post(userRoutes.sendusermsg, {
      message,
      userId,
      instructorId,
      username,
      instructorName,
    });

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
    const res = await Api.get(userRoutes.fetchAssignments, {
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
// getInstructorData
export const getInstructorData = async (instructorId: string) => {
  try {
    const res = await Api.get(userRoutes.getInstructor, {
      params: {
        instructorId,
      },
    });

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
// getUserInfo
export const getUserInfo = async (userId: string) => {
  try {
    const res = await Api.get(userRoutes.getStudentInfo, {
      params: {
        userId,
      },
    });
    return res;
  } catch (error) {
    console.log("error", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};
// updateUserData
export const updateUserData = async (formData: FormData) => {
  try {
    const res = await Api.patch(userRoutes.updatedUserData, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    console.log("error", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};
// updatePassword
export const updatePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string
) => {
  try {
    const res = await Api.patch(userRoutes.changePassword, {
      userId,
      currentPassword,
      newPassword,
    });
    return res;
  } catch (error) {
    console.log("error", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};
// category fetch
export const categoryData = async () => {
  try {
    const res = await Api.get(userRoutes.getAllCategories);
    return res.data;
  } catch (error) {
    console.log("error:", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};
// getHomeData
export const getHomeData = async () => {
  try {
    const res = await Api.get(userRoutes.getHomePageData);

    return res.data;
  } catch (error) {
    console.log("error:", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};

// entrolledCourseData
export const entrolledCourseData = async (userId: string) => {
  try {
    const res = await Api.get(userRoutes.getEntrolledCourse, {
      params: {
        userId,
      },
    });
    console.log(res);

    return res;
  } catch (error) {
    console.log("error:", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};
// getInitialMsgs
export const getInitialMsgs = async (senderId: string, receiverId: string) => {
  try {
    const res = await Api.get(userRoutes.getInitialMsg, {
      params: {
        senderId,
        receiverId,
      },
    });

    return res.data;
  } catch (error) {
    console.log("error:", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};
// getWalletData
export const getWalletData = async (userId: string) => {
  try {
    const res = await Api.get(userRoutes.getWallet, {
      params: {
        userId,
      },
    });
    return res;
  } catch (error) {
    console.log("error:", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};

// walletPayment
export const walletPayment = async (
  userId: string,
  instructorId: string,
  courseId: string,
  coursePrice: number,
  courseName: string
) => {
  try {
    const res = await Api.post(userRoutes.paymentWallet, {
      userId,
      instructorId,
      courseId,
      coursePrice,
      courseName,
    });
    return res;
  } catch (error) {
    console.log("error:", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};
