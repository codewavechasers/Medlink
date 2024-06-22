"use client"
import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import './styles.scss';

function Conference() {
  const [peerId, setPeerId] = useState('');
  const [remotePeerId, setRemotePeerId] = useState('');
  const [peer, setPeer] = useState(null);
  const [call, setCall] = useState(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    const newPeer = new Peer();

    newPeer.on('open', (id) => {
      setPeerId(id);
    });

    newPeer.on('call', (incomingCall) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        localVideoRef.current.srcObject = stream;
        localVideoRef.current.play();
        incomingCall.answer(stream);
        incomingCall.on('stream', (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        });
        setCall(incomingCall);
      });
    });

    setPeer(newPeer);

    return () => {
      if (peer) {
        peer.destroy();
      }
    };
  }, []);

  const startCall = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      localVideoRef.current.srcObject = stream;
      localVideoRef.current.play();
      const outgoingCall = peer.call(remotePeerId, stream);
      outgoingCall.on('stream', (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream;
        remoteVideoRef.current.play();
      });
      setCall(outgoingCall);
    });
  };

  const endCall = () => {
    if (call) {
      call.close();
    }
    if (localVideoRef.current.srcObject) {
      localVideoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    if (remoteVideoRef.current.srcObject) {
      remoteVideoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    setCall(null);
  };

  return (
    <div className="conference-container">
      <div className="video-container">
        <video ref={localVideoRef} className="local-video" muted></video>
        <video ref={remoteVideoRef} className="remote-video"></video>
      </div>
      <div className="controls">
        <div className="peer-id">Your Peer ID: {peerId}</div>
        <input
          type="text"
          value={remotePeerId}
          onChange={(e) => setRemotePeerId(e.target.value)}
          placeholder="Remote Peer ID"
        />
        <button onClick={startCall} disabled={!remotePeerId || !!call}>
          Start Call
        </button>
        <button onClick={endCall} disabled={!call}>
          End Call
        </button>
      </div>
    </div>
  );
}

export default Conference;
