"use client";

import { useEffect, useState } from "react";

export function ScrollAtmosphere() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {/* Labs teal blob */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, #0FA3B1, transparent 70%)",
          right: "-200px",
          top: `${-100 + scrollY * -0.05}px`,
        }}
      />
      {/* Circle red blob */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.03]"
        style={{
          background: "radial-gradient(circle, #D7263D, transparent 70%)",
          left: "-150px",
          top: `${400 + scrollY * -0.08}px`,
        }}
      />
      {/* Studio purple blob */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full opacity-[0.03]"
        style={{
          background: "radial-gradient(circle, #A855F7, transparent 70%)",
          right: "-100px",
          top: `${1200 + scrollY * -0.06}px`,
        }}
      />
      {/* Academy gold blob */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, #E8A317, transparent 70%)",
          left: "-100px",
          top: `${2000 + scrollY * -0.04}px`,
        }}
      />
    </div>
  );
}
