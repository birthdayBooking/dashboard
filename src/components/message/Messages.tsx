import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";
import "./message.scss";
import React, { useEffect, useRef } from "react";

const Messages: React.FC = () => {
  const { messages, loading } = useGetMessages();

  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <>
      <div className="">
        {!loading &&
          messages.length > 0 &&
          messages.map((message) => (
            <div key={message._id} ref={lastMessageRef}>
              <Message message={message} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Messages;
