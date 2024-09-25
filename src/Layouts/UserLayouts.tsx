import Header from "../Components/User/Header";
import Footer from "../Components/User/Footer";
import { Outlet } from "react-router-dom";

function UserLayouts() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default UserLayouts;
