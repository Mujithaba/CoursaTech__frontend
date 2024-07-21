

function Hearder() {
    return (
      <header className="bg-gray-800 text-black flex justify-between items-center p-4">
      <div className="text-xl font-bold"></div>
      <div className="flex items-center">
        <input 
          type="text" 
          placeholder="Search..." 
          className="bg-gray-200 text-black rounded-lg p-2 mr-4 focus:outline-none"
        />
        <button className="rounded-md bg-gray-800 p-2 focus:outline-none">
          <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6h18M3 12h18m-7 6h7"></path>
          </svg>
        </button>
      </div>
    </header>
    )
  }
  export default Hearder;