"use client";

import React, { useEffect, useState, HTMLAttributes, memo } from "react";

const InlineSvg = memo(
  ({
    src,
    style,
    ...divProps
  }: { src: string } & HTMLAttributes<HTMLDivElement>) => {
    const [svg, setSvg] = useState("");
    useEffect(() => {
      fetch(src)
        .then((res) => res.text())
        .then((svgString) => {
          setSvg(svgString);
        });
    }, [src]);

    return (
      // 效能比這行差，等有比較好的解決調整 svg 顏色作法需改掉
      // <img src={src} alt="" width="24" height="24"Ｆ />
      <div
        {...divProps}
        style={{
          color: "currentColor",
          display: "inline-flex",
          alignItems: "center",
          justifyItems: "center",
          ...style,
        }}
        dangerouslySetInnerHTML={{ __html: svg }}
      ></div>
    );
  }
);

export default InlineSvg;
