import "./message.scss";
import React from "react";

interface MessageProps {
  own: boolean;
}

const Message: React.FC<MessageProps> = ({ own }) => {
  return (
    <div className={own ? "message own" : "message "}>
      <div className={own ? "messageTop right" : "messageTop"}>
        <img
          className="messageImg"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <p className="messageText">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap
        </p>
      </div>
      <div className="messageBottom">{new Date().getTime().toString()}</div>
    </div>
  );
};

export default Message;
