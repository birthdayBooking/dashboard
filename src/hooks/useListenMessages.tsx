import { useCallback, useEffect, useState } from "react";
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

  const markAsRead = useCallback(
    (thisUserNotifications: Notification[], notifications: Notification[]) => {
      const mNotification: Notification[] = notifications.map((el) => {
        let notification: Notification = el;
        thisUserNotifications.forEach((n) => {
          if (n.senderId === el.senderId) {
            notification = {
              ...n,
              isRead: true,
            };
          } else {
            notification = el;
          }
        });
        return notification;
      });
      setNotificattions(mNotification);
    },
    []
  );

  return { getLatestNotifications, notifications, markAsRead };
};
export default useListenMessages;
