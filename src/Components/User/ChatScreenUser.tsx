import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import io, { Socket } from "socket.io-client";
import { useLocation, useNavigate } from "react-router-dom";
import { sendUserMsg } from "../../api/user";

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: string;
  isVideoLink?: boolean;
}

const SOCKET_SERVER_URL = "http://localhost:3000";

const ChatScreenUser: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const navigate = useNavigate();

  const location = useLocation();
  const instructorId: string = location.state?.id;

  const { userInfo } = useSelector((state: RootState) => state.auth);
  const userId: string = userInfo._id as string;
  const username: string = userInfo.name as string;

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handlePrivateMessage = useCallback((msg: Message) => {
    setMessages((prevMessages) => [...prevMessages, msg]);
    console.log(msg, "msg received");
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.emit("join", { userId, instructorId });

    socket.on("private  message", handlePrivateMessage);

    

    return () => {
      socket.off("private message", handlePrivateMessage);
    };
  }, [socket, userId, instructorId, handlePrivateMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message && socket) {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: userId,
        receiverId: instructorId,
        message: message,
        timestamp: new Date().toISOString(),
      };

      socket.emit("private message", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      try {
        const response = await sendUserMsg(
          message,
          userId,
          instructorId,
          username
        );
        console.log(response, "res chat user");
      } catch (error) {
        console.error("Error sending message:", error);
      }

      setMessage("");
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  const handleVideoLinkClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.target as HTMLAnchorElement;
    if (target.tagName === "A") {
      const videoLink = target.getAttribute("data-video-link");
      const roomID = target.getAttribute("data-room-id");
      if (videoLink && roomID) {
        navigate(videoLink, { state: { roomids: roomID, videoLink } });
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        {/* <div className="h-[400px] overflow-y-auto flex flex-col-reverse">
          <ul className="w-full space-y-2">
            {messages.map((msg) => (
              <li
                key={msg.id}
                className={`px-4 py-2 rounded-lg ${
                  msg.senderId === userId
                    ? 'bg-blue-500 text-white self-end'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p
                  className={msg.isVideoLink ? "cursor-pointer hover:underline" : ""}
                  onClick={() => {
                    if (msg.isVideoLink) {
                      const videoLink = msg.message.split(': ')[1];
                      navigate(videoLink);
                    }
                  }}
                >
                  {msg.message}
                </p>
                <time className="text-xs opacity-50">{formatTimestamp(msg.timestamp)}</time>
              </li>
            ))}
          </ul>
        </div> */}
        <div className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {messages.map((msg) => (
              <li
                key={msg.id}
                className={`flex ${
                  msg.senderId === userId ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`chat ${
                    msg.senderId === userId ? "chat-end" : "chat-start"
                  } max-w-xs`}
                >
                  <div className="chat-header">
                    {msg.senderId === userId ? "You" : "Instructor"}
                  </div>
                  {msg.message.includes("<a") ? (
                    <div
                      className="chat-bubble cursor-pointer"
                      dangerouslySetInnerHTML={{ __html: msg.message }}
                      onClick={handleVideoLinkClick}
                    />
                  ) : (
                    <div className="chat-bubble">{msg.message}</div>
                  )}
                  <time className="text-xs opacity-50">
                    {formatTimestamp(msg.timestamp)}
                  </time>
                  <div className="chat-footer opacity-50">Seen</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={handleSubmit} className="mt-4 flex items-center">
          <input
            type="text"
            className="flex-1 mr-2 px-3 py-2 bg-blue-100 rounded-lg"
            placeholder="Type your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="bg-purple-500 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatScreenUser;
