import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import { useAuthContext } from "../context/AuthContext";

const useGetMessages = () => {
  const { messages, setMessages, selectedConversation } = useConversation();
  const [loading, setLoading] = useState(false);

  const { authUser } = useAuthContext();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        if (selectedConversation) {
          const res = await fetch(
            `/api/v1/messages/${selectedConversation.otherParticipant._id}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ senderId: authUser }),
            }
          );
          const data = await res.json();
          setMessages(data);
        } else {
          return;
        }
      } catch (error) {
        console.log(error);
      } finally {
        console.log("finish");
        setLoading(false);
      }
    };

    if (selectedConversation?.otherParticipant._id) getMessages();
  }, [selectedConversation, setMessages, authUser]);

  return { messages, loading };
};
export default useGetMessages;
