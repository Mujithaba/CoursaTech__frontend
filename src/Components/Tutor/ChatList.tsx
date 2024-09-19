import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { storeMsgsFetching } from '../../api/tutor';


export interface IConversation {
    _id?: string;
    senderName: string;
    senderId: string;
    receiverId: string;
    lastMessage: string;
    updatedAt?: string;
}

const ChatList: React.FC = () => {
    const [conversations, setConversations] = useState<IConversation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
   
    const { tutorInfo } = useSelector((state: RootState) => state.tutorAuth);
    const instructor_id = tutorInfo._id as string;

    const navigate = useNavigate();

    const fetchMsgs = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await storeMsgsFetching(instructor_id);
            if (response && response.conversationLists) {
                setConversations(response.conversationLists);
            } else {
                throw new Error("No conversation data received");
            }
        } catch (error) {
            console.error("Error fetching conversation data:", error);
            setError("Failed to load conversations. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }, [instructor_id]);

    useEffect(() => {
        fetchMsgs();
    }, [fetchMsgs]);

    

    const handleViewChatScreen = (senderId: string, receiverId: string,userName:string) => {
        navigate('viewChatScreen', {
            state: {
                senderId,
                receiverId,
                userName
            }
        });
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-full">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
        <div className="flex flex-col space-y-2 p-4">
            {conversations.length === 0 ? (
                <div className="text-center text-gray-500">No conversations yet</div>
            ) : (
                conversations.map((conversation) => (
                    <div 
                        key={conversation._id} 
                        className="flex items-center p-3 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 cursor-pointer transition duration-200"
                        onClick={() => handleViewChatScreen(conversation.senderId, conversation.receiverId,conversation.senderName)}
                    >
                        <img 
                            src='https://via.placeholder.com/150' 
                            alt={conversation.senderName} 
                            className="w-12 h-12 rounded-full mr-4 object-cover" 
                        />
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold">{conversation.senderName}</h2>
                                <span className="text-sm text-gray-500">
                                    {conversation.updatedAt ? new Date(conversation.updatedAt).toLocaleString() : ''}
                                </span>
                            </div>
                            <p className="text-gray-600 mt-1 truncate">{conversation.lastMessage}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ChatList;