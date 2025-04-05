import Link from "next/link";
import React from "react";

function Button({
  link,
  icon,
  text,
  position = "left",
}: {
  link: string;
  icon: React.ReactElement;
  text: string;
  position?: "left" | "right";
}) {
  return (
    <Link href={link}>
      <button type="button" className="flex gap-2 bg-white py-4 w-[215px] text-black items-center justify-center text-2xl rounded-4xl">
        {position === "left" && icon}
        <span>{text}</span>
        {position === "right" && icon}
      </button>
    </Link>
  );
}

export default Button;
