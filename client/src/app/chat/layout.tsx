import ChatShell from "../components/UI/ChatShell";

type ChatLayoutType = {
  children: React.ReactNode;
};
export default function ChatLayout({ children }: ChatLayoutType) {
  return <ChatShell>{children}</ChatShell>;
}
