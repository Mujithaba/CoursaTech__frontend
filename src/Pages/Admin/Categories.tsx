import { useEffect, useState } from "react";
import CategoryAdd from "../../Components/Admin/CategoryAdd";
import { Category, CategoryResponse } from "../../services/types";
import { categoryList, categoryUnlist, getCategory } from "../../api/admin";
import Pagination from "../../Components/Common/Pagination";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import EditModal from "../../Components/Ui/Category/EditModal";

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCategories, setTotalCategories] = useState(0);
  const itemsPerPage = 3;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<{
    id: string;
    name: string;
  } | null>(null);
  // edit category fun..
  const handleEditClick = (id: string, name: string) => {
    setCurrentCategory({ id, name });
    setIsModalVisible(true);
  };
  // category modal close button fun...
  const handleClose = async () => {
    setIsModalVisible(false);
    setCurrentCategory(null);
  };
  // updated category save
  const handleSave = async () => {
    if (currentCategory) {
      try {
        await fetchCategories(currentPage, itemsPerPage);
        setCurrentCategory(null);
        setIsModalVisible(false);
      } catch (error) {
        console.log("Error saving the category");
      }
    }
  };

  // fetch the category
  const fetchCategories = async (page: number, limit: number) => {
    try {
      const { categories, totalCategory }: CategoryResponse = await getCategory(
        page,
        limit
      );
      setCategories(categories);
      setTotalCategories(totalCategory);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    fetchCategories(currentPage, itemsPerPage);
  }, [currentPage]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // category add change
  const handleCategoryAdd = async () => {
    await fetchCategories(currentPage, itemsPerPage);
  };

  // listing function
  const handleList = async (categoryID: string, list: boolean) => {
    console.log(categoryID, "userID", list);

    if (list == false) {
      const response = await categoryList(categoryID);
      toast.success(response?.data, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
      });
    }
    if (list == true) {
      const response2 = await categoryUnlist(categoryID);
      toast.success(response2?.data, {
        autoClose: 1000,
        hideProgressBar: true,
        position: "top-center",
      });
    }
    setCategories((prevCategory) =>
      prevCategory.map((category) =>
        category._id === categoryID
          ? { ...category, is_listed: !list }
          : category
      )
    );
  };

  return (
    <>
      <div>
        <div className="flex justify-start ms-32 mt-5">
          <CategoryAdd onCategoryAdded={handleCategoryAdd} />
        </div>

        <div className="p-6 max-w-4xl mx-auto">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead className="bg-gray-200 border-b border-gray-300">
                <tr>
                  <th className="py-3  px-12 text-left text-gray-600 font-semibold">
                    Category Name
                  </th>
                  <th className="py-3 px-6 text-left text-gray-600 font-semibold">
                    Is Listed
                  </th>
                  <th className="py-3 px-6 text-left text-gray-600 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((item) => (
                  <tr key={item._id} className="border-b border-gray-200">
                    <td className="py-3 px-3 font-mono font-semibold text-gray-800">
                      <div className="flex items-center">
                      {/* <MdDeleteForever size={19} className="text-black hover:text-red-800 cursor-pointer" /> */}
                        <p
                          className="ms-2 me-3 cursor-pointer"
                          onClick={() =>
                            handleEditClick(item._id, item.categoryName)
                          }
                        >
                          <FaEdit size={16} className="text-red-800" />
                        </p>

                        {item.categoryName}
                      </div>
                    </td>

                    <td className="py-3 px-6">
                      {item.is_listed ? (
                        <p className="text-green-500  font-sans">Listed</p>
                      ) : (
                        <p className="text-red-500  font-sans">Not Listed</p>
                      )}
                    </td>
                    <td className="py-3 px-6">
                      {item.is_listed ? (
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold   py-1 px-1 rounded-sm"
                          onClick={() => handleList(item._id, item.is_listed)}
                        >
                          Unlist
                        </button>
                      ) : (
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white font-semibold  text-xs py-1 px-3 rounded-sm"
                          onClick={() => handleList(item._id, item.is_listed)}
                        >
                          List
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {currentCategory && (
            <EditModal
              visible={isModalVisible}
              onClose={handleClose}
              categoryName={currentCategory.name}
              categoryId={currentCategory.id}
              handleSave={handleSave}
            />
          )}
        </div>

        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={totalCategories}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}
