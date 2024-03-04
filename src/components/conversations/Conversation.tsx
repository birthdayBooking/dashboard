import React from "react";
import "./conversation.scss";
import ConversationModel from "../../models/conversation";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import { lastestMessage } from "../../models/message";
import useFetchLatestMessage from "../../hooks/useFetchLatestMessage";
import { unreadNotification } from "../../utils/unreadNotificaiton";
import useListenMessages from "../../hooks/useListenMessages";

interface ConversationInterFace {
  conversation: ConversationModel;
}

const ConversationComponent: React.FC<ConversationInterFace> = ({
  conversation,
}) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { authUser } = useAuthContext();
  const { getLatestNotifications, markAsRead } = useListenMessages();
  const { onlineUsers } = useSocketContext();

  const participants = conversation.participants.filter(
    (participant) => participant !== authUser
  );

  const isOnline = onlineUsers.includes(participants.toString());

  const isSelected =
    selectedConversation?.conversationId === conversation.conversationId;

  // const auth = authUser === conversation.newMessage.senderId;
  const { lastestMessage } = useFetchLatestMessage(conversation);

  const auth = authUser === lastestMessage?.senderId;

  const unreadNotifications = unreadNotification(getLatestNotifications());

  const thisUserNotifications = unreadNotifications?.filter((n) => {
    return n.senderId === conversation?.otherParticipant._id;
  });

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
      className={`conversation ${isSelected ? "selected" : ""} `}
      onClick={() => {
        setSelectedConversation(conversation);
        if (thisUserNotifications.length > 0) {
          markAsRead(thisUserNotifications, getLatestNotifications());
        }
      }}
    >
      <div className="avatar">
        <img
          className="conversationImg"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0V6SEIWK4TYkSdm54EdDAncR_UT9M9IyqAA&usqp=CAU"
          alt=""
        />
        {isOnline && <div className="online-dot"></div>}
      </div>

      <div
        className="info"
        style={{ display: "flex", flexDirection: "column" }}
      >
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
      {thisUserNotifications.length > 0 && (
        <div className="notifications" style={{ color: "white" }}>
          <span className="notification">
            {thisUserNotifications.length > 0
              ? thisUserNotifications.length
              : ""}
          </span>
        </div>
      )}
    </div>
  );
};

export default ConversationComponent;
