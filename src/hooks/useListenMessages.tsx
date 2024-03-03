import { useEffect, useState } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import Notification from "../models/notifications";

const useListenMessages = () => {
  const { socket, onlineUsers } = useSocketContext();
  const { messages, setMessages } = useConversation();
  const [notifications, setNotificattions] = useState<Notification[]>([]);

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    socket?.on("getNotification", (res) => {
      const isChatOpen = onlineUsers?.some((id) => id === res.senderId);
      console.log("iss chat ", isChatOpen);
      if (!isChatOpen) {
        setNotificattions((prev) => [{ ...res, isRead: true }, ...prev]);
      } else {
        setNotificattions((prev) => [res, ...prev]);
      }
    });

    return () => {
      socket?.off("newMessage");
      socket?.off("getNotification");
    };
  }, [socket, setMessages, messages, notifications, onlineUsers]);

  const getLatestNotifications = () => {
    return notifications;
  };

  return { getLatestNotifications, notifications };
};
export default useListenMessages;
