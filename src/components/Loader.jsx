import React from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <motion.div
        className="flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        >
          <BookOpen className="h-16 w-16 text-amber-800" />
        </motion.div>
        <p className="mt-4 text-amber-900 text-lg font-medium">Loading...</p>
      </motion.div>
    </div>
  );
}
