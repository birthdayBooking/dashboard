import { Space, Tooltip } from "antd";
import React, { useState } from "react";
import { DatePicker } from "antd";
import { useDashBoard } from "../../context/dashboardContext";
import { SwapOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

const DateSelection: React.FC = () => {
  const { getDate, getDateRange } = useDashBoard();
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
        <Tooltip
          placement="top"
          title={`${
            !isRange ? "switch to select range" : "switch to select single date"
          }`}
        >
          <SwapOutlined
            onClick={changeSelectDateType}
            style={{
              cursor: "pointer",
              fontSize: 17,
              color: isRange ? "#0284c7" : "",
            }}
          />
        </Tooltip>
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
