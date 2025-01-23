import create from 'zustand';

interface User {
  id: string;
  username: string;
  avatar: string;
}

interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

interface Chat {
  id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
}

interface FriendRequest {
  id: string;
  senderId: string;
  receiverId: string;
  status: 'pending' | 'accepted' | 'rejected';
  timestamp: Date;
}

interface SocialState {
  users: User[];
  chats: Chat[];
  messages: Message[];
  friendRequests: FriendRequest[];
  
  // Chat actions
  sendMessage: (chatId: string, content: string) => void;
  markAsRead: (chatId: string) => void;
  
  // Friend actions
  sendFriendRequest: (userId: string) => void;
  respondToRequest: (requestId: string, accept: boolean) => void;
  
  // User actions
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
  blockUser: (userId: string) => void;
}

export const useSocialStore = create<SocialState>((set, get) => ({
  users: [],
  chats: [],
  messages: [],
  friendRequests: [],

  sendMessage: (chatId, content) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      chatId,
      senderId: 'currentUser', // Replace with actual user ID
      content,
      timestamp: new Date(),
      isRead: false
    };

    set((state) => ({
      messages: [...state.messages, newMessage],
      chats: state.chats.map(chat => 
        chat.id === chatId 
          ? { ...chat, lastMessage: newMessage }
          : chat
      )
    }));
  },

  markAsRead: (chatId) => {
    set((state) => ({
      messages: state.messages.map(msg =>
        msg.chatId === chatId ? { ...msg, isRead: true } : msg
      ),
      chats: state.chats.map(chat =>
        chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
      )
    }));
  },

  sendFriendRequest: (userId) => {
    const newRequest: FriendRequest = {
      id: Date.now().toString(),
      senderId: 'currentUser', // Replace with actual user ID
      receiverId: userId,
      status: 'pending',
      timestamp: new Date()
    };

    set((state) => ({
      friendRequests: [...state.friendRequests, newRequest]
    }));
  },

  respondToRequest: (requestId, accept) => {
    set((state) => ({
      friendRequests: state.friendRequests.map(request =>
        request.id === requestId
          ? { ...request, status: accept ? 'accepted' : 'rejected' }
          : request
      )
    }));
  },

  followUser: (userId) => {
    // Implement follow logic
  },

  unfollowUser: (userId) => {
    // Implement unfollow logic
  },

  blockUser: (userId) => {
    // Implement block logic
  }
})); 