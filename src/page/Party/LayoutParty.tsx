import { Button, Popconfirm, Space } from "antd";
import PartyUI from "./Party";
import ModalAdd from "./Modal";
import { useState } from "react";

export const LayoutParty = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div style={{ height: "10px" }}>
      <Space
        style={{
          background: "#ffff",
          padding: 10,
          borderRadius: 5,
          width: "100%",
        }}
      >
        <Button type="primary" onClick={() => setOpen(!open)}>
          Add New Party
        </Button>
      </Space>
      <div style={{ marginTop: 10 }}>
        <PartyUI />
      </div>
      <ModalAdd open={open} setOpen={setOpen} />
    </div>
  );
};
