import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import io, { Socket } from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import { sendUserMsg } from '../../api/user';

interface Message {
  senderId: string;
  receiver: string;
  message: string;
}

const SOCKET_SERVER_URL = 'http://localhost:3000';

const ChatScreenUser: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

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

    socket.emit('join', { userId, instructorId });

    socket.on('private message', handlePrivateMessage);

    return () => {
      socket.off('private message', handlePrivateMessage);
    };
  }, [socket, userId, instructorId, handlePrivateMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message && socket) {
      const newMessage: Message = {
        senderId: userId,
        receiver: instructorId,
        message: message
      };

      socket.emit('private message', newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      
      try {
        const response = await sendUserMsg(message, userId, instructorId, username);
        console.log(response, "res chat user");
      } catch (error) {
        console.error("Error sending message:", error);
      }

      setMessage('');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="h-[400px] overflow-y-auto flex flex-col-reverse">
          <ul className="w-full space-y-2">
            {messages.map((msg, index) => (
              <li
                key={index}
                className={`px-4 py-2  rounded-lg ${
                  msg.senderId === userId
                    ? 'bg-blue-500 text-white self-end'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p>{msg.message}</p>
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
          <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded-lg">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatScreenUser;