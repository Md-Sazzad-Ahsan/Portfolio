"use client";

const ToggleSwitch = ({ checked, onChange }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input 
          type="checkbox" 
          checked={checked} 
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div 
          className={`w-14 h-5 bg-gray-300 rounded-full shadow-inner transition-colors duration-300 ${checked ? 'bg-gray-300' : 'bg-gray-700'}`}
        >
          <div 
            className={`absolute top-0 left-0 w-5 h-5 bg-white rounded-full shadow-inner stroke-white transition-transform duration-300 ${checked ? 'translate-x-8' : 'translate-x-0'}`}
          />
        </div>
      </div>
    </label>
  );
};

export default ToggleSwitch;
