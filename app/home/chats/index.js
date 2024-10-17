import React, { useEffect } from "react";
import "./styles.scss";
import ChatInterface from "@/components/chat";
function Chats() {
  

  return (
    <div className="chat-cont">
      <ChatInterface />
      {/* <div id="WebChatContainer" style={chatContainerStyle}></div> */}
    </div>
  );
}

export default Chats;
