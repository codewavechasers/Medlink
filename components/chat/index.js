import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Button, Heading, Tag, TextInput } from "@carbon/react";
import { Add, Apple, Microphone, SendAltFilled } from "@carbon/icons-react";
import App from "@/app/api/api";
function Chats() {
  const [chatId, setChatId] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const startNewChat = async () => {
    const response = await App.post(
      "/messages/start_new_chat/",
      { user: 1 } // Assuming user ID is 1
    );
    setChatId(response.data.chat_id);
  };

  const sendMessage = async () => {
    if (chatId && message) {
      const response = await App.post("/messages/send_message/", {
        chat_id: chatId,
        message: message,
      });
      setMessages([...messages, { content: message, sender: "me" }]);
      setMessage("");
    }
  };

  // This is just for testing incoming messages, you can remove it later
  useEffect(() => {
    if (chatId) {
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { content: "Incoming message", sender: "them" },
        ]);
      }, 3000);
    }
  }, [chatId]);

  return (
    <div className="my-chat">
      <section className="chat-nav">
        <Button
          className="chat-btns"
          kind="primary"
          size="sm"
          renderIcon={Add}
          onClick={startNewChat}
        >
          Start New Chat
        </Button>
        <Button className="chat-btns" kind="secondary" size="sm">
          Current Chat
        </Button>
        <Button className="chat-btns" kind="tertiary" size="sm">
          Saved Messages
        </Button>
      </section>
      <section className="chat-interface">
        <Heading
          className="chat-heading"
          style={{ fontSize: "20px", fontWeight: "bold" }}
        >
          Hello Ano, Let&#39;s discuss your Health
        </Heading>

        <div className="chattings">
          <div className="my-tags">
            {[
              "My medical History",
              "Health care tips and recommendations",
              "Make an Appointment",
            ].map((tag) => (
              <Tag key={tag} type="outline">
                {tag}
              </Tag>
            ))}
          </div>
          <div className="messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.sender === "me" ? "sent" : "received"
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <TextInput
              id="text-input-1"
              type="text"
              renderIcon={Microphone}
              placeholder="Type your message here..."
              slug={Microphone}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />
            <div className="send-btn" onClick={sendMessage}>
              <SendAltFilled size={32} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Chats;
