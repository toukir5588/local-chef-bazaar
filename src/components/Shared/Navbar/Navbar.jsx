import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logo from "../../../assets/images/logo.png";
// import navImg from "../../../assets/images/navImg2.jpg";
const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenList, setIsOpenList] = useState(false);

  const list = (
    <>
      <div className="flex flex-col lg:flex-row  gap-3">
        <NavLink to="/" className="hover:bg-neutral-100 rounded-sm transition font-semibold px-2 py-2">Home</NavLink>
        <NavLink to="/all-meal" className="hover:bg-neutral-100 rounded-sm transition font-semibold px-2 py-2">All Meal</NavLink>
        <NavLink to="/about-us" className="hover:bg-neutral-100 rounded-sm transition font-semibold px-2 py-2">About Us</NavLink>
      </div>
    </>
  );

  return (
    <div
      className={`fixed w-full text-yellow-600 bg-[url("https://i.ibb.co.com/3YddVM9x/nav-Img2.jpg")] bg-cover  bg-center bg-no-repeat  z-10 shadow-sm`}
    >
      <div className="py-4 ">
        <Container>
          <div className="flex flex-row  items-center justify-between gap-3 md:gap-0">
            {/* small devise menu */}
            <div className="lg:hidden">
              {/* Dropdown Menu */}
              <div className="relative">
                <div className="flex flex-row items-center gap-3">
                  {/* Dropdown btn */}
                  <div
                    onClick={() => setIsOpenList(!isOpenList)}
                    className="p-4 md:py-1 md:px-2 border flex  flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                  >
                    <AiOutlineMenu />
                  </div>
                </div>
                {isOpenList && (
                  <div className="absolute left-0 rounded-xl w-[120px] bg-black  shadow-md    top-12 text-sm">
                    <div className="flex  w-full overflow-hidden  flex-col cursor-pointer">
                      {list}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Logo */}
            <Link to="/">
              <img className="w-16" src={logo} alt="logo" />
            </Link>

            {/* large devise menu list */}
            <div className="hidden lg:flex">{list}</div>

            {/* Dropdown Menu */}
            <div className="relative">
              <div className="flex flex-row items-center gap-3">
                {/* Dropdown btn */}
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-4 md:py-1 md:px-2 border  flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                  <AiOutlineMenu />
                  <div className="hidden md:block">
                    {/* Avatar */}
                    <img
                      className="rounded-full"
                      referrerPolicy="no-referrer"
                      src={user && user.photoURL ? user.photoURL : avatarImg}
                      alt="profile"
                      height="30"
                      width="30"
                    />
                  </div>
                </div>
              </div>

              <div></div>

              {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
                  <div className="flex bg-black flex-col cursor-pointer">
                    <Link
                      to="/"
                      className="block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                    >
                      Home
                    </Link>

                    {user ? (
                      <>
                        <Link
                          to="/dashboard"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Dashboard
                        </Link>
                        <div
                          onClick={logOut}
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
