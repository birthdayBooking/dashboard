import React from "react";
import "./conversation.scss";
import ConversationModel from "../../models/conversation";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";
// import { useSocketContext } from "../../context/SocketContext";
import { lastestMessage } from "../../models/message";
import useFetchLatestMessage from "../../hooks/useFetchLatestMessage";

interface ConversationInterFace {
  conversation: ConversationModel;
}

const ConversationComponent: React.FC<ConversationInterFace> = ({
  conversation,
}) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { authUser } = useAuthContext();

  // const { onlineUsers } = useSocketContext();

  // const isOnline = onlineUsers.includes(conversation.conversationId);

  const isSelected =
    selectedConversation?.conversationId === conversation.conversationId;

  // const auth = authUser === conversation.newMessage.senderId;
  const { lastestMessage } = useFetchLatestMessage(conversation);

  const auth = authUser === lastestMessage?.senderId;

  console.log(auth);

  const truncateText = (text: string | lastestMessage) => {
    if (typeof text === "string") {
      let shortText = text.substring(0, 20);
      if (text.length > 20) {
        shortText = shortText + "...";
      }
      return shortText;
    }
    return text.toString();
  };

  return (
    <div
      className={`conversation ${isSelected ? "selected" : ""}`}
      onClick={() => setSelectedConversation(conversation)}
    >
      <img
        className="conversationImg"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0V6SEIWK4TYkSdm54EdDAncR_UT9M9IyqAA&usqp=CAU"
        alt=""
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span className="conversationName">
          {conversation.otherParticipant.lastName}
        </span>
        <span className="conversationName" style={{ color: "gray" }}>
          {auth ? "Bạn:  " : <>{conversation.otherParticipant.lastName}: </>}
          {lastestMessage
            ? truncateText(lastestMessage.message)
            : truncateText(conversation.newMessage.message)}
        </span>
      </div>
    </div>
  );
};

export default ConversationComponent;
