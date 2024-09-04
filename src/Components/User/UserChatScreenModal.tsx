import React, { useEffect, useState, useRef, FormEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import io, { Socket } from "socket.io-client";
import { sendUserMsg } from "../../api/user";
import { FiSend } from "react-icons/fi";


interface UserChatScreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  receiverId: string;
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: string;
}

const SOCKET_SERVER_URL = "http://localhost:3000";

function UserChatScreenModal({
  isOpen,
  onClose,
  receiverId,
}: UserChatScreenModalProps) {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<Socket | null>(null);

  const { userInfo } = useSelector((state: RootState) => state.auth);
  const userId: string = userInfo._id;
  const username: string = userInfo.name;

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL);

    const roomId = [userId, receiverId].sort().join("-");
    socketRef.current.emit("joinRoom", { roomId });

    socketRef.current.on("private message", (msg: Message) => {
      setMessages((prevMessages) => {
        if (!prevMessages.some((m) => m.id === msg.id)) {
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
  }, [userId, receiverId]);

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault();

    if (message && socketRef.current) {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: userId,
        receiverId: receiverId,
        message: message,
        timestamp: new Date().toISOString(),
      };

      socketRef.current.emit("private message", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      try {
        await sendUserMsg(message, userId, receiverId, username);
      } catch (error) {
        console.error("Error sending message:", error);
      }

      setMessage("");
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-full max-w-md h-[70vh] flex flex-col rounded-lg shadow-lg">
        <div className="bg-card py-2 px-4 rounded-t-lg flex justify-center">
          <h2 className="text-lg font-semibold">Chat</h2>
        </div>
        <div className="flex-1 overflow-y-auto bg-white px-4 py-2">
          <ul className="space-y-4">
            {messages.map((msg) => (
              <li key={msg.id} className={`flex ${msg.senderId === userId ? 'justify-end' : 'justify-start'}`}>
                <div className={`chat ${msg.senderId === userId ? 'chat-end' : 'chat-start'} max-w-xs`}>
                  <div className="chat-header">
                    {msg.senderId === userId ? 'You' : 'Instructor'}
                  </div>
                  <div className="chat-bubble">{msg.message}</div>
                  <time className="text-xs opacity-50">{formatTimestamp(msg.timestamp)}</time>
                  <div className="chat-footer opacity-50">Seen</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-400 py-2 px-4 rounded-b-lg flex">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 mr-2 p-2 rounded-lg border border-gray-300"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="bg-gray-800 text-white px-3 rounded-full"
            onClick={handleSubmit}
          >
            <FiSend size={20}/>
          </button>
        </div>
      </div>
      <button
        className="absolute top-4 right-4 text-white text-2xl"
        onClick={onClose}
      >
        &times;
      </button>
    </div>
  );
}

export default UserChatScreenModal;