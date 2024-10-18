"use client";
import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import "./styles.scss";
import {
  Microphone,
  MicrophoneOff,
  Phone,
  PhoneOff,
  TableOfContents,
  Video,
  VideoOff,
  SettingsServices,
  Checkmark,
  Chat,
} from "@carbon/icons-react";
import {
  Button,
  CodeSnippet,
  Form,
  TextInput,
  ExpandableSearch,
} from "@carbon/react";
import WithAuthRedirect from "@/app/api/withAuthRedirect.js";
import App from "@/app/api/api";
import ChatInterface from "@/components/chatInterface/chatinterface";

function Conference() {
  const [peerId, setPeerId] = useState("");
  const [remotePeerId, setRemotePeerId] = useState("");
  const [peer, setPeer] = useState(null);
  const [call, setCall] = useState(null);
  const [isLocalVideoFullScreen, setIsLocalVideoFullScreen] = useState(false);
  const [incomingCall, setIncomingCall] = useState(null);
  const [isUserBarVisible, setIsUserBarVisible] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [showIdInput, setShowIdInput] = useState(false);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const newPeer = new Peer();

    newPeer.on("open", (id) => {
      setPeerId(id);
    });

    newPeer.on("call", (incomingCall) => {
      setIncomingCall(incomingCall);
    });

    setPeer(newPeer);

    return () => {
      if (newPeer) {
        newPeer.destroy();
      }
    };
  }, []);

  const startCall = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          localVideoRef.current.play();
        }
        const outgoingCall = peer.call(remotePeerId, stream);
        outgoingCall.on("stream", (remoteStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
          }
        });
        setCall(outgoingCall);
      })
      .catch((err) => console.error("Failed to get media stream", err));
  };

  const acceptCall = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          localVideoRef.current.play();
        }
        incomingCall.answer(stream);
        incomingCall.on("stream", (remoteStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
          }
        });
        setCall(incomingCall);
        setIncomingCall(null);
      })
      .catch((err) => console.error("Failed to get media stream", err));
  };

  const rejectCall = () => {
    if (incomingCall) {
      incomingCall.close();
    }
    setIncomingCall(null);
  };

  const endCall = () => {
    if (call) {
      call.close();
    }
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      localVideoRef.current.srcObject
        .getTracks()
        .forEach((track) => track.stop());
    }
    if (remoteVideoRef.current && remoteVideoRef.current.srcObject) {
      remoteVideoRef.current.srcObject
        .getTracks()
        .forEach((track) => track.stop());
    }
    setCall(null);
  };

  const toggleLocalVideoSize = () => {
    setIsLocalVideoFullScreen(!isLocalVideoFullScreen);
  };

  const toggleUserBar = () => {
    setIsUserBarVisible(!isUserBarVisible);
  };

  const toggleMuteVideo = () => {
    setIsVideoMuted(!isVideoMuted);
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      localVideoRef.current.srcObject
        .getVideoTracks()
        .forEach((track) => (track.enabled = !isVideoMuted));
    }
  };

  const toggleMuteAudio = () => {
    setIsAudioMuted(!isAudioMuted);
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      localVideoRef.current.srcObject
        .getAudioTracks()
        .forEach((track) => (track.enabled = !isAudioMuted));
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await App.get("/api/users/",
          {
            withCredentials:true,
          }
        );
        const data =  response.data;
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:");
      }
    };

    fetchUsers();
  }, []);
  

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <WithAuthRedirect>
    <div className="conference-container">
      <div className="peer-dp">
        <SettingsServices
          onClick={() => setShowIdInput(!showIdInput)}
          size={32}
          aria-label={showIdInput ? "Hide ID input" : "Show ID input"}
        />
      </div>

      {showIdInput && (
        <Form className="peer-form" onSubmit={(e) => {e.preventDefault(); startCall();}}>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "10px",
              marginBottom: "1em",
            }}
          >
            <CodeSnippet type="single" feedback="Copied to clipboard">
              {peerId}
            </CodeSnippet>
          </div>
          <TextInput
            id="text-input-1"
            type="text"
            value={remotePeerId}
            onChange={(e) => setRemotePeerId(e.target.value)}
            placeholder="Enter Remote Peer ID"
            className="peer-id-input"
          />
          <Button
            type="submit"
            size="sm"
            renderIcon={Checkmark}
            className="submt-peer"
          >
            Call
          </Button>
        </Form>
      )}

      <div
        className={`usertoggler ${isUserBarVisible ? "move-bar" : ""}`}
        onClick={toggleUserBar}
      >
        <TableOfContents size={32} />
      </div>

      <div className={`user-bar ${isUserBarVisible ? "open-user-bar" : ""}`}>
        <div style={{ width: '100%', marginBottom: '5em' }}>
        <ExpandableSearch
            size="lg"
            labelText="Search"
            closeButtonLabelText="Clear search input"
            id="search-expandable-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {filteredUsers.map((user, index) => (
          <div
            key={index}
            className="user-info"
            onClick={() => setRemotePeerId(user.peerId)}
          >
            <p>{user.name}</p>
            <span
              className="status-dot"
              style={{ backgroundColor: user.online ? "green" : "red" }}
            ></span>
            <Phone
              size={24}
              className="call-icon"
              onClick={startCall}
            />
          </div>
        ))}
        {call && (
          <div className="in-call-name">In call with {remotePeerId}</div>
        )}
      </div>

      <div className="video-container">
      {/* {call ? ( */}
          <>
            <video
              ref={localVideoRef}
              className={`local-video ${
                isLocalVideoFullScreen ? "fullscreen" : ""
              }`}
              muted
              onClick={toggleLocalVideoSize}
            ></video>
            <video ref={remoteVideoRef} className="remote-video"></video>
          </>
        {/* //   ) : ( 
        //    <img src="/logov2.svg" alt="No call in progress" />
        //  )}   */}
      </div>

      <div className="controls">
        <div className="controls-btns">
          <div className={`ctrl-btns ${call ? "notcall" : "call"}`} onClick={call ? endCall : startCall}>
            {call ? (
              <PhoneOff size={32} className="control-btn" />
            ) : (
              <Phone size={32} className="control-btn" />
            )}
          </div>
          <div className={`ctrl-btns ${isVideoMuted ? "vidUnmuted" : "vidMuted"}`} onClick={toggleMuteVideo}>
            {isVideoMuted ? (
              <Video size={32} className="control-btn" />
            ) : (
              <VideoOff size={32} className="control-btn" />
            )}
          </div>
          <div className={`ctrl-btns ${isAudioMuted ? "unmuted" : "muted"}`} onClick={toggleMuteAudio}>
            {isAudioMuted ? (
              <Microphone size={32} className="control-btn" />
            ) : (
              <MicrophoneOff size={32} className="control-btn" />
            )}
          </div>
        </div>
        
      </div>

      {incomingCall && (
        <div className="incoming-call-prompt">
          <p>Incoming call from {incomingCall.peer}</p>
          <Button onClick={acceptCall}>Accept</Button>
          <Button onClick={rejectCall}>Reject</Button>
        </div>
      )}
    </div>
    </WithAuthRedirect>
  );
}

export default Conference;
