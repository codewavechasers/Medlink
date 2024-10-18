import React, { useState, useEffect } from "react";
import { CometChat } from "@cometchat-pro/chat";

const appID = "";
const region = "";
const authKey = " ";

function ChatInterface({ peerId }) {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    // Initialize CometChat
    CometChat.init(appID, new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build())
      .then(() => console.log("CometChat Initialized"))
      .catch((error) => console.error("Initialization failed", error));

    // Login User (Using peerId as UID for demonstration)
    CometChat.login(peerId, authKey)
      .then((user) => console.log("Login Successful", user))
      .catch((error) => console.error("Login failed", error));
  }, [peerId]);

  const sendMessage = () => {
    const message = new CometChat.TextMessage(
      peerId,
      messageText,
      CometChat.RECEIVER_TYPE.USER
    );
    CometChat.sendMessage(message)
      .then((msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
        setMessageText("");
      })
      .catch((error) => console.error("Message sending failed", error));
  };

  return (
    <div className="chat-popup">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="send-message">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatInterface;
