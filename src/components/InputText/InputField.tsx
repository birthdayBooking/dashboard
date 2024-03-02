import { Button, Input, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React from "react";

const InputField: React.FC<unknown> = () => {
  return (
    <div className="chatBoxBottom">
      <TextField
        multiline
        fullWidth
        size="small"
        sx={{ fontSize: 50 }}
        style={{ marginRight: "5px" }}
      />
      <SendIcon style={{ width: "25px", height: "25px" }} color="primary" />
    </div>
  );
};

export default InputField;
