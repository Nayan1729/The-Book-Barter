import React from "react";
import { Card, CardContent, CardFooter } from "../../Card";
import { Badge } from "../../Badge";
import { MapPin, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function BookCard({ book }) {
  {console.log(book.imageUrls[0])}
  return (
    <Link to={`/books/${book.id}`}>
      <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
        <Card className="h-full overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
          <div className="relative h-48 overflow-hidden bg-amber-100">
            <img
              src={book.imageUrls && book.imageUrls[0]  || "/placeholder.svg"}
              alt={book.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
            <div className="absolute top-2 right-2">
              <Badge
                className={`
                  ${
                    book.status === "LISTED"
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                  }
                `}
              >
                {book.status}
              </Badge>
            </div>
          </div>

          <CardContent className="p-4">
            <h3 className="font-medium text-lg text-amber-900 line-clamp-1">{book.title}</h3>
            <p className="text-gray-600 text-sm mb-2">by {book.author}</p>

            <div className="flex items-center text-xs text-gray-500 mb-2">
              <BookOpen className="h-3 w-3 mr-1" />
              <span>{book.genre}</span>
              <span className="mx-1">•</span>
              <span>{book.condition}</span>
            </div>

            <p className="text-gray-700 text-sm line-clamp-2 mb-2">{book.description}</p>
          </CardContent>

          <CardFooter className="px-4 py-3 bg-amber-50 text-xs text-gray-600 flex items-center">
            <MapPin className="h-3 w-3 mr-1 text-amber-700" />
            <span className="truncate">{book.location}</span>
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  );
}
