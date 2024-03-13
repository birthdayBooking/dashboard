import { Space } from "antd";
import React, { useState } from "react";
import { DatePicker } from "antd";
import { useDashBoard } from "../../context/dashboardContext";

const { RangePicker } = DatePicker;

const DateSelection: React.FC = () => {
  const { getDate, getDateRange } = useDashBoard();

  return (
    <div style={{ height: "10px", textAlign: "center" }}>
      <Space
        style={{
          background: "#ffff",
          padding: 10,
          borderRadius: 5,
          width: "80%",
        }}
      >
        <DatePicker onChange={getDate} />
        <RangePicker
          placeholder={["Start date", "End date"]}
          onChange={getDateRange}
        />
      </Space>
      <div style={{ marginTop: 10 }}>{/* <PartyUI /> */}</div>
      {/* <ModalAdd open={open} setOpen={setOpen} /> */}
    </div>
  );
};

export default DateSelection;
