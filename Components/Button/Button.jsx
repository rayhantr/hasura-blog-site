import clsx from "clsx";
import React, { forwardRef } from "react";

function Button({ children, variant, fullWidth, ...other }, ref) {
  const defaultCls =
    "inline-flex items-center justify-center text-primary hover:text-white border-2 border-sky-700 py-1.5 px-5 focus:outline-none hover:bg-sky-700 disabled:bg-slate-200 disabled:border-slate-200 disabled:text-slate-500 rounded-md transition";

  const activeCls = clsx(defaultCls, fullWidth && "w-full");

  return (
    <button ref={ref} className={activeCls} {...other}>
      {children}
    </button>
  );
}

export default forwardRef(Button);
