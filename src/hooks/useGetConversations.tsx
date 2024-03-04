import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import Conversation from "../models/conversation";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const { authUser } = useAuthContext();

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        if (authUser) {
          const res = await fetch(`/api/v1/messages/usermessage/${authUser}`);
          const data = await res.json();
          setConversations(data);
        } else {
          return;
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.error("An unexpected error occurred:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, [authUser]);

  return { loading, conversations };
};
export default useGetConversations;
