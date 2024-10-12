import React, { useState, useEffect, useRef } from "react";
import "./styles.scss";
import { Heading, TextInput } from "@carbon/react";
import {
  Microphone,
  OpenPanelLeft,
  OpenPanelRight,
  SendAltFilled,
} from "@carbon/icons-react";
import App from "@/app/api/api";
import Image from "next/image";
import WithAuthRedirect from "@/app/api/withAuthRedirect.js";

function Chats() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); // For storing chat bubbles
  const [panelOpen, setOpenPanel] = useState(false);
  const [patientName, setPatientName] = useState({});
  const [isChatStarted, setIsChatStarted] = useState(false); // To toggle logo and chat
  const ws = useRef(null); // Reference to WebSocket connection

  const ChatList = [
    {
      id: 1,
      sender_id: "fdghf",
      sender_name: "Dr. Jane",
      chat_id: "hfhfhf",
      thread: "",
      status: "offline",
    },
    {
      id: 2,
      sender_id: "gfg",
      sender_name: "Dr. Jane",
      chat_id: "hfhfhf",
      thread: "",
      status: "online",
    },
    {
      id: 3,
      sender_id: "vcv",
      sender_name: "Dr. Jane",
      chat_id: "hfhfhf",
      thread: "",
      status: "offline",
    },
  ];

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await App.get("/auth/user-data/", {
          withCredentials: true,
        });
        const data = response.data;
        setPatientName(data);
      } catch (error) {
        console.log("error");
      }
    };

    fetchUserData();

    // Initialize WebSocket connection
    ws.current = new WebSocket("ws://localhost:8000/ws/chat/");

    ws.current.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.current.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Cleanup WebSocket connection
    return () => {
      ws.current.close();
    };
  }, []);

  // Handle sending messages
  const sendMessage = () => {
    if (message.trim() !== "") {
      const messageData = {
        message,
        sender: patientName.name,
        timestamp: new Date().toISOString(),
      };

      // Send message via WebSocket
      ws.current.send(JSON.stringify(messageData));

      // Add message to local state (show sent message)
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setMessage(""); // Clear input
      setIsChatStarted(true); // Start chat to replace logo
    }
  };

  return (
    <>
      <WithAuthRedirect>
        <Heading className="chat-heading" style={{ fontWeight: "bold" }}>
          Hello {patientName.name}, Let&#39;s discuss your Health
        </Heading>
        <div className="my-chat">
          <section className={`${panelOpen ? "panelopen" : "panelclose"} chat-nav`}>
            {ChatList.map((chat) => (
              <div key={chat.id} className="chatContainer">
                <p>{chat.sender_name}</p>
                <div
                  style={{
                    background: chat.status === "offline" ? "red" : "green",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                  }}
                ></div>
              </div>
            ))}
          </section>

          <section className="chat-interface">
            <div className="toggler">
              {panelOpen ? (
                <OpenPanelLeft onClick={() => setOpenPanel(false)} />
              ) : (
                <OpenPanelRight onClick={() => setOpenPanel(true)} />
              )}
            </div>

            <div className="chattings">
              {!isChatStarted ? (
                <div className="my-tags">
                  <Image width={300} height={300} src="/logov2.svg" alt="Logo" />
                </div>
              ) : (
                <div className="message-bubbles">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`bubble ${msg.sender === patientName.name ? "sent" : "received"}`}
                    >
                      <p>{msg.message}</p>
                      <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
                    </div>
                  ))}
                </div>
              )}
            </div>

              <div className="chat-input">
                <TextInput
                  id="text-input-1"
                  type="text"
                  renderIcon={Microphone}
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <div className="send-btn" onClick={sendMessage}>
                  <SendAltFilled size={32} />
                </div>
              </div>
          </section>
        </div>
      </WithAuthRedirect>
    </>
  );
}

export default Chats;
