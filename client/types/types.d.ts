export interface User {
  _id: string;
  avatar: string;
  createdAt: Date;
  email: string;
  fullName: string;
  hasNotifications: boolean;
  username: string;
}

interface ChatUser {
  _id: string;
  username: string;
  avatar: string;
}
export interface Chat {
  _id: string;
  message: string;
  reciever: ChatUser;
  sender: ChatUser;
  createdAt: Date;
}
