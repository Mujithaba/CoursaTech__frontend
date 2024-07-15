import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '../../redux/slices/tutorSlice';


 function TutorSideBar() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      dispatch(logOut());
      navigate('/tutor/tutorLogin');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <aside className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0">
      <div className="text-2xl font-semibold text-center">Logo</div>
      <nav>
        <Link to="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          Dashboard
        </Link>
        <Link to="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          Students
        </Link>
        <Link to="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          Settings
        </Link>

        <Link to="/tutor/tutorLogin" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700" onClick={logoutHandler}>
        Logout
        </Link>
      </nav>
    </aside>
  )
}

export default TutorSideBar;