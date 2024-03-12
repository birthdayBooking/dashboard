interface Conversation {
  conversationId: string;
  otherParticipant: otherParticipant;
  newMessage: newMessage;
  participants: string[];
}

export interface otherParticipant {
  role: string;
  _id: string;
  firstName: string;
  lastName?: string;
  name?: string;
  email: string;
  username: string;
  id: string;
}

interface newMessage {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export default Conversation;
