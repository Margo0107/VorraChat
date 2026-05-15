const API_URL = "http://localhost:5000";

const useAuthApi = () => {
  const login = async (data) => {
    try {
      const res = await fetch(`${API_URL}/api/author/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.message);
      }
      return resData;
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  const register = async (data) => {
    try {
      const res = await fetch(`${API_URL}/api/author/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const resData = await res.json();
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
