import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BsPerson } from "react-icons/bs";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import Logo from "/Logo/icon/SVG-Logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { logOut } from "../../redux/slices/authSlice";

interface UserInfo {
  _id: string;
  name: string;
  email: string;
  isBlock: boolean;
  isAdmin: boolean;
  isGoogle: boolean;
}

interface NavLinksProps {
  userInfo: UserInfo | null;
  mobile?: boolean;
  closeMenu?: () => void;
}

interface UserSectionProps {
  userInfo: UserInfo | null;
  handleLogout: () => void;
  navigate: (path: string) => void;
  mobile?: boolean;
}

function Header() {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    try {
      dispatch(logOut());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header
      className={`fixed w-full z-50 mb-6 transition-all duration-300 ${
        scrolled ? "bg-gray-900 shadow-lg" : "bg-gray-600 "
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center">
            <div className="lg:hidden mr-4">
              <button
                onClick={toggleSideMenu}
                className={`${
                  scrolled ? "text-white" : "text-gray-900"
                } hover:text-gray-300 transition-colors`}
              >
                <FaBars size={24} />
              </button>
            </div>

            <Link to={userInfo ? "/home" : "/"} className="flex items-center">
              <img src={Logo} alt="Logo" className="h-16 w-auto " />
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            <NavLinks userInfo={userInfo} />
          </nav>

          <UserSection
            userInfo={userInfo}
            handleLogout={handleLogout}
            navigate={navigate}
            toggleDropdown={toggleDropdown}
            isDropdownOpen={isDropdownOpen}
            scrolled={scrolled}
          />
        </div>
      </div>

      {/* Side menu for mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 transform ${
          isSideMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:hidden z-50`}
      >
        <div className="p-6">
          <button
            onClick={toggleSideMenu}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <FaTimes size={24} />
          </button>
          <div className="mt-8">
            <NavLinks
              userInfo={userInfo}
              mobile
              closeMenu={() => setIsSideMenuOpen(false)}
            />
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isSideMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
          onClick={toggleSideMenu}
        ></div>
      )}
    </header>
  );
}

const NavLinks: React.FC<NavLinksProps> = ({
  userInfo,
  mobile = false,
  closeMenu,
}) => {
  const location = useLocation();
  const linkClass = `relative ${mobile ? "block py-2" : ""}`;

  const links = [
    { to: userInfo ? "/home" : "/", label: "Home" },
    { to: userInfo ? "/coursePage" : "#", label: "Courses" },
    { to: userInfo ? "/aboutSection" : "/aboutSection", label: "About" },
    { to: userInfo ? "/contactus" : "/contactus", label: "Contact" },
  ];

  return (
    <div
      className={
        mobile ? "flex flex-col space-y-4" : "flex items-center space-x-8"
      }
    >
      {links.map((link) => (
        <Link
          key={link.label}
          to={link.to}
          className={`${linkClass} ${
            location.pathname === link.to
              ? "text-white font-bold"
              : "text-white font-semibold hover:text-gray-300"
          }`}
          onClick={closeMenu}
        >
          {link.label}
          {location.pathname === link.to && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></div>
          )}
        </Link>
      ))}
    </div>
  );
};

const UserSection: React.FC<
  UserSectionProps & {
    toggleDropdown: () => void;
    isDropdownOpen: boolean;
    scrolled: boolean;
  }
> = ({
  userInfo,
  handleLogout,
  navigate,
  mobile = false,
  toggleDropdown,
  isDropdownOpen,
  scrolled,
}) => {
  const buttonClass =
    "px-4 py-2 rounded-full text-white font-semibold bg-gray-900 hover:bg-gray-700 transition-colors border border-white";

  if (userInfo) {
    return (
      <div className={`relative ${mobile ? "mt-4" : ""}`}>
        <button
          onClick={toggleDropdown}
          className={`flex items-center ${
            scrolled ? "text-gray-900" : "text-white"
          } hover:bg-gray-800 p-2 rounded-full transition-colors focus:outline-none ${
            location.pathname === "/userProfile"
              ? "text-white font-bold border p-2 rounded-full" // Color for active link
              : "text-white font-semibold hover:text-gray-300" // Default color and hover
          }`}
        >
          <BsPerson size={24} className="mr-2" />
          <span className="mr-1">{userInfo.name}</span>
          <FiChevronDown
            className={`transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
            <button
              onClick={() => {
                navigate("/userProfile");
                toggleDropdown();
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Profile
            </button>
            <button
              onClick={() => {
                handleLogout();
                toggleDropdown();
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <button className={buttonClass} onClick={() => navigate("/login")}>
        Login
      </button>
    );
  }
};

export default Header;
