import React, { useEffect } from "react";
import "./styles.scss";
import Features from "../../../components/Features";
import Intergrations from "../../../components/intergrations";
import TechTrust from "../../../components/Tech-trust";
import MoreEnquiry from "../../../components/more-inquiry";
import WithAuthRedirect from "@/app/api/withAuthRedirect.js";

function Chats() {
  useEffect(() => {
    const hasRefreshed = localStorage.getItem("hasRefreshed");

    // if (!hasRefreshed) {
    //   localStorage.setItem("hasRefreshed", "true");
    //   localStorage.setItem("selectedItem", "chats");
    //   window.location.reload();
    // } else {
    //   localStorage.removeItem("hasRefreshed");
    // }
  }, []);

  useEffect(() => {
    const customElement = document.querySelector('#WebChatContainer');

    window.watsonAssistantChatOptions = {
      integrationID: "c60710e8-ce57-4c1a-a1af-a3248da21f48",
      region: "us-south", 
      serviceInstanceID: "3e1f34c5-2bff-4a50-ace2-6d6a6f7ec59e",
      element: customElement,
      onLoad: async (instance) => {
        await instance.render();
      },
    };

    const t = document.createElement("script");
    t.src =
      "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" +
      (window.watsonAssistantChatOptions.clientVersion || "latest") +
      "/WatsonAssistantChatEntry.js";
    document.head.appendChild(t);

    return () => {
      document.head.removeChild(t);
    };
  }, []);

  const chatContainerStyle = {
    width: '100%',
    height: '90vh',
    // zIndex: 1000,  
    backgroundImage: 'url("/chat-images/bg.png")', 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat' 
  };

  return (
    // <WithAuthRedirect>
    <div className="chat-cont">
      <div id="WebChatContainer" style={chatContainerStyle}>
        
      </div>
      <Features />
      <TechTrust />
      <Intergrations />
      <MoreEnquiry />
    </div>
    // </WithAuthRedirect>
  );
}

export default Chats;
