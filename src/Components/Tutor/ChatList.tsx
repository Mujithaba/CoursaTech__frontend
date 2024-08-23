import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { storeMsgsFetching } from '../../api/tutor';

export interface IConversation {
    _id?:string;
    senderName:string;
    senderId:string;
    receiverId:string;
    lastMessage:string;
    updatedAt?:Date;
}


   const ChatList: React.FC = () => {
    const [conversation, setConversation] = useState<IConversation[]>([]);
   
    const { tutorInfo } = useSelector((state: RootState) => state.tutorAuth);
    const instructor_id = tutorInfo._id as string;

    useEffect(() => {
        fetchMsgs();
    }, []);

    const fetchMsgs = async () => {
        try {
          const response = await storeMsgsFetching(instructor_id);
          if (response && response.conversationLists) {
            setConversation(response.conversationLists);
          } else {
            console.error("Error fetching conversation data");
          }
        } catch (error) {
          console.error("Error fetching conversation data:", error);
        }
      };

    console.log(conversation,"converssss");
    

    const navigate = useNavigate();
    const handleViewChatScreen = (senderId:string,receiverId:string) => {
        navigate('viewChatScreen',{
          state:{
            senderId,
            receiverId
          }
        });
    };

    return (
        <div className="flex flex-col space-y-2 p-4">
            {conversation.map((user) => (
                <div key={user._id} className="flex items-center p-3 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 cursor-pointer transition duration-200"
                    onClick={()=>handleViewChatScreen(user.senderId,user.receiverId)}>
                    <img src='https://via.placeholder.com/150' alt={user.senderName} className="w-12 h-12 rounded-full mr-4 object-cover" />
                    <div className="flex-1">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold">{user.senderName}</h2>
                            
                            <span className="text-sm text-gray-500">{user.updatedAt?.toLocaleString()}</span>
                        </div>
                        <p className="text-gray-600 mt-1 truncate">{user.lastMessage}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChatList;
