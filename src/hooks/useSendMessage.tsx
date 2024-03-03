import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import { useAuthContext } from "../context/AuthContext";
import { useSocketContext } from "../context/SocketContext";

const useSendMessage = () => {
  const { messages, setMessages, selectedConversation } = useConversation();
  const { authUser } = useAuthContext();
  const { socket } = useSocketContext();
  const [newMessage, setNewMessage] = useState(null);

  const sendMessage = async (message: string) => {
    try {
      if (selectedConversation) {
        const res = await fetch(
          `/api/v1/messages/send/${selectedConversation.otherParticipant._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ senderId: authUser, message: message }),
          }
        );
        const data = await res.json();
        setNewMessage(data);
        setMessages([...messages, data]);
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log("finish");
    }
  };

  useEffect(() => {
    if (!socket || !selectedConversation) return;
    const receiverId = selectedConversation.otherParticipant._id;
    const conversationId = selectedConversation.conversationId;
    if (newMessage) {
      socket.emit("sendMessage", { newMessage, receiverId, conversationId });
    }
    setNewMessage(null);
  }, [newMessage, socket, selectedConversation]);

  return { sendMessage, newMessage };
};
export default useSendMessage;
