import { useEffect, useState } from "react";
import { getUsers, userBlock, userUnblock } from "../../api/admin";
import { toast } from "react-toastify";
import TableForm from "../Common/TableForm";
import { User, UsersResponse } from "../../services/types";
import Pagination from "../Common/Pagination";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const itemsPerPage = 3;

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
      toast.info(response?.data, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeButton: false,
      });
    }

    if (block == true) {
      const response2 = await userUnblock(userID);
      toast.success(response2?.data, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeButton: false,
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
      <TableForm
        role="User"
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
