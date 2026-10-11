import React, { useEffect, useState } from "react";

// <img> that renders `fallback` instead of a broken-image icon when the
// source is missing or fails to load.
const SafeImg = ({ src, alt = "", fallback = null, loading = "lazy", ...rest }) => {
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [src]);

  if (!src || failed) return fallback;
  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={() => setFailed(true)}
      {...rest}
    />
  );
};

export default SafeImg;
