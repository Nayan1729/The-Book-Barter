import { useState, useEffect } from "react";
import { useNavigate , useParams } from "react-router-dom";
import { Button , Badge } from "../../index";
import { Card, CardContent } from "../../Card";
import { toast } from "react-toastify";
import { ArrowLeft, MapPin, BookOpen, User, Building, Calendar, Languages, Tag, Info } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/Dailog";
import { motion } from "framer-motion";
import axios from "axios";
import { getBookDetailsApi } from "../../../apiEndPoints";

export default function BookDetailsComponent() {
  const {bookId} = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tradeDialogOpen, setTradeDialogOpen] = useState(false);
  const [selectedBookForTrade, setSelectedBookForTrade] = useState(null);

  
  useEffect(() => {
    const fetchBook = async () => {
      
      setLoading(true);
      const res = await getBookDetailsApi(bookId)
      if(res.statusCode == 200){
        setBook(res.data)
      }else{
        toast.error(res.message)
      }
      setLoading(false);
    };

    if (bookId) {
      fetchBook();
    }
  }, []);

  const handleTradeRequest = () => {
    if (!selectedBookForTrade) {
      toast.error("Book not found")
      return;
    }

    toast.success( "Trade Request Sent");

    setTradeDialogOpen(false);
    setSelectedBookForTrade(null);


    setTimeout(() => {
      navigate("/profile?tab=pending");
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex justify-center items-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-32 w-24 bg-amber-200 rounded mb-4"></div>
          <div className="h-6 w-48 bg-amber-200 rounded mb-2"></div>
          <div className="h-4 w-32 bg-amber-100 rounded"></div>
        </div>
      </div>
    );
  }
  console.log(loading);
  
  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex justify-center items-center">
        <Card className="max-w-md p-6 text-center">
          <h1 className="text-2xl font-bold text-amber-800 mb-4">Book Not Found</h1>
          <p className="text-gray-600 mb-6">
            The book you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/">
            <Button className="bg-amber-800 hover:bg-amber-900 text-white">
              Return to Home
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12">
      <div className="container mx-auto px-4">
        <Link
          to="/"
          className="inline-flex items-center text-amber-800 hover:text-amber-600 mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Books
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column with book image and trade button */}
          <div className="md:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                <div className="p-4 bg-amber-800 text-white text-center">
                  <Badge className="bg-white text-amber-800 hover:bg-amber-100">{book.status}</Badge>
                </div>
                <div className="p-6 flex justify-center">
                  <motion.img
                    src={book.imageUrls && book.imageUrls[0] || "/placeholder.svg"}
                    alt={book.title}
                    className="max-w-full h-auto rounded shadow-md"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                  />
                </div>
                <div className="p-4 border-t border-amber-100">
                  <Dialog open={tradeDialogOpen} onOpenChange={setTradeDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        className="w-full bg-amber-800 hover:bg-amber-900 text-white"
                        disabled={book.status !== "Available"}
                        onClick={() => setTradeDialogOpen(true)}
                      >
                        {book.status === "LISTED" ? "Trade This Book" : "Currently Unavailable"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-serif text-amber-900">
                          Trade Your Book
                        </DialogTitle>
                        <DialogDescription>
                          Select one of your books to trade for "{book.title}" by {book.author}.
                        </DialogDescription>
                      </DialogHeader>

                      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 max-h-[400px] overflow-y-auto p-2">
                        {userBooks.map((userBook) => (
                          <motion.div
                            key={userBook.id}
                            whileHover={{ scale: 1.03 }}
                            className={`
                              relative rounded-lg overflow-hidden border-2 cursor-pointer
                              ${selectedBookForTrade === userBook.id ? "border-amber-600" : "border-transparent"}
                            `}
                            onClick={() => setSelectedBookForTrade(userBook.id)}
                          >
                            <div className="aspect-[2/3] relative">
                              <img
                                src={userBook.imageUrls && userBook.imageUrls[0] || "/placeholder.svg"}
                                alt={userBook.title}
                                className="w-full h-full object-cover"
                              />
                              {selectedBookForTrade === userBook.id && (
                                <div className="absolute inset-0 bg-amber-800 bg-opacity-30 flex items-center justify-center">
                                  <div className="bg-white rounded-full p-2">
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M20 6L9 17L4 12"
                                        stroke="#92400e"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="p-2 bg-white">
                              <h3 className="font-medium text-sm truncate">{userBook.title}</h3>
                              <p className="text-xs text-gray-600 truncate">by {userBook.author}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div> */}

                      <div className="flex justify-end space-x-4 mt-4">
                        <Button
                          variant="outline"
                          onClick={() => setTradeDialogOpen(false)}
                          className="border-amber-800 text-amber-800"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleTradeRequest}
                          className="bg-amber-800 hover:bg-amber-900 text-white"
                          disabled={!selectedBookForTrade}
                        >
                          Request Trade
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>

          {/* Right column with book details */}
          <div className="md:col-span-2">
            <Card className="shadow-lg transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-6">
                <h1 className="text-3xl font-serif font-bold text-amber-900 mb-2">{book.title}</h1>
                <div className="flex items-center text-amber-700 mb-4">
                  <User className="h-4 w-4 mr-1" />
                  <span className="font-medium">By {book.author}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start">
                    <Building className="h-4 w-4 mr-2 mt-1 text-amber-600" />
                    <div>
                      <p className="text-sm text-gray-500">Publisher</p>
                      <p>{book.publisher}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="h-4 w-4 mr-2 mt-1 text-amber-600" />
                    <div>
                      <p className="text-sm text-gray-500">Listed Date</p>
                      <p>{new Date(book.listedDateTime   || "").toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Tag className="h-4 w-4 mr-2 mt-1 text-amber-600" />
                    <div>
                      <p className="text-sm text-gray-500">Genre</p>
                      <p>{book.genre}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Languages className="h-4 w-4 mr-2 mt-1 text-amber-600" />
                    <div>
                      <p className="text-sm text-gray-500">Language</p>
                      <p>{book.language}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Info className="h-4 w-4 mr-2 mt-1 text-amber-600" />
                    <div>
                      <p className="text-sm text-gray-500">Condition</p>
                      <p>{book.bookcondition}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 mr-2 mt-1 text-amber-600" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p>{book.location}</p>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <h2 className="text-xl font-medium text-amber-800 mb-2 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    About This Book
                  </h2>
                  <p className="text-gray-700 leading-relaxed">{book.description}</p>
                </div>
                <div className="border-t border-amber-100 pt-4">
                  <h2 className="text-xl font-medium text-amber-800 mb-2">Location</h2>
                  <div className="bg-amber-50 rounded-lg p-4 text-center">
                    <p className="text-amber-800">This book is available at {book.location}</p>
                    <p className="text-sm text-gray-500">
                      Coordinates: {book.latitude.toFixed(6)}, {book.longitude.toFixed(6)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
