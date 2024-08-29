// import React, { useEffect, useState, useCallback } from "react";
// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Button,
// } from "@nextui-org/react";
// import { useSelector } from 'react-redux';
// import { RootState } from '../../redux/store';
// import io, { Socket } from 'socket.io-client';
// import { sendUserMsg } from '../../api/user';

// interface UserChatScreenModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   receiverId: string;
// }

// interface Message {
//   id: string;
//   senderId: string;
//   receiverId: string;
//   message: string;
// }

// const SOCKET_SERVER_URL = 'http://localhost:3000';

// function UserChatScreenModal({
//   isOpen,
//   onClose,
//   receiverId
// }: UserChatScreenModalProps) {
//   const [message, setMessage] = useState<string>('');
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [socket, setSocket] = useState<Socket | null>(null);
//   console.log(receiverId,"receiverId");
  
//   const { userInfo } = useSelector((state: RootState) => state.auth);
//   const userId: string = userInfo._id as string;
//   const username: string = userInfo.name as string;

//   useEffect(() => {
//     const newSocket = io(SOCKET_SERVER_URL);
//     setSocket(newSocket);

//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

//   const handlePrivateMessage = useCallback((msg: Message) => {
//     setMessages((prevMessages) => {
//       if (!prevMessages.some(m => m.id === msg.id)) {
//         return [...prevMessages, msg];
//       }
//       return prevMessages;
//     });
//   }, []);

//   useEffect(() => {
//     if (!socket) return;

//     console.log(userId, receiverId, "getting in socket");
//     socket.emit('join', { userId, receiverId });

//     socket.on('private message', handlePrivateMessage);

//     return () => {
//       socket.off('private message', handlePrivateMessage);
//     };
//   }, [socket, userId, receiverId, handlePrivateMessage]);

//   const handleSubmit = async (e?: React.FormEvent) => {
//     e?.preventDefault();

//     if (message && socket) {
//       const newMessage: Message = {
//         id: Date.now().toString(),
//         senderId: userId,
//         receiverId: receiverId,
//         message: message,
//       };

//       socket.emit('private message', newMessage);

//       try {
//         const response = await sendUserMsg(message, userId, receiverId, username);
//         console.log(response, "res chat user");
//       } catch (error) {
//         console.error("Error sending message:", error);
//       }

//       setMessage('');
//     }
//   };
//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       scrollBehavior="inside"
//       backdrop="opaque"
//       className="flex justify-end items-end p-4"
//     >
//       <ModalContent className="w-full max-w-sm h-[70vh] flex flex-col">
//         <ModalHeader className="flex items-center gap-1 bg-gray-100 py-2 px-4 rounded-t-md">
//           Chat
//         </ModalHeader>
//         <ModalBody className="flex-1 overflow-y-auto bg-white px-4 py-2">
//           <ul className="space-y-4">
//             {messages.map((msg) => (
//               <li
//                 key={msg.id}
//                 className={`px-4 py-2 rounded-lg ${
//                   msg.senderId === userId
//                     ? 'bg-blue-500 text-white self-end'
//                     : 'bg-gray-100 text-gray-800'
//                 }`}
//               >
//                 <p>{msg.message}</p>
//               </li>
//             ))}
//           </ul>
//         </ModalBody>
//         <ModalFooter className="bg-gray-100 py-2 px-4 rounded-b-md flex">
//           <input
//             type="text"
//             placeholder="Type a message..."
//             className="flex-1 mr-2 p-2 rounded-lg border border-gray-300"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//           <Button color="primary" onClick={handleSubmit}>
//             Send
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// }

// export default React.memo(UserChatScreenModal)
import React, { useEffect, useState, useCallback } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import io, { Socket } from 'socket.io-client';
import { sendUserMsg } from '../../api/user';

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
}

const SOCKET_SERVER_URL = 'http://localhost:3000';

