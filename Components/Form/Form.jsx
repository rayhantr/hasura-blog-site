import clsx from "clsx";
import React from "react";

function FormInput(props) {
  const defaultCls = "bg-white py-2 rounded-md shadow-md placeholder-slate-400";
  const activeCls = clsx(defaultCls, props.icon ? "pl-10 pr-3" : "px-3");
  return (
    <div className="relative">
      <input className={activeCls} {...props} />
      {props.icon && <span className="absolute inset-y-0 left-0 flex items-center justify-center w-10 text-slate-400">{props.icon}</span>}
    </div>
  );
}

export { FormInput };
