import { Avatar } from "@components/Avatar";
import { Button } from "@components/Button";
import { Menu, Transition } from "@headlessui/react";
import { useAuthenticated, useUserData } from "@nhost/nextjs";
import Link from "next/link";
import React, { Fragment } from "react";
import toast from "react-hot-toast";
import { nhost } from "@utils/nhost";
import { HiMenu } from "react-icons/hi";
import { AiFillEye, AiOutlineLogout } from "react-icons/ai";
import { useRouter } from "next/router";

const NavLink = ({ title, href }) => (
  <Link href={href}>
    <a className="px-5 py-2 hover:text-primary font-medium">{title}</a>
  </Link>
);

const MenuItem = ({ children, icon, responsive, ...other }) => (
  <Menu.Item>
    {({ active }) => (
      <button
        className={`${active ? "bg-gradient-primary text-white" : "text-slate-600"} ${
          responsive ? "flex md:hidden" : "flex"
        } group rounded-md items-center w-full px-2 py-2 font-medium`}
        {...other}
      >
        {icon}
        {children}
      </button>
    )}
  </Menu.Item>
);

function Header() {
  const router = useRouter();
  const isAuthenticated = useAuthenticated();
  const user = useUserData();

  const logout = () => {
    nhost.auth.signOut();
    if (router.asPath === "/create" || router.asPath === "/profile") router.push("/login");
    toast.success("Logged out.");
  };

  function ProfileLink(props) {
    let { href, children, ...rest } = props;
    return (
      <Link href={href}>
        <a {...rest}>{children}</a>
      </Link>
    );
  }

  const renderMenu = (
    <Menu as="div" className="relative inline-block text-left z-[2]">
      <Menu.Button as={Fragment}>
        <div className="bg-sky-200 rounded-r-full rounded-l-full flex items-center gap-2 p-2 cursor-pointer text-sky-700">
          <Avatar size="small" />
          <HiMenu className="text-2xl" />
        </div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-56 mt-3 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <h2 className="p-2 border-b mb-1">{user?.displayName}</h2>
            <MenuItem icon={<AiFillEye className="mr-2" />}>
              <ProfileLink href="/profile">View Profile</ProfileLink>
            </MenuItem>
            <MenuItem icon={<AiOutlineLogout className="mr-2" />} onClick={logout}>
              Logout
            </MenuItem>
            <div className="border-t-2 block md:hidden">
              <MenuItem responsive>Link1</MenuItem>
              <MenuItem responsive>Link2</MenuItem>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );

  return (
    <header className="text-gray-600 body-font shadow-md">
      <div className="container mx-auto flex items-center px-5 justify-between">
        <Link href="/">
          <a className="flex items-center py-4 text-3xl font-extrabold text-gradient-primary">Blog</a>
        </Link>
        {isAuthenticated ? (
          renderMenu
        ) : (
          <Link href="/login" passHref>
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
