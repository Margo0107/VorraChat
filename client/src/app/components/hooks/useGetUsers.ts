type UserType = {
  _id: string;
  userName: string;
  userEmail?: string;
};
type ErrorResponse = {
  message: string;
};

const API_URL = "http://localhost:5000";

export const useGetUsers = () => {
  const getUsers = async (): Promise<UserType[] | undefined> => {
    try {
      const res = await fetch(`${API_URL}/api/users`);

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }
      return result;
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
      }
    }
  };
  const getUser = async (): Promise<UserType | undefined> => {
    try {
      const res = await fetch(`${API_URL}/api/author/me`, {
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }
      return result;
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
      }
    }
  };
  const getSearchUser = async (
    text: string,
  ): Promise<UserType[] | undefined> => {
    try {
      const res = await fetch(
        `${API_URL}/api/users/search?q=${encodeURIComponent(text)}`,
        {
          credentials: "include",
        },
      );
      const result: UserType[] | ErrorResponse = await res.json();
      if (!res.ok) {
        throw new Error((result as ErrorResponse).message);
      }
      return result as UserType[];
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
      }
    }
  };
  return { getUsers, getUser, getSearchUser };
};
