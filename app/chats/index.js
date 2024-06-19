import React, { useEffect } from "react";
import "./styles.scss";
import FloatingCard from "../../components/floating-card";
import { Button, Heading } from "@carbon/react";
import Features from "../../components/Features";
import Intergrations from "../../components/intergrations";
import TechTrust from "../../components/Tech-trust";
function Chats() {
  useEffect(() => {
    window.watsonAssistantChatOptions = {
      integrationID: "c60710e8-ce57-4c1a-a1af-a3248da21f48", // The ID of this integration.
      region: "us-south", // The region your integration is hosted in.
      serviceInstanceID: "3e1f34c5-2bff-4a50-ace2-6d6a6f7ec59e", // The ID of your service instance.
      onLoad: async (instance) => {
        await instance.render();
      },
    };

    setTimeout(() => {
      const t = document.createElement("script");
      t.src =
        "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" +
        (window.watsonAssistantChatOptions.clientVersion || "latest") +
        "/WatsonAssistantChatEntry.js";
      document.head.appendChild(t);
    }, 0);

    // Typing and deleting effect
    const textElement = document.getElementById("typing-text");
    const text = "Medlink AI Chat";
    let index = 0;
    let isDeleting = false;

    function type() {
      textElement.innerHTML = text.slice(0, index);

      if (!isDeleting && index < text.length) {
        index++;
      } else if (isDeleting && index > 0) {
        index--;
      } else {
        isDeleting = !isDeleting;
      }

      setTimeout(type, isDeleting ? 100 : 200);
    }

    type();
  }, []);

  return (
    <div className="chat-cont">
      <div className="chats">
        <div className="image-container">
          <img src="../../../chat-images/image1.png" alt="First" />
        </div>
        <div className="image-container">
          <img src="../../../chat-images/image2.png" alt="Second" />
        </div>
        <div className="image-container">
          <img src="../../../chat-images/image3.png" alt="Third" />
        </div>
        <div className="image-container">
          <img src="../../../chat-images/image4.png" alt="Fourth" />
        </div>
        <div className="text-container">
          <div id="typing-text"></div>
        </div>
      </div>
      <Features />
      <TechTrust />
      <Intergrations />
    </div>
  );
}

export default Chats;
