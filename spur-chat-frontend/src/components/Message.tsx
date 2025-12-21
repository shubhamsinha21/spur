import React from "react";

interface MessageProps {
  sender: "user" | "ai";
  text: string;
}

function Message({ sender, text }: MessageProps) {
  return (
    <div style={{
      textAlign: sender === "user" ? "right" : "left",
      margin: "5px 0"
    }}>
      <span style={{
        display: "inline-block",
        padding: "8px 12px",
        borderRadius: "15px",
        backgroundColor: sender === "user" ? "#007bff" : "#e0e0e0",
        color: sender === "user" ? "white" : "black",
        maxWidth: "70%"
      }}>{text}</span>
    </div>
  );
};

export default Message;
