import React from "react";

export const SpaceArea = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        background: "#ffff",
        padding: 10,
        borderRadius: 5,
        width: "100%",
      }}
    >
      {children}
    </div>
  );
};
