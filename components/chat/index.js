import React, { useState, useEffect } from "react";
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
  const [messages, setMessages] = useState([]);
  const [panelOpen, setOpenPanel] = useState(false);
  const [patientName, setPatientName] = useState({});
  const [isChatStarted, setIsChatStarted] = useState(false);

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await App.get("/auth/user-data/", {
          withCredentials: true,
        });
        setPatientName(response.data);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const sendMessage = async () => {
    if (message.trim() === "") return;

    const messageData = {
      message,
      sender: patientName.name,
      timestamp: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, messageData]);
    setMessage("");
    setIsChatStarted(true);

    try {
      const response = await App.post("/api/watson/get-response/", { message });
      const watsonMessage = {
        message: response.data.watson,
        sender: "WatsonX",
        timestamp: new Date().toISOString(),
      };

      setMessages((prevMessages) => [...prevMessages, watsonMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <WithAuthRedirect>
      <Heading className="chat-heading" style={{ fontWeight: "bold" }}>
        Hello {patientName.name}, Let&#39;s discuss your Health
      </Heading>
      <div className="my-chat">
        <section className="chat-interface">
          {/* <div className="toggler">
            {panelOpen ? (
              <OpenPanelLeft onClick={() => setOpenPanel(false)} />
            ) : (
              <OpenPanelRight onClick={() => setOpenPanel(true)} />
            )}
          </div> */}

          <div className="chattings">
            {!isChatStarted ? (
              <div className="my-tags" style={{ margin: "auto" }}>
                <Image width={300} height={300} src="/logov2.svg" alt="Logo" />
              </div>
            ) : (
              <div className="message-bubbles">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`bubble ${
                      msg.sender === patientName.name ? "sent" : "received"
                    }`}
                    style={{ marginBottom: "10px" }}
                  >
                    <p>{msg.message}</p>
                    <small>
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </small>
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
  );
}

export default Chats;
