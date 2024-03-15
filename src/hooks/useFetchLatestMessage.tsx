import { useEffect, useState } from "react";
import { message } from "../models/message";
import ConversationModel from "../models/conversation";
import useListenMessages from "./useListenMessages";

const useFetchLatestMessage = (conversation: ConversationModel) => {
  const { notifications } = useListenMessages();
  const [lastestMessage, setLastestMessage] = useState<message | undefined>();
  useEffect(() => {
    const getLatestMessage = async () => {
      try {
        if (conversation) {
          const res = await fetch(
            `/api/v1/messages/last/${conversation.conversationId}`
          );
          const data = await res.json();

          const lastestMessage = data.messages[data.messages.length - 1];

          setLastestMessage(lastestMessage);
        } else {
          return;
        }
      } catch (error) {
        console.log(error);
      } finally {
        console.log("finish");
      }
    };

    if (conversation) getLatestMessage();
  }, [conversation, setLastestMessage, notifications]);

  return { lastestMessage };
};
export default useFetchLatestMessage;
