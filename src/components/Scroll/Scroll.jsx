// components/Scroll/Scroll.jsx
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Scroll() {
  const { pathname } = useRouter();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}
