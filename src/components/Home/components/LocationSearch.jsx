import React, { useState } from "react";
import { Input , Button , Label , Slider } from "../../index";
import { MapPin, Navigation } from "lucide-react";
import { motion } from "framer-motion";

export function LocationSearch({ locationQuery, setLocationQuery, searchRadius, setSearchRadius, onSearch, userLocation }) {
  const [isUsingCurrentLocation, setIsUsingCurrentLocation] = useState(true);

  const handleUseMyLocation = () => {
    setLocationQuery("");
    setIsUsingCurrentLocation(true);
  };
  

  const handleLocationInputChange = (e) => {
    setLocationQuery(e.target.value);
    setIsUsingCurrentLocation(false);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          placeholder="Enter location..."
          value={locationQuery}
          onChange={handleLocationInputChange}
          className="pl-10 border-amber-200 focus:border-amber-500"
        />
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        {userLocation && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleUseMyLocation}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 text-amber-700 hover:text-amber-900 hover:bg-amber-50 cursor-pointer"
          >
            <Navigation className="h-3 w-3 mr-1 " />
            {isUsingCurrentLocation ? "Using your location" : "Use my location"}
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label className="text-sm text-gray-600">Search Radius: {searchRadius} km</Label>
        </div>
        <Slider value={[searchRadius]} step={1}  onChange={setSearchRadius}  className="py-4 cursor-pointer" />
        <div className="flex justify-between text-xs text-gray-500">
          <span>1 km</span>
          <span>25 km</span>
          <span>50 km</span>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center">
        <Button onClick={onSearch} className="w-full bg-amber-800 hover:bg-amber-900 text-white cursor-pointer">
          Find Books
        </Button>
      </motion.div>
    </div>
  );
}
