import cn from "../utils/cn";

export default function DownAngleIcon({ className, ...props }) {
  return (
    <svg
      className={cn(
        "w-4 h-6 ml-auto text-gray-400 group-hover:text-white",
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
