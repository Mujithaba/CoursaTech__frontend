import { useEffect, useState } from "react";
import { getUsers, userBlock, userUnblock } from "../../api/admin";
import { toast } from "react-toastify";

interface User {
  _id: string;
  name: string;
  email: string;
  isBlocked: boolean;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const getAllUsers = await getUsers();
        setUsers(getAllUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleBlock = async (userID: string, block: boolean) => {
    console.log(userID, "userID", block);
    if (block == false) {
      const response = await userBlock(userID);
      toast.success(response?.data, {
        position: "top-center",
      });
    }

    if (block == true) {
      const response2 = await userUnblock(userID);
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
            {users.map((user) => (
              <tr key={user._id}>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">
                  {user.isBlocked ? (
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                      onClick={() => handleBlock(user._id, user.isBlocked)}
                    >
                      Unblock
                      {/* {user.isBlocked ? 'Unblock' : 'Block'} */}
                    </button>
                  ) : (
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded"
                      onClick={() => handleBlock(user._id, user.isBlocked)}
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
  );
}
