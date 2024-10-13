import React, { useEffect } from "react";
import "./styles.scss";
import ChatInterface from "@/components/chat";
function Chats() {
  useEffect(() => {
    window.watsonAssistantChatOptions = {
      integrationID: "4be8d9d0-5f37-4c69-8127-fd9df29f2d02", // The ID of this integration.
      region: "us-south", // The region your integration is hosted in.
      serviceInstanceID: "acaca65e-f26d-4827-9ccb-9fbecfc1fdad", // The ID of your service instance.
      onLoad: async (instance) => {
        await instance.render();
      },
    };
    setTimeout(function () {
      const t = document.createElement("script");
      t.src =
        "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" +
        (window.watsonAssistantChatOptions.clientVersion || "latest") +
        "/WatsonAssistantChatEntry.js";
      document.head.appendChild(t);
    });
  }, []);

  return (
    <div className="chat-cont">
      <ChatInterface />
      {/* <div id="WebChatContainer" style={chatContainerStyle}></div> */}
    </div>
  );
}

export default Chats;
