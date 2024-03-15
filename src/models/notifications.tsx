interface Notification {
  receiverId: string;
  senderId: string;
  isRead: boolean;
  date: Date;
  message: string;
}

export default Notification;
