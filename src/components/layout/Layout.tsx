import React from "react";
import Header from "./Header";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default LayoutProvider;
