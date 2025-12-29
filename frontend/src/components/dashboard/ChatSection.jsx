import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

function ChatSection() {
  const messages = [
    { role: "assistant", content: "Hi! Ask me anything about your plan." },
    { role: "user", content: "Why is protein high?" },
    { role: "assistant", content: "Higher protein helps preserve muscle during cutting." },
  ];

  return (
    <div style={{ border: "1px solid #ddd", padding: "16px" }}>
      <ChatMessages messages={messages} />
      <ChatInput onSend={(msg) => console.log("Send:", msg)} />
    </div>
  );
}

export default ChatSection;
