import React from 'react'


interface Item {
    _id: string;
    name: string;
    email: string;
    isBlocked: boolean;
  }
  
  interface ReusableTableProps {
    data: Item[];
    headers: string[];
    handleAction: (id: string, isBlocked: boolean) => void;
    role:string
  }
   


const TableForm: React.FC<ReusableTableProps> = ({role, data, headers, handleAction }) => {
    return (
      <div className="container mx-auto mt-8 p-4 bg-white shadow rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">{role} List</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                {headers.map((header) => (
                  <th key={header} className="py-3 px-6 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
                {/* <th className="py-3 px-6 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Action</th> */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 text-sm text-gray-700">{item.name}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{item.email}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {item.isBlocked ? (
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
                        onClick={() => handleAction(item._id, item.isBlocked)}
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded"
                        onClick={() => handleAction(item._id, item.isBlocked)}
                      >
                        Block
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
export default TableForm