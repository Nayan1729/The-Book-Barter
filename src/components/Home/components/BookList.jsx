import React from "react";
import { BookCard } from "./BookCard";
import { motion } from "framer-motion";

export function BookList({ books }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-amber-800 mb-2">No Books Found</h3>
        <p className="text-gray-600">Try adjusting your search criteria or location.</p>
      </div>
    );
  }

  return (
    <div>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {books.map((book) => (
          <motion.div key={book.id} variants={item}>
            <BookCard book={book} />
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
}
