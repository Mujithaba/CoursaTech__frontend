import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../../redux/slices/tutorSlice";
import { basicInfoUpload, tutorUpdateCheck } from "../../../api/tutor";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import BasicCourseInfo from "./courseCreate.tsx/BasicCourseInfo";
import Uploading from "../../Common/Uploading";
import { toast } from "react-toastify";

export default function CourseCreation() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tutorInfo } = useSelector((state: RootState) => state.tutorAuth);

  const fetchUpdateData = async () => {
    try {
      if (tutorInfo) {
        const response = await tutorUpdateCheck(tutorInfo._id);

        if (response.data.data) {
          if (response.data.data.isBlocked) {
            dispatch(logOut());
            navigate("/login");
          }
        }
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUpdateData();
  }, []);

  // basic info upload
  const handleCourseSubmit = useCallback(
    async (data: FormData) => {
      try {
        setIsLoading(true);
        const response = await basicInfoUpload(data, tutorInfo._id);
        console.log(response, "data course add");
        if (response) {
          navigate("/tutor/myCourses");
          toast.success(response.data.message, {
            position: "top-center",
          });
          console.log("Upload successful:", response);
        }
      } catch (error) {
        console.error("Error handling course submit:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [tutorInfo]
  );

  return (
    <>
      {isLoading ? (
        <Uploading />
      ) : (
        <BasicCourseInfo onSubmit={handleCourseSubmit} />
      )}
    </>
  );
}
