import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";

interface Message {
  senderId?: string;
  receiver?: string;
  message?: string;
}

const socket = io("http://localhost:3000/");

const ChatScreenTutor: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const location = useLocation();
  const { senderId, receiverId } = location.state;

  console.log('Sender ID:', senderId);
  console.log('Receiver ID:', receiverId);

  // const { tutorInfo } = useSelector((state: RootState) => state.tutorAuth);
  // const userIdT: string = tutorInfo as string;

  useEffect(() => {
    console.log("Joining room with:", { receiverId, senderId });
    socket.emit("join", { receiverId, senderId });
  
    const handlePrivateMessage = (msg: Message) => {
      console.log("Received message:", msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    };
  
    socket.on("private message", handlePrivateMessage);
  
    return () => {
      socket.off("private message", handlePrivateMessage);
    };
  }, [receiverId, senderId]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message) {
      console.log("Sending message:", { message, senderId, receiverId });
      socket.emit("private message", { message, senderId, receiverId });
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* <div className="flex justify-between items-center p-4 bg-blue-600 text-white">
        <h1 className="text-xl font-bold">Chat Room</h1>
        <span>Chatting with: {receiverId}</span>
      </div> */}

      <div className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {messages.map((msg, index) => (
            <li
              key={index}
              className={`flex ${
                msg.receiver === receiverId ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`p-3 rounded-lg max-w-xs ${
                  msg.senderId === senderId
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 text-black'
                }`}
              >
                <strong>{msg.senderId === senderId ? 'You' : msg.senderId}:</strong>{' '}
                {msg.message}
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
