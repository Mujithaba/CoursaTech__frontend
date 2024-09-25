import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../redux/store";

function TutorHearder() {
  const { tutorInfo } = useSelector((state: RootState) => state.tutorAuth);

  return (
    <header className="bg-[#0a0e3c]  text-white flex justify-between items-center p-4 mt-1 ms-6 me-1 rounded-lg">
      <div className="text-xl  font-bold"></div>
      <div className="flex items-center">
        <div className="relative">
          <NavLink
            to="/tutor/instructorProfile"
            className={({ isActive }) =>
              `  flex items-center py-2.5 hover:border rounded-full  px-4  transition duration-200 ${
                isActive
                  ? "border justify-center rounded-full text-white"
                  : "hover:border text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <CgProfile
                  className="mr-2"
                  size={isActive ? 17 : 20} // Change size based on isActive
                  //
                />
                <span
                  className={` transition-all duration-200 ${
                    isActive ? "text-sm" : "text-sm"
                  }`}
                >
                  {tutorInfo.name}
                </span>
              </>
            )}
          </NavLink>

          <div className="absolute right-0 z-20 mt-2 w-48 bg-white rounded-md shadow-xl"></div>
        </div>
      </div>
    </header>
  );
}
export default TutorHearder;
