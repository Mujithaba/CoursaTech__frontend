import Api from "../services/axios";
import errorHandler from "./error";
import tutorRoutes from "../services/endPoints/tutorEndPoints";
import { AxiosError } from "axios";
import { ITutorDetails, Modules, User } from "../services/types";

interface tutorFormData {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}

interface loginInfo {
  email: string;
  password: string;
}

// tutor signup api
export const sign_up = async (tutorData: tutorFormData) => {
  try {
    const response = await Api.post(tutorRoutes.signup, tutorData);
    console.log(response, "tutur sign up response");
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
    const res = await Api.post(tutorRoutes.verify, data);
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
export const login = async (loginData: loginInfo) => {
  try {
    const res = await Api.post(tutorRoutes.login, loginData);
    console.log(res, "login data user");

    return res;
  } catch (error) {
    console.log("error:", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};

export const resendOTP = async (name: string, email: string) => {
  try {
    const res = await Api.post(tutorRoutes.resendOtp, { name, email });
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
    const res = await Api.post(tutorRoutes.googleUse, data);
    return res;
  } catch (error) {
    console.log("error:", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};

export const forgotPasswordEmail = async (email: string) => {
  try {
    const res = await Api.post(tutorRoutes.forgotPasswordEmail, { email });
    return res;
  } catch (error) {
    console.log("error:", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};

export const forgotOTPverify = async (data: {}) => {
  try {
    // console.log(data, "dattttttt");

    const res = await Api.post(tutorRoutes.forgotOtpVerify, data);
    return res;
  } catch (error) {
    console.log("error:", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};

export const newPasswordSet = async (email: string, password: string) => {
  try {
    // console.log(email, password, "jjjjj");

    const res = await Api.patch(tutorRoutes.forgotPassReset, {
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
// dashboard
export const tutorUpdateCheck = async (tutorId: string): Promise<any> => {
  try {
    // console.log(tutorId, "kkk");

    const res = await Api.get(tutorRoutes.dashobordPage, {
      params: { id: tutorId },
    });
    return res;
  } catch (error) {
    console.log("error:", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};

// course basic info upload
export const basicInfoUpload = async (
  formdata: FormData,
  instructor_id: string
): Promise<any> => {
  try {
    console.log(formdata, "api ");

    formdata.append("instructor_id", instructor_id);
    const res = await Api.post(tutorRoutes.basicInfoUpload, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res, "form data res");

    return res;
  } catch (error) {
    console.log("error:", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};

// category fetch
export const categoryData = async () => {
  try {
    const res = await Api.get(tutorRoutes.getAllCategories);
    return res.data;
  } catch (error) {
    console.log("error:", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};

// get instructors courses
export const getCoursesInstructor = async (
  instructor_id: string,
  page: number,
  limit: number
) => {
  try {
    const res = await Api.get(tutorRoutes.getInstructorCourses, {
      params: {
        id: instructor_id,
        page,
        limit,
      },
    });
    console.log(res, "data course tutor");

    return res.data;
  } catch (error) {
    console.log("error:", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};
// uploading Curicculum
export const uploadCuricculum = async (
  course_id: string,
  modules: Modules[]
) => {
  try {
    const formData = new FormData();

    formData.append("course_id", course_id);
    formData.append(
      "modules",
      JSON.stringify(
        modules.map((module, moduleIndex) => ({
          ...module,
          lectures:
            module.lectures?.map((lecture, lectureIndex) => ({
              ...lecture,
              video: lecture.video
                ? `lectures[${moduleIndex}][${lectureIndex}].video`
                : "",
              pdf: lecture.pdf
                ? `lectures[${moduleIndex}][${lectureIndex}].pdf`
                : "",
            })) ?? [],
        }))
      )
    );

    // Append files separately
    modules.forEach((module, moduleIndex) => {
      module.lectures?.forEach((lecture, lectureIndex) => {
        if (lecture.video) {
          formData.append(
            `lectures[${moduleIndex}][${lectureIndex}].video`,
            lecture.video,
            lecture.video.name
          );
        }
        if (lecture.pdf) {
          formData.append(
            `lectures[${moduleIndex}][${lectureIndex}].pdf`,
            lecture.pdf,
            lecture.pdf.name
          );
        }
      });
    });

    const res = await Api.post(tutorRoutes.uploadingCuricculum, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res;
  } catch (error) {
    console.log("error:", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};
// viewCoureseDetails
export const viewCoureseDetails = async (course_id: string) => {
  try {
    console.log(course_id, "cours....id");

    const res = await Api.get(tutorRoutes.getViewCourse, {
      params: {
        id: course_id,
      },
    });
    console.log(res, "data course view");

    return res.data;
  } catch (error) {
    console.log("error:", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};
// fetchtutorRegisterData
export const fetchtutorRegisterData = async (tutorId: string) => {
  try {
    console.log(tutorId, "id00");

    const res = await Api.get(tutorRoutes.fetchtutorData, {
      params: {
        tutorID: tutorId,
      },
    });

    return res.data;
  } catch (error) {
    console.log("error:", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};
// update profile
export const profileDataSave = async (
  registerData: User | undefined,
  instructorProfile: ITutorDetails | undefined
) => {
  try {
    const res = await Api.patch(tutorRoutes.profileDetailSave, {
      registerData,
      instructorProfile,
    });
    return res;
  } catch (error) {
    console.log("error:", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};
// storeMsgsFetching
export const storeMsgsFetching = async (instructor_id: string) => {
  try {
    const res = await Api.get(tutorRoutes.msgsFetching, {
      params: { instructorId: instructor_id },
    });
    console.log(res.data.data, "res conver");
    return res.data.data;
  } catch (error) {
    console.log("error:", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};
// instructor course name for assignment add page
export const instructorCourse = async (instructorId: string) => {
  try {
    const res = await Api.get(tutorRoutes.coursesForAssignment, {
      params: {
        instructorId,
      },
    });
    return res.data;
  } catch (error) {
    console.log("error:", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};
// uploadingAssignment
export const uploadingAssignment = async (formdata: {}) => {
  try {
    const res = await Api.post(tutorRoutes.uploadAssignment, formdata, {
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
// assignmentFetching
export const assignmentFetching = async (instructorId: string) => {
  try {
    const res = await Api.get(tutorRoutes.assignmentsFetch, {
      params: {
        instructorId,
      },
    });
    console.log(res.data, "uuuu");
    return res.data;
  } catch (error) {
    console.log("error", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};
// reviewsFetching
export const reviewsFetchingT = async (courseId: string) => {
  try {
    const res = await Api.get(tutorRoutes.reviewsFetch, {
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
export const eachAssignmentsFetchT = async (courseId: string) => {
  try {
    console.log(courseId, "ppp");

    const res = await Api.get(tutorRoutes.fetchAssignments, {
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
export const getInstructorDataT = async (instructorId: string) => {
  try {
    console.log(instructorId, "ppp");

    const res = await Api.get(tutorRoutes.getInstructor, {
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
// dashboardFetching
export const dashboardFetching = async (instructorId: string) => {
  try {
    const res = await Api.get(tutorRoutes.fetchDashboardData, {
      params: {
        instructorId,
      },
    });
    console.log(res.data, "response--------------");

    return res;
  } catch (error) {
    console.log("error", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
};
// getCourseGrowth
export const getCourseGrowth = async (instructorId:string)=>{
  try {
    const res = await Api.get(tutorRoutes.courseGrowth, {
      params: {
        instructorId,
      },
    });
    console.log(res.data.data, "response--------------");

    return res.data.data;
  } catch (error) {
    console.log("error", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
}

// uploadProfileImage 
export const uploadProfileImage = async(file:File,instructorId:string)=>{
  try {
    const formData = new FormData();
  formData.append('profileImage', file);
  formData.append('tutorId', instructorId);
    const res = await Api.patch(tutorRoutes.updateProfileImg,formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(res,"newImageUrl");
    
    return res.data;

  } catch (error) {
    console.log("error", error);
    const err: Error = error as Error;
    return errorHandler(err);
  }
}