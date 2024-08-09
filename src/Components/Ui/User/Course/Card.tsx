

export default function CardUi() {
 
  return (
    <div className="flex m-4 bg-gray-700 rounded-lg ">

    <div className="relative max-w-xl bg-card shadow-lg rounded-lg overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        
        <div className="p-4">
          <img 
            src="https://nextui.org/images/album-cover.png" 
            alt="Course Cover"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        
        <div className="p-6 flex flex-col justify-center rounded-md  ">
          <h1 className="text-2xl font-semibold mb-4">Courses</h1>
          <ul className="">
            <li className="text-lg text-gray-800">Course 1</li>
            <li className="text-lg text-gray-800">Course 2</li>
            <li className="text-lg text-gray-800">Course 3</li>
            <li className="text-lg text-gray-800">Course 4</li>
          </ul>
        </div>
        
      </div>
    </div>
  
  </div>
  
  );
}

