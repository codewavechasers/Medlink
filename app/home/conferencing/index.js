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
import Notifications from "@/components/notification/index";

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
  const [showNotification, setShowNotification] = useState(false);
  const [notificationProps, setNotificationProps] = useState({
    kind: "",
    caption: "",
    title: "",
    subtitle: "",
    timeout: 3000,
  });

  useEffect(() => {
    const newPeer = new Peer();

    newPeer.on("open", (id) => {
      setPeerId(id);
    });

    newPeer.on("call", (incomingCall) => {
      setIncomingCall(incomingCall);
      showNotificationMessage(
        "info",
        "Incoming Call",
        `Call from ${incomingCall.peer}`
      );
    });

    setPeer(newPeer);

    return () => {
      if (newPeer) {
        newPeer.destroy();
      }
    };
  }, []);

  const showNotificationMessage = (kind, title, subtitle) => {
    setNotificationProps({
      kind,
      caption: "",
      title,
      subtitle,
      timeout: 3000,
    });
    setShowNotification(true);
  };

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
        showNotificationMessage(
          "success",
          "Call Started",
          `Connected with ${remotePeerId}`
        );
      })
      .catch((err) => {
        console.error("Failed to get media stream", err);
        showNotificationMessage(
          "error",
          "Call Failed",
          "Unable to access media devices"
        );
      });
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
        showNotificationMessage(
          "success",
          "Call Accepted",
          `Connected with ${incomingCall.peer}`
        );
      })
      .catch((err) => {
        console.error("Failed to get media stream", err);
        showNotificationMessage(
          "error",
          "Call Failed",
          "Unable to access media devices"
        );
      });
  };

  const rejectCall = () => {
    if (incomingCall) {
      incomingCall.close();
    }
    setIncomingCall(null);
    showNotificationMessage(
      "info",
      "Call Rejected",
      `Rejected call from ${incomingCall.peer}`
    );
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
    showNotificationMessage(
      "info",
      "Call Ended",
      "The call has been terminated"
    );
  };

  const toggleLocalVideoSize = () => {
    setIsLocalVideoFullScreen(!isLocalVideoFullScreen);
  };

  const toggleUserBar = () => {
    setIsUserBarVisible(!isUserBarVisible);
  };

  // const toggleMuteVideo = () => {
  //   setIsVideoMuted(!isVideoMuted);
  //   if (localVideoRef.current && localVideoRef.current.srcObject) {
  //     localVideoRef.current.srcObject
  //       .getVideoTracks()
  //       .forEach((track) => (track.enabled = isVideoMuted));
  //   }
  //   showNotificationMessage(
  //     "info",
  //     "Video Status",
  //     isVideoMuted ? "Video unmuted" : "Video muted"
  //   );
  // };
  const toggleMuteVideo = () => {
    setIsVideoMuted((prev) => !prev);
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const videoTrack = localVideoRef.current.srcObject.getVideoTracks()[0];
      if (videoTrack) {
        if (!isVideoMuted) {
          // Muting video
          videoTrack.enabled = false;
        } else {
          // Unmuting video
          videoTrack.enabled = true;
          // Reconnect the video stream
          navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((newStream) => {
              const newVideoTrack = newStream.getVideoTracks()[0];
              const oldAudioTrack =
                localVideoRef.current.srcObject.getAudioTracks()[0];

              const newStreamWithAudio = new MediaStream([
                newVideoTrack,
                oldAudioTrack,
              ]);
              localVideoRef.current.srcObject = newStreamWithAudio;
              localVideoRef.current.play();

              // If in a call, replace the video track
              // if (call) {
              //   const senders = call.peerConnection.getSenders();
              //   const videoSender = senders.find(
              //     (sender) => sender.track.kind === "video"
              //   );
              //   if (videoSender) {
              //     videoSender.replaceTrack(newVideoTrack);
              //   }
              // }
            })
            .catch((err) => {
              console.error("Failed to get video stream", err);
              showNotificationMessage(
                "error",
                "Video Error",
                "Unable to reconnect video"
              );
            });
        }
      }
    }
    showNotificationMessage(
      "info",
      "Video Status",
      isVideoMuted ? "Video unmuted" : "Video muted"
    );
  };
  const toggleMuteAudio = () => {
    setIsAudioMuted(!isAudioMuted);
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      localVideoRef.current.srcObject
        .getAudioTracks()
        .forEach((track) => (track.enabled = isAudioMuted));
    }
    showNotificationMessage(
      "info",
      "Audio Status",
      isAudioMuted ? "Audio unmuted" : "Audio muted"
    );
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await App.get("/api/users/", {
          withCredentials: true,
        });
        const data = response.data;
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:");
        showNotificationMessage("error", "Error", "Failed to fetch users");
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
          <Form
            className="peer-form"
            onSubmit={(e) => {
              e.preventDefault();
              startCall();
            }}
          >
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
          <div style={{ width: "100%", marginBottom: "5em" }}>
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
              <Phone size={24} className="call-icon" onClick={startCall} />
            </div>
          ))}
          {call && (
            <div className="in-call-name">In call with {remotePeerId}</div>
          )}
        </div>

        {/* <div className="video-container">
          {isVideoMuted ? (
            <img
              src="/logov2.svg"
              alt="Video muted"
              // className="muted-video-overlay"
              className={`local-video ${
                isLocalVideoFullScreen ? "fullscreen" : ""
              }`}
            />
          ) : (
            <video
              ref={localVideoRef}
              className={`local-video ${
                isLocalVideoFullScreen ? "fullscreen" : ""
              }`}
              muted
              onClick={toggleLocalVideoSize}
            ></video>
          )}
        
          <video ref={remoteVideoRef} className="remote-video"></video>
        </div> */}
        <div className="video-container">
          {isVideoMuted ? (
            <img
              src="/logov2.svg"
              alt="Video muted"
              className={`local-video ${
                isLocalVideoFullScreen ? "fullscreen" : ""
              }`}
            />
          ) : (
            <video
              ref={localVideoRef}
              className={`local-video ${
                isLocalVideoFullScreen ? "fullscreen" : ""
              }`}
              muted
              onClick={toggleLocalVideoSize}
              playsInline
              autoPlay
            ></video>
          )}

          <video
            ref={remoteVideoRef}
            className="remote-video"
            playsInline
            autoPlay
          ></video>
        </div>
        <div className="controls">
          <div className="controls-btns">
            <div
              className={`ctrl-btns ${call ? "notcall" : "call"}`}
              onClick={call ? endCall : startCall}
            >
              {call ? (
                <PhoneOff size={32} className="control-btn" />
              ) : (
                <Phone size={32} className="control-btn" />
              )}
            </div>
            <div
              className={`ctrl-btns ${
                isVideoMuted ? "vidUnmuted" : "vidMuted"
              }`}
              onClick={toggleMuteVideo}
            >
              {isVideoMuted ? (
                <Video size={32} className="control-btn" />
              ) : (
                <VideoOff size={32} className="control-btn" />
              )}
            </div>
            <div
              className={`ctrl-btns ${isAudioMuted ? "unmuted" : "muted"}`}
              onClick={toggleMuteAudio}
            >
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

        {showNotification && (
          <Notifications
            kind={notificationProps.kind}
            caption={notificationProps.caption}
            title={notificationProps.title}
            subtitle={notificationProps.subtitle}
            timeout={notificationProps.timeout}
          />
        )}
      </div>
    </WithAuthRedirect>
  );
}

export default Conference;
