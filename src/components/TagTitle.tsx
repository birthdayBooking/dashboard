import { Tag } from "antd";
import React from "react";

export const TagTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <Tag
      color="#1677ff"
      style={{
        marginBottom: 10,
        fontSize: 14,
        fontWeight: "bold",
        padding: "1px 8px",
      }}
    >
      {children}
    </Tag>
  );
};
