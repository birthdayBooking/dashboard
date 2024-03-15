import React from "react";
import MessageContainer from "../../components/message/MessageCotainer";
import Conversations from "../../components/conversations/Conversations";
import "./Chat.scss";
import { Divider } from "@mui/material";

const Chat: React.FC = () => {
  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper" id="scrollbar">
            <Conversations />
          </div>
        </div>
        <Divider orientation="vertical" variant="middle" flexItem />
        <div className="chatBox">
          <MessageContainer />
        </div>
      </div>
    </>
  );
};

export default Chat;
