import  { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getTutors, tutorBlock, tutorUnblock } from "../../api/admin";
import TableForm from "../Common/TableForm";
import { Tutor,TutorsResponse } from "../../services/types";
import Pagination from "../Common/Pagination";

export default function Tutors() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTutors,setTotalTutors] = useState(0);
  const itemsPerPage = 3

  const fetchTutors = async (page: number, limit: number) => {
    try {
      const {tutors,totalTutors}:TutorsResponse = await getTutors(page,limit);
      setTutors(tutors);
      setTotalTutors(totalTutors)
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchTutors(currentPage,itemsPerPage);
  }, [currentPage]);

  const handleBlock = async (tutorID: string, block: boolean) => {
    console.log(tutorID, "tutorID", block);
    if (block == false) {
      const response = await tutorBlock(tutorID);

      toast.info(response?.data, {
        position: "top-center",
        autoClose:1000,
        hideProgressBar:true,
        closeButton:false
      });
    }

    if (block == true) {
      const response2 = await tutorUnblock(tutorID);

      toast.success(response2?.data, {
        position: "top-center",
        autoClose:1000,
        hideProgressBar:true,
        closeButton:false

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
      <TableForm role="Instructor"
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





































// <div className="container mx-auto mt-8">
//   <h1 className="text-2xl font-bold mb-4 text-black">Instructors List</h1>
//   <div className="overflow-x-auto">
//     <table className="min-w-full bg-gray-400 border text-black border-gray-200">
//       <thead>
//         <tr>
//           <th className="py-2 px-4 border-b">Instructor Name</th>
//           <th className="py-2 px-4 border-b">Email</th>
//           <th className="py-2 px-4 border-b">Is Blocked</th>
//         </tr>
//       </thead>
//       <tbody>
//         {tutors.map((tutor) => (
//           <tr key={tutor._id}>
//             <td className="py-2 px-4 border-b">{tutor.name}</td>
//             <td className="py-2 px-4 border-b">{tutor.email}</td>
//             <td className="py-2 px-4 border-b">
//             {tutor.isBlocked ? (
//                 <button
//                   className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
//                   onClick={() => handleBlock(tutor._id, tutor.isBlocked)}
//                 >
//                   Unblock
//                   {/* {user.isBlocked ? 'Unblock' : 'Block'} */}
//                 </button>
//               ) : (
//                 <button
//                   className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded"
//                   onClick={() => handleBlock(tutor._id, tutor.isBlocked)}
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