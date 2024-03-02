export interface message {
  createdAt: Date;
  message: string;
  receiverId: string;
  senderId: string;
  updatedAt: Date;
}

export interface lastestMessage {
  senderId: string;
  isRead: boolean;
  date: Date;
  message: string;
}
