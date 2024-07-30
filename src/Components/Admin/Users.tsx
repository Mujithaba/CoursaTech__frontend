import { useEffect, useState } from "react";
import { getUsers, userBlock, userUnblock } from "../../api/admin";
import { toast } from "react-toastify";
import TableForm from "../Common/TableForm";
import { User,UsersResponse } from "../../services/types";
import Pagination from "../Common/Pagination";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers,setTotalUsers] = useState(0);
  const itemsPerPage = 3

  const fetchUsers = async (page: number, limit: number) => {
    try {
      const { users, totalUsers }: UsersResponse = await getUsers(page, limit);
      setUsers(users);
      setTotalUsers(totalUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage, itemsPerPage);
  }, [currentPage]);

  // blocking function
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

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userID ? { ...user, isBlocked: !block } : user
      )
    );
  };


  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <TableForm role="User"
        data={users}
        headers={["User Name", "Email", "Is Blocked"]}
        handleAction={handleBlock}
      />


<Pagination
        itemsPerPage={itemsPerPage}
        totalItems={totalUsers}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

// <div className="container mx-auto mt-8">
//   <h1 className="text-2xl font-bold mb-4 text-black">Users List</h1>
//   <div className="overflow-x-auto">
//     <table className="min-w-full bg-gray-400 border text-black rounded-md border-gray-200">
//       <thead>
//         <tr>
//           <th className="py-2 px-4 border-b">User Name</th>
//           <th className="py-2 px-4 border-b">Email</th>
//           <th className="py-2 px-4 border-b">Is Blocked</th>
//         </tr>
//       </thead>
//       <tbody>
//         {users.map((user) => (
//           <tr key={user._id}>
//             <td className="py-2 px-4 border-b">{user.name}</td>
//             <td className="py-2 px-4 border-b">{user.email}</td>
//             <td className="py-2 px-4 border-b">
//               {user.isBlocked ? (
//                 <button
//                   className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
//                   onClick={() => handleBlock(user._id, user.isBlocked)}
//                 >
//                   Unblock
//                   {/* {user.isBlocked ? 'Unblock' : 'Block'} */}
//                 </button>
//               ) : (
//                 <button
//                   className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded"
//                   onClick={() => handleBlock(user._id, user.isBlocked)}
//                 >
//                   Block
//                   {/* {user.isBlocked ? 'Unblock' : 'Block'} */}
//                 </button>
//               )}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// </div>