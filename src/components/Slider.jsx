import React, { useState } from "react";

const Slider = () => {
  const [radius, setRadius] = useState(10); // Default radius value

  return (
    <div className="p-4">
      <label className="block text-gray-700 font-medium mb-2">
        Search Radius: {radius} km
      </label>
      <input
        type="range"
        min="1"
        max="50"
        step="1"
        value={radius}
        onChange={(e) => setRadius(e.target.value)}
        className="w-full accent-[#914C1E]"
      />
    </div>
  );
};

export default Slider;
