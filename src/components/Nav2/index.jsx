import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../UI/Button";
import React from "react";
import BarIcon from "../../Icons/BarIcon";
import XIcon from "../../Icons/XIcon";

const menuList = [
  {
    href: "/",
    title: "Home",
  },
];

const authMenuList = [
  {
    href: "/signup",
    title: "Signup",
  },
  {
    href: "/signin",
    title: "Sign in",
  },
];

const Nav2 = () => {
  const [show, setShow] = React.useState(false);
  const { user, logout } = useAuth();
  return (
    <header className="bg-white lg:py-8">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* lg+ */}
        <nav className="relative flex items-center justify-between h-16 bg-white lg:rounded-md lg:shadow-lg lg:h-24 lg:px-8 lg:py-6">
          <div className="flex-shrink-0">
            <Link to="#" title="" className="flex">
              <img
                className="w-auto h-8 lg:h-10"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/logo.svg"
                alt=""
              />
            </Link>
          </div>
          <Button
            onClick={() => setShow((s) => !s)}
            className="inline-flex p-2 ml-5 text-black transition-all duration-200 rounded-md lg:hidden bg-transparent focus:bg-gray-100 hover:bg-gray-100"
          >
            {show ? <XIcon /> : <BarIcon />}
          </Button>
          <div className="hidden ml-10 lg:flex lg:items-center lg:mr-auto lg:space-x-10">
            {menuList.map((menu) => (
              <Link
                key={menu.href}
                to={menu.href}
                className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
              >
                {menu.title}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:items-center lg:space-x-10">
            {user ? (
              <div className=" flex justify-between items-center gap-2">
                <Button onClick={logout}>Logout</Button>
                <p>{user.name}</p>
                <img
                  className="w-10 h-10 rounded-full"
                  src={user.profilePic}
                  alt={user.name}
                />
              </div>
            ) : (
              <>
                {authMenuList.map((menu) => (
                  <Link
                    key={menu.href}
                    to={menu.href}
                    className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    {menu.title}
                  </Link>
                ))}
              </>
            )}
          </div>
        </nav>
        {/* xs to lg */}
        <nav
          className={`${
            show ? "flex" : "hidden"
          } transition duration-300 flex-col py-4 space-y-2 lg:hidden`}
        >
          {menuList.map((menu) => (
            <Link
              key={menu.href}
              to={menu.href}
              className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
            >
              {menu.title}
            </Link>
          ))}
          {user ? (
            <div>
              <Button className="inline max-w-xs" onClick={logout}>
                Logout
              </Button>
              <div className="flex items-center gap-2 mt-2">
                <p>{user.name}</p>
                <img
                  className="w-10 h-10 rounded-full"
                  src={user.profilePic}
                  alt={user.name}
                />
              </div>
            </div>
          ) : (
            <>
              {authMenuList.map((menu) => (
                <Link
                  key={menu.href}
                  to={menu.href}
                  className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
                >
                  {menu.title}
                </Link>
              ))}
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Nav2;
