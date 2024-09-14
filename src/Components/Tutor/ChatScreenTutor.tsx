// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store";
// import { Socket } from 'socket.io-client';
// import { useLocation } from 'react-router-dom';
// import { FiSend } from 'react-icons/fi';
// import { IoVideocam } from 'react-icons/io5';
// import { useSocket } from "./SocketTutorContext";

// interface Message {
//   id: string;
//   senderId: string;
//   receiverId: string;
//   message: string;
//   timestamp: string;
// }



// const ChatScreenTutor: React.FC = () => {
//   const [message, setMessage] = useState<string>('');
//   const [messages, setMessages] = useState<Message[]>([]);
//   const location = useLocation();
//   const { senderId, userName } = location.state || {};

//   const { tutorInfo } = useSelector((state: RootState) => state.tutorAuth);
//   const receiverId = tutorInfo?._id;

//   const { socket } = useSocket();

//   useEffect(() => {
//     if (!socket || !receiverId || !senderId) {
//       console.error('Missing socket, tutorId, or senderId');
//       return;
//     }

//     const roomId = [senderId, receiverId].sort().join('-');
//     socket.emit('joinRoom', { roomId });

//     socket.on('private message', (msg: Message) => {
//       setMessages((prevMessages) => {
//         if (!prevMessages.some((m) => m.id === msg.id)) {
//           return [...prevMessages, msg];
//         }
//         return prevMessages;
//       });
//     });

//     return () => {
//       socket.off('private message');
//       socket.emit('leaveRoom', { roomId });
//     };
//   }, [socket, senderId, receiverId]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (message && senderId && receiverId && socket) {
//       const newMessage: Message = {
//         id: Date.now().toString(),
//         senderId: receiverId,
//         receiverId: senderId,
//         message: message,
//         timestamp: new Date().toISOString(),
//       };

//       socket.emit('private message', newMessage);
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//       setMessage('');
//     }
//   };

//   const formatTimestamp = (timestamp: string) => {
//     const date = new Date(timestamp);
//     return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
//   };

//   const handleVideoCall = async () => {
//     // Your video call handling logic
//   };

//   return (
//     <div className="flex flex-col h-full bg-white rounded-md">
//       <div className="flex-1 p-4 overflow-y-auto">
//         <ul className="space-y-2">
//           {messages.map((msg) => (
//             <li
//               key={msg.id}
//               className={`flex ${
//                 msg.senderId === receiverId ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`chat ${
//                   msg.senderId === receiverId ? "chat-end" : "chat-start"
//                 } max-w-xs`}
//               >
//                 <div className="chat-header">
//                   {msg.senderId === receiverId ? "You" : userName}
//                 </div>
//                 <div className="chat-bubble">{msg.message}</div>
//                 <time className="text-xs opacity-50">
//                   {formatTimestamp(msg.timestamp)}
//                 </time>
//                 <div className="chat-footer opacity-50">Seen</div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="p-4 bg-gray-800 border-t rounded-b-md">
//         <form onSubmit={handleSubmit} className="flex space-x-2">
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             className="flex-1 p-2 border rounded-lg bg-white"
//             placeholder="Type a message..."
//           />
//           <button className="bg-white px-2 rounded-full" type="submit">
//             <FiSend size={23} className="text-black" />
//           </button>
//           <button
//             className="bg-white px-2 rounded-full"
//             onClick={handleVideoCall}
//           >
//             <IoVideocam size={23} className="text-black" />
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ChatScreenTutor;







import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import io, { Socket } from "socket.io-client";
import { useLocation } from "react-router-dom";
import { FiSend } from "react-icons/fi";
import { IoVideocam } from "react-icons/io5";




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

  // handleVideoCall

  const handleVideoCall = async ()=>{
    
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-md">
      <div className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {messages.map((msg) => (
            <li
              key={msg.id}
              className={`flex ${
                msg.senderId === receiverId ? "justify-end" : "justify-start"
              }`}
            >
            
              {msg.senderId === receiverId ? 
              ( <div className={`chat chat-end max-w-xs`}>
                <div className="chat-header">
                {msg.senderId === receiverId ? "You" : userName}
                </div>
                <div className="chat-bubble">{msg.message}</div>
                  <time className="text-xs opacity-50">{formatTimestamp(msg.timestamp)}</time>
                <div className="chat-footer opacity-50">Seen</div>
              </div>)
              :( <div className={`chat chat-start max-w-xs`}>
                <div className="chat-header">
                {msg.senderId === receiverId ? "You" : userName}
                </div>
                <div className="chat-bubble">{msg.message}</div>
                  <time className="text-xs opacity-50">{formatTimestamp(msg.timestamp)}</time>
                <div className="chat-footer opacity-50">Seen</div>
              </div>)}
              
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 bg-gray-800 border-t rounded-b-md">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-2 border rounded-lg bg-white"
            placeholder="Type a message..."
          />
          <button
            className="bg-white text-white px-2  rounded-full"
            onClick={handleSubmit}
          >
            <FiSend size={23} className="text-black"/>
          </button>
          <button
            className="bg-white text-white px-2  rounded-full"
            onClick={handleVideoCall}
          >
            <IoVideocam  size={23} className="text-black"/>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatScreenTutor;
