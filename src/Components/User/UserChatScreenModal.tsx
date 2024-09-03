import { useEffect, useState, useRef, ChangeEvent, FormEvent } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import io, { Socket } from "socket.io-client";
import { sendUserMsg } from "../../api/user";

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
        // Check if the message is already in the list
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

  // const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
  //   setMessage(e.target.value);
  // };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes()}`;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      backdrop="opaque"
      className="flex justify-end items-end p-4"
    >
      <ModalContent className="w-full max-w-sm h-[70vh] flex flex-col">
        <ModalHeader className="bg-gray-100 py-2 px-4 rounded-t-md">
          Chat
        </ModalHeader>
        <ModalBody className="flex-1 overflow-y-auto bg-white px-4 py-2">
          <ul className="space-y-4">
            {messages.map((msg) => (
              <li
                key={msg.id}
                className={`flex ${
                  msg.senderId === userId ? "justify-end" : "justify-start"
                }`}
              >
                {/* <div
                  className={`px-4 py-2 rounded-lg ${
                    msg.senderId === userId
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  } max-w-xs`}
                >
                  <p className="font-mono">{msg.message}</p>
                  <span className="text-xs text-black">
                    {formatTimestamp(msg.timestamp)}
                  </span>
                </div> */}
                <div className={`chat chat-end max-w-xs`}>
                  <div className="chat-header">
                    Instructor
                  </div>
                  <div className="chat-bubble">{msg.message}</div>
                    <time className="text-xs opacity-50">{formatTimestamp(msg.timestamp)}</time>
                  <div className="chat-footer opacity-50">Seen</div>
                </div>
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

export default UserChatScreenModal;
