import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import "./message.scss";
import React, { useEffect } from "react";

const MessageContainer: React.FC = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    // cleanup function (unmounts)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="chatBoxWrapper" id="scrollbar">
            <Messages />
          </div>
          <MessageInput />
        </>
      )}
    </>
  );
};

const NoChatSelected = () => {
  return (
    <div className="MessageContainer">
      <div className="">
        <p>Welcome To Start Chatting</p>
        <p>Select a chat to start messaging</p>
      </div>
    </div>
  );
};

export default MessageContainer;
