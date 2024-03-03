import { TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useState } from "react";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput: React.FC<unknown> = () => {
  const [message, setMessage] = useState<string>("");
  const { sendMessage } = useSendMessage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };
  return (
    <form className="chatBoxBottom" onSubmit={handleSubmit}>
      <TextField
        multiline
        fullWidth
        size="small"
        sx={{ fontSize: 50 }}
        style={{ marginRight: "5px" }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button type="submit" style={{ background: "white", border: "none" }}>
        <SendIcon style={{ width: "25px", height: "25px" }} color="primary" />
      </button>
    </form>
  );
};

export default MessageInput;
