import { Avatar } from "@components/Avatar";
import Link from "next/link";
import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import Moment from "react-moment";

function Blog({ articleId, title, user, time, category, subCategory }) {
  return (
    <div className="bg-neutral-50 p-3 rounded-lg flex flex-col">
      <div className="mb-2 text-sm capitalize font-medium text-slate-400 flex gap-2">
        <Link
          href={`/${category}`}
          className="text-primary bg-sky-100 px-2 py-1 rounded-md"
        >
          {category}
        </Link>
        <Link
          href={`/${category}/${subCategory}`}
          className="text-violet-500 bg-violet-100 px-2 py-1 rounded-md"
        >
          {subCategory}
        </Link>
      </div>
      <div className="flex-auto">
        <h2 className="text-2xl font-semibold break-all">{title}</h2>
        <div className="flex items-center mt-3 mb-4 text-sm">
          <div className="mr-2">
            <Avatar size="small" />
          </div>
          <div>
            <div>{user}</div>
            <Moment fromNow className="text-slate-400">
              {time}
            </Moment>
          </div>
        </div>
      </div>
      <div className="text-right">
        <Link
          href={`/article/${articleId}`}
          className="text-primary p-2 inline-flex items-center font-medium"
        >
          Read
          <HiArrowNarrowRight className="ml-3" />
        </Link>
      </div>
    </div>
  );
}

export default Blog;
