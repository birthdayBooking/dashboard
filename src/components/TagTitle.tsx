import { Tag } from "antd";
import React from "react";

export const TagTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <Tag
      color="#87d068"
      style={{
        marginBottom: 10,
        fontSize: 16,
        fontWeight: "bold",
        padding: "4px 8px",
      }}
    >
      {children}
    </Tag>
  );
};
