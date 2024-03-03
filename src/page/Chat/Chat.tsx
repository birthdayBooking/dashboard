import React from "react";
import MessageContainer from "../../components/message/MessageCotainer";
import Conversations from "../../components/conversations/Conversations";
import "./Chat.scss";

const Chat: React.FC = () => {
  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper" id="scrollbar">
            <Conversations />
          </div>
        </div>
        <div className="chatBox">
          <MessageContainer />
        </div>
      </div>
    </>
  );
};

export default Chat;
