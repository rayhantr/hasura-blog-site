/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import React, { forwardRef } from "react";
import { FaUserCircle } from "react-icons/fa";

function Avatar({ url, size, ...others }, ref) {
  const defaultCls = "relative rounded-full overflow-hidden flex justify-center items-center";
  const activeCls = clsx(defaultCls, size === "small" ? "w-8 h-8" : "w-9 h-9");
  return (
    <span className={activeCls} {...others} ref={ref}>
      {url ? <img src={url} alt="user avatar" /> : <FaUserCircle className="text-6xl text-sky-700" />}
    </span>
  );
}

export default forwardRef(Avatar);
