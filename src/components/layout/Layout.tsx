import React from "react";
import Header from "./Header";
import Mob from "./Mob";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Mob />
    </>
  );
};

export default LayoutProvider;
