import React from "react";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import "./Chat.scss";
import InputField from "../../components/InputText/InputField";

const Chat: React.FC = () => {
  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper" id="scrollbar">
            {/* {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                
              </div>
            ))} */}
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper" id="scrollbar">
            {/* {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                     
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )} */}
            <Message own={false} />
            <Message own={false} />
            <Message own={true} />
            <Message own={false} />
            <Message own={true} />
            <Message own={true} />
            <Message own={true} />
            <Message own={true} />
            <Message own={true} />
            <Message own={true} />
            <Message own={true} />
          </div>
          <InputField />
        </div>
      </div>
    </>
  );
};

export default Chat;
