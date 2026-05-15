const API_URL = "http://localhost:5000";

export const useGetUsers = () => {
  const getUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/api/users`);

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }
      return result;
    } catch (err) {
      console.error(err);
    }
  };
  const getUser = async () => {
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
      console.error(err);
    }
  };
  const getSearchUser = async (text) => {
    try {
      const res = await fetch(`${API_URL}/api/users/search?q=${text}`, {
        credentials: "include",
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }
      return result;
    } catch (err) {
      console.error(err);
    }
  };
  return { getUsers, getUser, getSearchUser };
};
