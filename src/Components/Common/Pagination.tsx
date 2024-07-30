
interface PaginationProps {
    itemsPerPage: number;
    totalItems: number;
    paginate: (pageNumber: number) => void;
    currentPage: number;
  }

  const Pagination: React.FC<PaginationProps> = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav>
        <ul className="flex justify-center  mt-4">
          {pageNumbers.map(number => (
            <li key={number} className={`mx-1 ${currentPage === number ? 'font-bold' : ''}`}>
              <button
                onClick={() => paginate(number)}
                className={`px-3 py-1 rounded ${currentPage === number ? 'bg-gray-900 text-white' : 'bg-gray-300 text-black'}`}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  };
  
  export default Pagination;
  
