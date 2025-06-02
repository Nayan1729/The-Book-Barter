import React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

const Slider = ({ value, onChange, min = 1, max = 50, step = 1, className }) => {
  return (
    <SliderPrimitive.Root
      className={`relative flex w-full items-center ${className}`}
      value={[value]}
      onValueChange={(val) => onChange(val[0])}
      min={min}
      max={max}
      step={step}
    >
      <SliderPrimitive.Track className="relative h-2 w-full rounded-full bg-gray-300">
        <SliderPrimitive.Range className="absolute h-full bg-amber-700" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-amber-700 bg-white transition focus:ring-2 focus:ring-amber-800" />
    </SliderPrimitive.Root>
  );
};

export default Slider;
