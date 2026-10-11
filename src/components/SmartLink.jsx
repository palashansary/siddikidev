import React from "react";
import { Link } from "react-router-dom";
import { isExternalUrl } from "../lib/content";

// Router <Link> for internal paths, a new-tab <a> for everything else.
const SmartLink = ({ to, children, ...rest }) => {
  if (!to) return <span {...rest}>{children}</span>;
  if (isExternalUrl(to)) {
    const isWeb = /^https?:/i.test(to);
    return (
      <a
        href={to}
        {...(isWeb && { target: "_blank", rel: "noopener noreferrer" })}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link to={to} {...rest}>
      {children}
    </Link>
  );
};

export default SmartLink;
