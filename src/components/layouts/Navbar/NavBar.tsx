import { NavLink } from "react-router-dom";
import { logout, selectUserProfile } from "../../../redux/reducers/authSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { FaBars, FaXmark } from "react-icons/fa6";
import logo from "../../../assets/main-logo.png";

const NavBar = () => {
  const userProfile = useAppSelector(selectUserProfile);
  const dispatch = useAppDispatch();

  const user = {
    name: userProfile?.name,
    email: userProfile?.email,
    imageUrl: userProfile?.avatar,
  };

  const navigation = [
    { name: "Home", path: "/" },
    { name: "Quotes", path: "quotes" },
  ];

  const userNavigation = [{ name: "Your Profile", path: "user-profile" }];

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }
  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
  };

  return (
    <Disclosure as="nav" className="bg-slate-300 shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex">
                <div className="-ml-2 mr-4 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center p-2 text-gray-700">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <FaXmark className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <FaBars className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  <img className="h-10 w-auto" src={logo} alt="company_logo" />
                </div>
                <ul className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      className={({ isActive }) =>
                        classNames(
                          isActive
                            ? "bg-cyan-600 text-white"
                            : "text-gray-700 hover:bg-slate-600 hover:text-white",
                          "rounded-md px-3 py-1.5 text-sm font-medium"
                        )
                      }
                      to={item.path}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="hidden sm:block">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative">
                    <Menu.Button className="mt-1.5">
                      <span className="sr-only">Open user menu</span>
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                        </div>
                        <div className="ml-3 flex flex-col items-start justify-center">
                          <div className="text-sm font-medium text-gray-700">{user.name}</div>
                          <div className="text-xs font-medium text-gray-700">{user.email}</div>
                        </div>
                      </div>
                    </Menu.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute left-0 right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <>
                          {userNavigation.map((item) => (
                            <NavLink
                              key={item.name}
                              to={item.path}
                              className={({ isActive }) =>
                                classNames(
                                  isActive ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                                )
                              }
                            >
                              {item.name}
                            </NavLink>
                          ))}
                          <Disclosure.Button
                            onClick={handleLogout}
                            className={
                              "w-full px-4 py-2 text-left text-sm font-medium text-red-700 hover:bg-red-100"
                            }
                          >
                            Logout
                          </Disclosure.Button>
                        </>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    classNames(
                      isActive
                        ? "bg-cyan-600 text-white"
                        : "text-gray-700 hover:bg-slate-600 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5 sm:px-6">
                <div className="flex-shrink-0">
                  <img className="h-12 w-12 rounded-full" src={user.imageUrl} alt="" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-700">{user.name}</div>
                  <div className="text-sm font-medium text-gray-700">{user.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2 sm:px-3">
                {userNavigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      classNames(
                        isActive
                          ? "bg-cyan-600 text-white"
                          : "text-gray-700 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavBar;
