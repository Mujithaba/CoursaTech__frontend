import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import io, { Socket } from "socket.io-client";
import { useLocation } from "react-router-dom";

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: string; // Added timestamp field
}

const SOCKET_SERVER_URL = "http://localhost:3000";

const ChatScreenTutor: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const location = useLocation();
  const { senderId, userName } = location.state || {};

  const { tutorInfo } = useSelector((state: RootState) => state.tutorAuth);
  const receiverId = tutorInfo?._id;

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!receiverId || !senderId) {
      console.error("Missing tutorId or senderId");
      return;
    }

    socketRef.current = io(SOCKET_SERVER_URL);

    const roomId = [senderId, receiverId].sort().join('-');
    socketRef.current.emit('joinRoom', { roomId });

    socketRef.current.on('private message', (msg: Message) => {
      setMessages((prevMessages) => {
        if (!prevMessages.some(m => m.id === msg.id)) {
          return [...prevMessages, msg];
        }
        return prevMessages;
      });
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [senderId, receiverId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message && senderId && receiverId && socketRef.current) {
      const newMessage: Message = {
        id: Date.now().toString(), // Use timestamp as a unique ID
        senderId: receiverId,
        receiverId: senderId,
        message: message,
        timestamp: new Date().toISOString(), // Add current timestamp
      };

      socketRef.current.emit('private message', newMessage);

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");
    }
  };

  // Function to format the timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {messages.map((msg) => (
            <li
              key={msg.id}
              className={`flex ${
                msg.senderId === receiverId ? "justify-end" : "justify-start"
              }`}
            >
              {/* <div
                className={`p-3 rounded-lg max-w-xs ${
                  msg.senderId === receiverId
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                <p className="text-xs text-gray-500">{msg.senderId === receiverId ? "You" : userName}</p>
                <p className="font-mono">{msg.message}</p>
                <p className="text-xs text-gray-500 flex justify-end">{formatTimestamp(msg.timestamp)}</p>
              </div> */}
               <div className={`chat chat-start max-w-xs`}>
                  <div className="chat-header">
                  {msg.senderId === receiverId ? "You" : userName}
                  </div>
                  <div className="chat-bubble">{msg.message}</div>
                    <time className="text-xs opacity-50">{formatTimestamp(msg.timestamp)}</time>
                  <div className="chat-footer opacity-50">Seen</div>
                </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 bg-white border-t">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-2 border rounded-lg bg-blue-100"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatScreenTutor;
