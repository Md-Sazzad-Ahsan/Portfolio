"use client";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

const ToggleSwitch = ({ checked, onChange }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input 
          type="checkbox" 
          checked={checked} 
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only mt-1"
        />
        <div 
          className={`w-12 h-5 rounded-full bg-gray-600 dark:bg-gray-100 shadow-inner transition-all duration-300 ${checked ? 'bg-gray-50' :''}`}
        >
          <div 
            className={`absolute top-0 left-0 w-5 h-5 bg-gray-100 dark:bg-gray-600 rounded-full shadow-inner transition-transform duration-300 ${checked ? 'translate-x-7' : 'translate-x-0'}`}
          >
            {/* Add icons to the toggle switch */}
            {checked ? (
              <MdDarkMode className="absolute inset-0 m-auto text-gray-800 dark:text-gray-200" />
            ) : (
              <CiLight className="absolute inset-0 m-auto text-gray-800 dark:text-gray-200" />
            )}
          </div>
        </div>
      </div>
    </label>
  );
};

export default ToggleSwitch;
