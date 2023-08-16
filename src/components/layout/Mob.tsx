"use client";
import React from "react";
import "@/styles/mob.scss";
import Link from "next/link";
import { BiHome } from "react-icons/bi";
import { FiFilm, FiTv } from "react-icons/fi";
import { TbPremiumRights } from "react-icons/tb";
import { BsPerson } from "react-icons/bs";
import { usePathname } from "next/navigation";

const Mob = () => {
  const path = usePathname();
  return (
    <div className="mob">
      <Link href={"/premium"} className={path === "/premium" ? "bt" : ""}>
        <TbPremiumRights />
      </Link>
      <Link href={"/movies"} className={path === "/movies" ? "bt" : ""}>
        <FiFilm />
      </Link>
      <Link href={"/"} className={path === "/" ? "bt" : ""}>
        <BiHome />
      </Link>
      <Link href={"/tv"} className={path === "/tv" ? "bt" : ""}>
        <FiTv />
      </Link>
      <Link href={"/account"} className={path === "/account" ? "bt" : ""}>
        <BsPerson />
      </Link>
    </div>
  );
};

export default Mob;
