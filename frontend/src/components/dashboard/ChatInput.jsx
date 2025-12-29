import { useState } from "react";

function ChatInput({ onSend }) {
  const [text, setText] = useState("");

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask something..."
      />
      <button
        onClick={() => {
          onSend(text);
          setText("");
        }}
      >
        Send
      </button>
    </div>
  );
}

export default ChatInput;
