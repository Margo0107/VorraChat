type UserType = {
  _id: string;
  userName: string;
  userEmail?: string;
};

type ChatType = {
  _id: string;
  members: UserType[];
  createdAt: string;
  updatedAt: string;
};

type ErrorResponse = {
  message: string;
};

const API_URL = "http://localhost:5000";

const useChatsApi = () => {
  const createChat = async (user: UserType): Promise<ChatType | undefined> => {
    try {
      const res = await fetch(`${API_URL}/api/chats`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ partnerId: user._id }),
      });

      const resData: ChatType | ErrorResponse = await res.json();

      if (!res.ok) {
        throw new Error((resData as ErrorResponse).message);
      }

      return resData as ChatType;
    } catch (error) {
      console.error(error);
    }
  };

  const getChats = async (): Promise<ChatType[] | undefined> => {
    try {
      const res = await fetch(`${API_URL}/api/chats`, {
        credentials: "include",
      });

      const result: ChatType[] | ErrorResponse = await res.json();

      if (!res.ok) {
        throw new Error((result as ErrorResponse).message);
      }

      return result as ChatType[];
    } catch (error) {
      console.error(error);
    }
  };

  return { createChat, getChats };
};

export default useChatsApi;
