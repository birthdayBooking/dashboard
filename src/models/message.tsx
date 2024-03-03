export interface message {
  createdAt: Date;
  _id: string;
  message: string;
  receiverId: string;
  senderId: string;
  updatedAt: Date;
}

export interface lastestMessage {
  message: string;
}

export interface lastMessage {
  message: message;
}
