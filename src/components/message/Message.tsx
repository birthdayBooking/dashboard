import "./message.scss";
import React from "react";
import { message } from "../../models/message";
import { useAuthContext } from "../../context/AuthContext";

interface MessageProps {
  message: message;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const { authUser } = useAuthContext();
  const own = authUser === message.senderId;

  return (
    <div className={own ? "message own" : "message "}>
      <div className={own ? "messageTop right" : "messageTop"}>
        <img
          className="messageImg"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <p className="messageText">{message.message}</p>
      </div>
      {/* <div className="messageBottom">{new Date().getTime().toString()}</div> */}
    </div>
  );
};

export default Message;
