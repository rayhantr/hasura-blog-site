import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { GET_CATEGORIES } from "@utils/api";
import { IoHome } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";

const Category = ({ title, href, active }) => (
  <Link href={href}>
    <a
      className={`px-3 py-1.5 ${active ? "bg-sky-700 text-white" : "bg-gray-100 hover:bg-sky-100 text-gray-700 hover:text-primary"} rounded-md capitalize transition duration-300`}
    >
      {title}
    </a>
  </Link>
);

function Categories() {
  const { loading, data } = useQuery(GET_CATEGORIES);
  const router = useRouter();
  const { categoryName } = router.query;

  return (
    <div className="flex gap-2">
      {router.asPath !== "/" && (
        <Link href="/">
          <a className="py-1.5 px-2.5 flex items-center bg-gray-100 hover:bg-sky-100 text-gray-700 hover:text-primary rounded-md capitalize transition duration-300">
            <IoHome />
          </a>
        </Link>
      )}

      {loading ? (
        <Skeleton className="h-full w-20" containerClassName="leading-none w-60 h-9 flex gap-2" count={3} inline />
      ) : (
        data?.categories.map((item) => <Category key={item.name} title={item.name} href={`/${item.name}`} active={categoryName === item.name} />)
      )}
    </div>
  );
}

export default Categories;
