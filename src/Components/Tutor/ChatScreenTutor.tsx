import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import io, { Socket } from "socket.io-client";
import { useLocation } from "react-router-dom";

interface Message {
  senderId?: string;
  receiverId?: string;
  message?: string;
}

const ChatScreenTutor: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const location = useLocation();
  const { senderId } = location.state || {};
  console.log("User ID (Sender):", senderId);

  const { tutorInfo } = useSelector((state: RootState) => state.tutorAuth);
  const receiverId = tutorInfo?._id;
  console.log("Tutor ID (Receiver):", receiverId);

  // Define socket variable outside useEffect so it can be accessed in handleSubmit
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!receiverId || !senderId) {
      console.error("Missing tutorId or senderId");
      return;
    }

    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    console.log("Joining room with:", { receiverId, senderId });
    newSocket.emit("join", { userId: senderId, receiverId });

    const handlePrivateMessage = (msg: Message) => {
      console.log("Received message:", msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    };

    newSocket.on("private message", handlePrivateMessage);

    return () => {
      newSocket.off("private message", handlePrivateMessage);
      newSocket.disconnect();
    };
  }, [senderId, receiverId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message && senderId && receiverId && socket) {
      console.log("Sending message:", { message, receiverId, senderId });
      socket.emit("private message", {
        message,
        senderId: senderId,
        receiverId: receiverId,
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        { senderId: senderId, message, receiverId: receiverId },
      ]);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {messages.map((msg, index) => (
            <li
              key={index}
              className={`flex ${
                msg.senderId === receiverId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-lg max-w-xs ${
                  msg.senderId === receiverId
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                <strong>
                  {msg.senderId === receiverId ? "You" : "User"}:
                </strong>{" "}
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
