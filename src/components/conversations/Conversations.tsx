import React from "react";
import "./conversation.scss";
import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";

const Conversations: React.FC = () => {
  const { conversations } = useGetConversations();

  return (
    <>
      {conversations.map((conversation) => (
        <Conversation
          key={conversation.conversationId}
          conversation={conversation}
        />
      ))}
    </>
  );
};

export default Conversations;
