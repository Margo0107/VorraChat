const API_URL = "http://localhost:5000";

type AuthorPayload = {
  userName: string;
  userEmail: string;
  userPassword: string;
};

type AuthResponse = {
  message: string;
  user: {
    _id?: string;
    id?: string;
    userName: string;
  };
};

const useAuthApi = () => {
  const login = async (data: AuthorPayload): Promise<AuthResponse> => {
    try {
      const res = await fetch(`${API_URL}/api/author/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const resData: AuthResponse = await res.json();
      if (!res.ok) {
        throw new Error(resData.message);
      }
      return resData;
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  const register = async (data: AuthorPayload): Promise<AuthResponse> => {
    try {
      const res = await fetch(`${API_URL}/api/author/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const resData: AuthResponse = await res.json();
      if (!res.ok) {
        throw new Error(resData.message);
      }
      return resData;
    } catch (err) {
      console.error("Registration error:", err);
    }
  };
  return { login, register };
};
export default useAuthApi;
