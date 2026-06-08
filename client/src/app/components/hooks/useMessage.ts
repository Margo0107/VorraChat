export const useMessage = () => {
  const getMessages = async (roomId: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/messages/${roomId}`, {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch messages");
      }
      return res.json();
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };
  return { getMessages };
};
