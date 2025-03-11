import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../Tabs"
import { Button } from "../../index"
import { Card, CardContent } from "../../Card"
import { Avatar, AvatarFallback, AvatarImage } from "../../Avatar"
import { Badge } from "../../Badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../Dialog"
import { ArrowLeft, Edit, Mail, MapPin, Phone, BookOpen, Check, Clock, Plus, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"
import { dummyBooks, userBooks } from "../../../utils/DummyBooks"
import { useNavigate , Link } from "react-router-dom"

// Sample user data
const user = {
  id: "u1",
  name: "Jamie Bookman",
  email: "jamie.bookman@example.com",
  phone: "+1 (555) 123-4567",
  location: "New York, NY",
  bio: "Avid reader with a passion for fantasy and science fiction. Always looking to discover new worlds through books!",
  avatar: "/placeholder.svg?height=200&width=200&text=JB",
  memberSince: "January 2023",
  booksListed: userBooks.length,
  tradesCompleted: 7,
}

// Sample trade data
const acceptedTrades = [
  {
    id: "t1",
    date: "2023-12-15",
    status: "Accepted",
    bookGiven: userBooks[0],
    bookReceived: dummyBooks[2],
  },
  {
    id: "t2",
    date: "2023-11-28",
    status: "Accepted",
    bookGiven: userBooks[1],
    bookReceived: dummyBooks[4],
  },
  {
    id: "t3",
    date: "2023-10-05",
    status: "Accepted",
    bookGiven: userBooks[2],
    bookReceived: dummyBooks[9],
  },
]

const pendingTrades = [
  {
    id: "t4",
    date: "2023-12-28",
    status: "Pending",
    bookGiven: userBooks[2],
    bookReceived: dummyBooks[0],
  },
  {
    id: "t5",
    date: "2023-12-27",
    status: "Pending",
    bookGiven: userBooks[0],
    bookReceived: dummyBooks[7],
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
}

export default function ProfilePage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("accepted")
  const [isNewTradeOpen, setIsNewTradeOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredBooks, setFilteredBooks] = useState([])
  const [selectedBookToTrade, setSelectedBookToTrade] = useState<string | null>(null)
  const [isTradeConfirmOpen, setIsTradeConfirmOpen] = useState(false)

  // Filter books based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredBooks(dummyBooks.filter((book) => book.status === "Available"))
    } else {
      const query = searchQuery.toLowerCase()
      setFilteredBooks(
        dummyBooks.filter(
          (book) =>
            book.status === "Available" &&
            (book.title.toLowerCase().includes(query) ||
              book.author.toLowerCase().includes(query) ||
              book.genre.toLowerCase().includes(query)),
        ),
      )
    }
  }, [searchQuery])

  const handleInitiateTrade = (book) => {
    setSelectedBook(book)
    setIsNewTradeOpen(false)
    setIsTradeConfirmOpen(true)
  }

  const handleConfirmTrade = () => {
    if (!selectedBook || !selectedBookToTrade) return

    // In a real app, this would send the trade request to the backend
    // For now, we'll just close the dialog and show a success message
    setIsTradeConfirmOpen(false)

    // Add the new pending trade to the list (in a real app, this would come from the backend)
    const newTrade = {
      id: `t${pendingTrades.length + 6}`,
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
      bookGiven: userBooks.find((b) => b.id === selectedBookToTrade) || userBooks[0],
      bookReceived: selectedBook,
    }

    // Reset state
    setSelectedBook(null)
    setSelectedBookToTrade(null)

    // Show success message and redirect to pending trades tab
    setActiveTab("pending")

    // In a real app, you would refresh the trades from the backend
    // For now, we'll just simulate it
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center text-amber-800 hover:text-amber-600 mb-6 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        {/* Profile Header */}
        <div className="mb-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="shadow-lg overflow-hidden">
              <div className="bg-amber-800 h-40 relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-4 right-4 text-white hover:bg-amber-700"
                  onClick={() => navigate("/profile/edit")}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>

              <CardContent className="p-6 relative">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center md:items-start">
                    <Avatar className="h-32 w-32 border-4 border-white absolute -top-16 left-6 shadow-md">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-amber-200 text-amber-800 text-xl">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="mt-20 md:mt-16 md:ml-2 flex flex-col items-center md:items-start">
                      <div className="flex flex-col md:flex-row md:items-center gap-2">
                        <h1 className="text-2xl font-bold text-amber-900">{user.name}</h1>
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 self-center md:self-auto">
                          Book Lover
                        </Badge>
                      </div>
                      <p className="text-gray-500 mt-1">Member since {user.memberSince}</p>

                      <p className="mt-4 text-gray-700 max-w-xl text-center md:text-left">{user.bio}</p>
                    </div>
                  </div>

                  <div className="flex-grow flex flex-col md:items-end md:mt-16 gap-2">
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-4 w-4 mr-2 text-amber-700" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-2 text-amber-700" />
                      <span>{user.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-amber-700" />
                      <span>{user.location}</span>
                    </div>

                    <div className="flex gap-4 mt-4 text-center">
                      <div className="p-3 bg-amber-50 rounded-lg">
                        <p className="text-2xl font-bold text-amber-800">{user.booksListed}</p>
                        <p className="text-xs text-gray-600">Books Listed</p>
                      </div>
                      <div className="p-3 bg-amber-50 rounded-lg">
                        <p className="text-2xl font-bold text-amber-800">{user.tradesCompleted}</p>
                        <p className="text-xs text-gray-600">Trades Completed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Trade History Tabs */}
        <Tabs defaultValue="accepted" value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-medium text-amber-800">Trade History</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <TabsList className="bg-amber-100">
                <TabsTrigger
                  value="accepted"
                  className="data-[state=active]:bg-amber-800 data-[state=active]:text-white"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Accepted Trades
                </TabsTrigger>
                <TabsTrigger
                  value="pending"
                  className="data-[state=active]:bg-amber-800 data-[state=active]:text-white"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Pending Trades
                </TabsTrigger>
              </TabsList>

              <Dialog open={isNewTradeOpen} onOpenChange={setIsNewTradeOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-amber-800 hover:bg-amber-900 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    New Trade
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-serif text-amber-900">Find Books to Trade</DialogTitle>
                    <DialogDescription>Browse available books and initiate a trade request.</DialogDescription>
                  </DialogHeader>

                  <div className="mt-4">
                    <div className="relative mb-4">
                      <input
                        type="text"
                        placeholder="Search by title, author, or genre..."
                        className="w-full p-2 pl-10 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <svg
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto p-2">
                      {filteredBooks.length > 0 ? (
                        filteredBooks.map((book) => (
                          <motion.div
                            key={book.id}
                            whileHover={{ scale: 1.03 }}
                            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                            onClick={() => handleInitiateTrade(book)}
                          >
                            <div className="flex p-3">
                              <div className="w-16 h-24 bg-amber-50 rounded overflow-hidden mr-3">
                                <img
                                  src={book.coverImage || "/placeholder.svg"}
                                  alt={book.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-amber-900 line-clamp-1">{book.title}</h4>
                                <p className="text-sm text-gray-600 line-clamp-1">by {book.author}</p>
                                <div className="flex items-center text-xs text-gray-500 mt-1">
                                  <BookOpen className="h-3 w-3 mr-1" />
                                  <span>{book.genre}</span>
                                </div>
                                <div className="mt-2">
                                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Available</Badge>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="col-span-2 text-center py-8">
                          <RefreshCw className="h-8 w-8 mx-auto text-amber-300 mb-2" />
                          <p className="text-gray-600">No books found matching your search.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Trade Confirmation Dialog */}
              <Dialog open={isTradeConfirmOpen} onOpenChange={setIsTradeConfirmOpen}>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-serif text-amber-900">Confirm Trade Request</DialogTitle>
                    <DialogDescription>
                      Select one of your books to trade for "{selectedBook?.title}" by {selectedBook?.author}.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Book You'll Receive:</h3>
                      <div className="border rounded-lg overflow-hidden p-4 bg-amber-50">
                        <div className="flex justify-center mb-3">
                          <div className="w-24 h-36 bg-white rounded overflow-hidden shadow-md">
                            <img
                              src={selectedBook?.coverImage || "/placeholder.svg"}
                              alt={selectedBook?.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <h4 className="font-medium text-amber-900 text-center">{selectedBook?.title}</h4>
                        <p className="text-sm text-gray-600 text-center">by {selectedBook?.author}</p>
                        <div className="flex justify-center items-center text-xs text-gray-500 mt-2">
                          <BookOpen className="h-3 w-3 mr-1" />
                          <span>{selectedBook?.genre}</span>
                          <span className="mx-1">•</span>
                          <span>{selectedBook?.condition}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Book You'll Trade:</h3>
                      <div className="grid grid-cols-1 gap-3 max-h-[250px] overflow-y-auto p-1">
                        {userBooks.map((userBook) => (
                          <motion.div
                            key={userBook.id}
                            whileHover={{ scale: 1.02 }}
                            className={`
                              relative rounded-lg overflow-hidden border cursor-pointer p-3 flex items-center
                              ${selectedBookToTrade === userBook.id ? "border-amber-600 bg-amber-50" : "border-gray-200"}
                            `}
                            onClick={() => setSelectedBookToTrade(userBook.id)}
                          >
                            <div className="w-12 h-16 bg-white rounded overflow-hidden mr-3 shadow-sm">
                              <img
                                src={userBook.coverImage || "/placeholder.svg"}
                                alt={userBook.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-amber-900 line-clamp-1">{userBook.title}</h4>
                              <p className="text-xs text-gray-600 line-clamp-1">by {userBook.author}</p>
                            </div>
                            {selectedBookToTrade === userBook.id && (
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <div className="bg-amber-800 rounded-full p-1">
                                  <Check className="h-4 w-4 text-white" />
                                </div>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => setIsTradeConfirmOpen(false)}
                      className="border-amber-800 text-amber-800"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleConfirmTrade}
                      className="bg-amber-800 hover:bg-amber-900 text-white"
                      disabled={!selectedBookToTrade}
                    >
                      Request Trade
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <TabsContent value="accepted">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {acceptedTrades.length > 0 ? (
                acceptedTrades.map((trade) => <TradeCard key={trade.id} trade={trade} />)
              ) : (
                <div className="col-span-3 text-center py-12 bg-white rounded-lg shadow">
                  <BookOpen className="h-16 w-16 mx-auto text-amber-300 mb-3" />
                  <h3 className="text-xl font-medium text-amber-800 mb-2">No Accepted Trades Yet</h3>
                  <p className="text-gray-600 mb-4">Your accepted trades will appear here.</p>
                  <Link to="/">
                    <Button className="bg-amber-800 hover:bg-amber-900 text-white">Browse Books</Button>
                  </Link>
                </div>
              )}
            </motion.div>
          </TabsContent>

          <TabsContent value="pending">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {pendingTrades.length > 0 ? (
                pendingTrades.map((trade) => <TradeCard key={trade.id} trade={trade} />)
              ) : (
                <div className="col-span-3 text-center py-12 bg-white rounded-lg shadow">
                  <Clock className="h-16 w-16 mx-auto text-amber-300 mb-3" />
                  <h3 className="text-xl font-medium text-amber-800 mb-2">No Pending Trades</h3>
                  <p className="text-gray-600 mb-4">When you request a trade, it will appear here.</p>
                  <Link to="/">
                    <Button className="bg-amber-800 hover:bg-amber-900 text-white">Find Books to Trade</Button>
                  </Link>
                </div>
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}



function TradeCard({ trade }) {
  const navigate = useNavigate()
  const isPending = trade.status === "Pending"

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <motion.div variants={item}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-200">
        <div className={`p-3 ${isPending ? "bg-amber-50" : "bg-amber-100"} flex justify-between items-center`}>
          <span className="text-sm font-medium">Trade #{trade.id}</span>
          <Badge className={isPending ? "bg-amber-500" : "bg-green-500"}>
            {isPending ? <Clock className="h-3 w-3 mr-1" /> : <Check className="h-3 w-3 mr-1" />}
            {trade.status}
          </Badge>
        </div>

        <CardContent className="p-4">
          <p className="text-sm text-gray-500 mb-4">{formatDate(trade.date)}</p>

          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-shrink-0 w-20 h-28 bg-amber-50 rounded overflow-hidden">
              <img
                src={trade.bookGiven.coverImage || "/placeholder.svg"}
                alt={trade.bookGiven.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center text-sm text-amber-700 mb-1">
                <BookOpen className="h-3 w-3 mr-1" />
                <span>You traded</span>
              </div>
              <h4 className="font-medium text-amber-900 line-clamp-1">{trade.bookGiven.title}</h4>
              <p className="text-sm text-gray-600 line-clamp-1">by {trade.bookGiven.author}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-20 h-28 bg-amber-50 rounded overflow-hidden">
              <img
                src={trade.bookReceived.coverImage || "/placeholder.svg"}
                alt={trade.bookReceived.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center text-sm text-amber-700 mb-1">
                <BookOpen className="h-3 w-3 mr-1" />
                <span>You received</span>
              </div>
              <h4 className="font-medium text-amber-900 line-clamp-1">{trade.bookReceived.title}</h4>
              <p className="text-sm text-gray-600 line-clamp-1">by {trade.bookReceived.author}</p>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Button
              className="w-full bg-amber-800 hover:bg-amber-900 text-white"
              onClick={() => navigate(`/trades/${trade.id}`)}
            >
              View Details
            </Button>

            {isPending && (
              <Button variant="outline" className="border-amber-800 text-amber-800">
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

