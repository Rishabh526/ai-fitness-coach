function ChatMessages({ messages }) {
  return (
    <div style={{ minHeight: "150px", marginBottom: "8px" }}>
      {messages.map((m, idx) => (
        <p key={idx}>
          <strong>{m.role === "assistant" ? "AI" : "You"}:</strong> {m.content}
        </p>
      ))}
    </div>
  );
}

export default ChatMessages;
