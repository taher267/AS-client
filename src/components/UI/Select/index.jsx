const Select = () => {
  return (
    <div className="py-8 bg-white">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-xl mx-auto">
          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-gray-600"
            >
              What kind of service do you need?
            </label>
            <div className="relative mt-2">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <select className="block w-full py-3 pl-12 pr-10 border-gray-300 border rounded-lg focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm">
                <option>Select a service</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Select;
