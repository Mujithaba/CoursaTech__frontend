import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { tutorUpdateCheck } from "../../../api/tutor";
import { logOut } from "../../../redux/slices/tutorSlice";
import { useEffect } from "react";

export default function Course() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tutorInfo } = useSelector((state: RootState) => state.tutorAuth);

  const fetchHomeData = async () => {
    try {
      if (tutorInfo) {
        console.log(tutorInfo._id, "jjjj");

        const response = await tutorUpdateCheck(tutorInfo._id);
        console.log(response, "home response");
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
    fetchHomeData();
  }, []);

  return (
    <div className="m-4">
      <div className="text-black">
        <h1>My Courses</h1>
      </div>
    </div>
  );
}
