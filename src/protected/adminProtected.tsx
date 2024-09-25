import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate, Outlet } from "react-router-dom";

export default function adminProtected() {
  const { adminInfo } = useSelector((state: RootState) => state.adminAuth);

  return adminInfo ? <Outlet /> : <Navigate to="/login" replace />;
}
