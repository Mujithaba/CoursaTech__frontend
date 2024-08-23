import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import io from 'socket.io-client'
import { useLocation } from 'react-router-dom';
import { sendUserMsg } from '../../api/user';

interface Message {
    senderId: string;
    receiver:string;
    message: string;
  }

const socket = io('http://localhost:3000/');

const ChatScreenUser: React.FC = () => {

    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);

    const location = useLocation();
    console.log('Location State:', location.state);
  
    const instructorId: string = location.state?.id;
    console.log(instructorId, "id instructor");
    
 
    const {userInfo} = useSelector((state:RootState)=>state.auth)
    const userId:string = userInfo._id as string
    const username:string = userInfo.name as string

    useEffect(()=>{
        socket.emit('join',{userId,instructorId});

        const handlePrivateMessage = (msg:Message) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
            console.log(msg,"msg");
            

          };

        socket.on('private message', handlePrivateMessage);

        return () => {
            socket.off('private message', handlePrivateMessage);
          };
    },[userId,instructorId])

    const handleSubmit = async(e:React.FormEvent) => {
        e.preventDefault();
        if (message) {

          socket.emit('private message', { message, userId, instructorId });
          const response = await sendUserMsg(message,userId,instructorId,username)
          console.log(response,"res chat user");
          
          setMessage('');
        }
      };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700/75">
    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
      <div className="h-[400px] overflow-y-auto flex flex-col-reverse justify-end items-center">
        <ul className="w-full space-y-2">
          {messages.map((msg) => (
            <li
              key={msg.senderId}
              className={`bg-gray-100 text-gray-800 px-4 py-2 rounded-lg ${
                msg.senderId === 'user' ? 'self-end' : ''
              }`}
            >
              <p>{msg.message}</p>
              {/* <p className="text-xs text-gray-500 mt-1">{msg.timestamp}</p> */}
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
  )
};

export default ChatScreenUser;




// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../redux/store';
// import io from 'socket.io-client'
// import { useLocation } from 'react-router-dom';
// import { sendUserMsg } from '../../api/user';

// interface Message {
//     senderId: string;
//     receiver:string;
//     message: string;
//   }

// const socket = io('http://localhost:3000');

// const ChatScreenUser: React.FC = () => {

//     const [message, setMessage] = useState<string>('');
//     const [messages, setMessages] = useState<Message[]>([]);

//     const location = useLocation();
//     console.log('Location State:', location.state);
  
//     const instructorId: string = location.state?.id;
//     console.log(instructorId, "id instructor");
    
 
//     const {userInfo} = useSelector((state:RootState)=>state.auth)
//     const userId:string = userInfo._id as string
//     const username:string = userInfo.name as string

//     useEffect(()=>{
//         socket.emit('join',{userId,instructorId});

//         const handlePrivateMessage = (msg:Message) => {
//             setMessages((prevMessages) => [...prevMessages, msg]);
//             console.log(msg,"msg");
            

//           };

//         socket.on('private message', handlePrivateMessage);

//         return () => {
//             socket.off('private message', handlePrivateMessage);
//           };
//     },[userId,instructorId])

//     const handleSubmit = async(e:React.FormEvent) => {
//         e.preventDefault();
//         if (message) {

//           socket.emit('private message', { message, userId, instructorId });
//           const response = await sendUserMsg(message,userId,instructorId,username)
//           console.log(response,"res chat user");
          
//           setMessage('');
//         }
//       };

//   return (
//     <div className='bg-red-400 h-[500px] '>
//     <div>
//       <ul>
//         {messages.map((msg, index) => (
//           <li key={index}>
//             <strong>{msg.senderId}:</strong> {msg.message}
//           </li>
//         ))}
//       </ul>
//     </div>
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={message}
//         className='m-7 '
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button type="submit">Send</button>
//     </form>
//   </div>
//   )
// };

// export default ChatScreenUser;
