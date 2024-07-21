import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { getTutors, tutorBlock, tutorUnblock } from '../../api/admin';

interface Tutor {
    _id: string;
    name: string;
    email: string;
    isBlocked: boolean;
  }
  

export default function Tutors() {

    const [ tutors, setTutors]= useState<Tutor[]>([])

    useEffect(() => {
        const fetchTutors = async () => {
          try {
            const getAllTutors= await getTutors();
            setTutors(getAllTutors);
          } catch (error) {
            console.error("Error fetching users:", error);
          }
        };
        fetchTutors();
      }, []);


      const handleBlock = async (tutorID: string, block: boolean) => {
        console.log(tutorID, "tutorID", block);
        if (block == false) {
          const response = await tutorBlock(tutorID);
          toast.success(response?.data, {
            position: "top-center",
          });
        }
    
        if (block == true) {
          const response2 = await tutorUnblock(tutorID);
          toast.success(response2?.data, {
            position: "top-center",
          });
        }
      };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-400 border text-black border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">User Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Is Blocked</th>
            </tr>
          </thead>
          <tbody>
            {tutors.map((tutor) => (
              <tr key={tutor._id}>
                <td className="py-2 px-4 border-b">{tutor.name}</td>
                <td className="py-2 px-4 border-b">{tutor.email}</td>
                <td className="py-2 px-4 border-b">
                {tutor.isBlocked ? (
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                      onClick={() => handleBlock(tutor._id, tutor.isBlocked)}
                    >
                      Unblock
                      {/* {user.isBlocked ? 'Unblock' : 'Block'} */}
                    </button>
                  ) : (
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded"
                      onClick={() => handleBlock(tutor._id, tutor.isBlocked)}
                    >
                      Block
                      {/* {user.isBlocked ? 'Unblock' : 'Block'} */}
                    </button>
                  )}
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
