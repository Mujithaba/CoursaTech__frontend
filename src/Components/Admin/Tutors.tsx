import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getTutors, tutorBlock, tutorUnblock } from "../../api/admin";
import TableForm from "../Common/TableForm";
import { Tutor, TutorsResponse } from "../../services/types";
import Pagination from "../Common/Pagination";

export default function Tutors() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTutors, setTotalTutors] = useState(0);
  const itemsPerPage = 3;

  const fetchTutors = async (page: number, limit: number) => {
    try {
      const { tutors, totalTutors }: TutorsResponse = await getTutors(
        page,
        limit
      );
      setTutors(tutors);
      setTotalTutors(totalTutors);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchTutors(currentPage, itemsPerPage);
  }, [currentPage]);

  const handleBlock = async (tutorID: string, block: boolean) => {
    console.log(tutorID, "tutorID", block);
    if (block == false) {
      const response = await tutorBlock(tutorID);

      toast.info(response?.data, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeButton: false,
      });
    }

    if (block == true) {
      const response2 = await tutorUnblock(tutorID);

      toast.success(response2?.data, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeButton: false,
      });
    }
    setTutors((prevTutors) =>
      prevTutors.map((tutor) =>
        tutor._id === tutorID ? { ...tutor, isBlocked: !block } : tutor
      )
    );
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <TableForm
        role="Instructor"
        data={tutors}
        headers={["Instructor Name", "Email", "Is Blocked"]}
        handleAction={handleBlock}
      />

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={totalTutors}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}
