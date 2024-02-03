import LeftAngleIcon from "../../Icons/LeftAngleIcon";
import RightAngleIcon from "../../Icons/RightAngleIcon";
import cn from "../../utils/cn";
import Button from "../UI/Button";

export default function ({
  limit,
  prev,
  next,
  page,
  totalItems,
  totalPage,
  handlePage,
  loading,
}) {
  return (
    <div className="py-6 bg-gray-50">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col items-center lg:flex-row lg:justify-between">
          <p className="text-sm font-medium text-gray-500">
            Showing {(page - 1) * limit + 1} to {page * limit} out of{" "}
            {totalItems} results
          </p>

          <nav className="relative mt-6 lg:mt-0 flex justify-end space-x-1.5">
            <Button
              disabled={!prev || loading}
              onClick={() => {
                if (prev && !loading) {
                  handlePage?.(page - 1);
                }
              }}
              className="px-3 py-2 font-bold text-gray-400 bg-white border-gray-200 focus:ring-gray-900 w-9 hover:bg-white"
            >
              <span className="sr-only"> Previous </span>
              <LeftAngleIcon />
            </Button>
            {new Array(totalPage || 0).fill(undefined).map((_, k) => (
              <Button
                key={k}
                title=""
                onClick={() => {
                  const current = k + 1;
                  if (page === current && loading) return;
                  handlePage?.(current);
                }}
                className={cn(
                  "px-3 py-2 font-bold text-gray-400 bg-white border-gray-200 focus:ring-gray-900 w-9 hover:bg-white",
                  {
                    ...(k + 1 === page
                      ? {
                          "bg-gray-100": true,
                          "border-gray-900": true,
                          "text-gray-900": true,
                        }
                      : {
                          "bg-white": true,
                          "border-gray-200": true,
                          "text-gray-400": true,
                        }),
                  }
                )}
              >
                {k + 1}
              </Button>
            ))}

            <Button
              disabled={!next || loading}
              onClick={() => {
                if (next) {
                  handlePage?.(page + 1);
                }
              }}
              className="px-3 py-3 font-bold text-gray-400 bg-white border-gray-200 focus:ring-gray-900 w-9 hover:bg-white"
            >
              <span className="sr-only"> Next </span>
              <RightAngleIcon />
            </Button>
            {/* <button
                title=""
                className="inline-flex items-center justify-center px-3 py-2 text-sm font-bold text-gray-400 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 w-9"
              >
                <span className="sr-only"> Next </span>
                <svg
                  className="flex-shrink-0 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
              </button> */}
          </nav>
        </div>
      </div>
    </div>
  );
}
