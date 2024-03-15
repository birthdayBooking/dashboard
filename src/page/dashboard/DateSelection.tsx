import { Space } from "antd";
import React, { useState } from "react";
import { DatePicker } from "antd";
import { useDashBoard } from "../../context/dashboardContext";
import { SwapOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

const DateSelection: React.FC = () => {
  const { getDate, getDateRange, setDate, setDateRange } = useDashBoard();
  const [isRange, setIsRange] = useState(false);

  function changeSelectDateType() {
    setIsRange(!isRange);
  }

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
        <SwapOutlined
          onClick={changeSelectDateType}
          style={{
            cursor: "pointer",
            fontSize: 17,
            color: isRange ? "#0284c7" : "",
          }}
        />
        {isRange ? (
          <RangePicker
            placeholder={["Start date", "End date"]}
            onChange={getDateRange}
          />
        ) : (
          <DatePicker onChange={getDate} />
        )}
      </Space>
    </div>
  );
};

export default DateSelection;