function UserChatScreenModal({
  isOpen,
  onClose,
  receiverId
}: UserChatScreenModalProps) {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  
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

  // const handlePrivateMessage = useCallback((msg: Message) => {
  //   setMessages((prevMessages) => {
  //     if (!prevMessages.some(m => m.id === msg.id)) {
  //       return [...prevMessages, msg];
  //     }
  //     return prevMessages;
  //   });
  // }, []);

    const handlePrivateMessage = useCallback((msg: Message) => {
    console.log("Message received:", msg);
    setMessages((prevMessages) => {
      if (!prevMessages.some(m => m.id === msg.id)) {
        console.log("Adding message:", msg);
        return [...prevMessages, msg];
      }
      return prevMessages;
    });
  }, []);

  useEffect(() => {
    if (!socket) return;

    console.log(userId, receiverId, "getting in socket");
    socket.emit('join', { userId, receiverId });

    socket.on('private message', handlePrivateMessage);

    return () => {
      socket.off('private message', handlePrivateMessage);
    };
  }, [socket, userId, receiverId, handlePrivateMessage]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (message && socket) {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: userId,
        receiverId: receiverId,
        message: message,
      };

      socket.emit('private message', newMessage);

      try {
        const response = await sendUserMsg(message, userId, receiverId, username);
        console.log(response, "res chat user");
      } catch (error) {
        console.error("Error sending message:", error);
      }

      setMessage('');
    }
  };

  // const handlePrivateMessage = useCallback((msg: Message) => {
  //   console.log("Message received:", msg);
  //   setMessages((prevMessages) => {
  //     if (!prevMessages.some(m => m.id === msg.id)) {
  //       console.log("Adding message:", msg);
  //       return [...prevMessages, msg];
  //     }
  //     return prevMessages;
  //   });
  // }, []);

  // useEffect(() => {
  //   if (!socket) {
  //     console.log("Creating socket connection...");
  //     const newSocket = io(SOCKET_SERVER_URL);
  //     setSocket(newSocket);

  //     newSocket.emit('join', { userId, receiverId });

  //     newSocket.on('private message', handlePrivateMessage);

  //     return () => {
  //       console.log("Cleaning up socket...");
  //       newSocket.off('private message', handlePrivateMessage);
  //       newSocket.disconnect();
  //     };
  //   }
  // }, [handlePrivateMessage, receiverId, socket, userId]);

  // const handleSubmit = async (e?: React.FormEvent) => {
  //   e?.preventDefault();

  //   if (message && socket) {
  //     const newMessage: Message = {
  //       id: Date.now().toString(),
  //       senderId: userId,
  //       receiverId: receiverId,
  //       message: message,
  //     };

  //     console.log("Sending message:", newMessage);
  //     socket.emit('private message', newMessage);

  //     setMessages(prevMessages => [...prevMessages, newMessage]);

  //     try {
  //       const response = await sendUserMsg(message, userId, receiverId, userInfo.name);
  //       console.log(response, "Message sent to server");
  //     } catch (error) {
  //       console.error("Error sending message:", error);
  //     }

  //     setMessage('');
  //   }
  // };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      backdrop="opaque"
      className="flex justify-end items-end p-4"
    >
      <ModalContent className="w-full max-w-sm h-[70vh] flex flex-col">
        <ModalHeader className="flex items-center gap-1 bg-gray-100 py-2 px-4 rounded-t-md">
          Chat
        </ModalHeader>
        <ModalBody className="flex-1 overflow-y-auto bg-white px-4 py-2">
          <ul className="space-y-4">
            {messages.map((msg) => (
              <li
                key={msg.id}
                className={`px-4 py-2 rounded-lg ${
                  msg.senderId === userId
                    ? 'bg-blue-500 text-white self-end'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p>{msg.message}</p>
              </li>
            ))}
          </ul>
        </ModalBody>
        <ModalFooter className="bg-gray-100 py-2 px-4 rounded-b-md flex">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 mr-2 p-2 rounded-lg border border-gray-300"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button color="primary" onClick={handleSubmit}>
            Send
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default React.memo(UserChatScreenModal);
