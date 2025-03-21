import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../Tabs";
import { Button } from "../../index";
import { Card, CardContent } from "../../Card";
import { Avatar, AvatarFallback, AvatarImage } from "../../Avatar";
import { Badge } from "../../Badge";
import {
  ArrowLeft,
  Edit,
  Mail,
  MapPin,
  Phone,
  BookOpen,
  Check,
  Clock,
  RefreshCw,
} from "lucide-react";
import { motion } from "framer-motion";
import { userProfileApi } from "../../../apiEndPoints";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } };

export default function UserProfileComponent() {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("accepted");

  // Fetch the user profile from the backend
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await userProfileApi(userId);
        setProfile(res.data);
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    };
    fetchUserProfile();
  }, [userId]);

  // Separate trades by status (if profile data exists)
  const acceptedTrades = profile
    ? profile.userTrades.filter((t) => t.status === "ACCEPTED")
    : [];
  const pendingTrades = profile
    ? profile.userTrades.filter((t) => t.status === "PENDING")
    : [];

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12">
      <div className="container mx-auto px-4">
        <Link
          to="/"
          className="inline-flex items-center text-amber-800 hover:text-amber-600 mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        {/* Profile Header */}
        {profile && (
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-lg overflow-hidden">
                <div className="bg-amber-800 h-40 relative">
                </div>
                <CardContent className="p-6 relative">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col items-center md:items-start">
                      <Avatar className="h-32 w-32 border-4 border-white absolute -top-16 left-6 shadow-md">
                        <AvatarImage src={profile.imageUrl} alt={profile.name} />
                        <AvatarFallback className="bg-amber-200 text-amber-800 text-xl">
                          {profile.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="mt-20 md:mt-16 md:ml-2 flex flex-col items-center md:items-start">
                        <div className="flex flex-col md:flex-row md:items-center gap-2">
                          <h1 className="text-2xl font-bold text-amber-900">
                            {profile.name}
                          </h1>
                          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                            Book Lover
                          </Badge>
                        </div>
                        <p className="text-gray-500 mt-1">
                          Member since March 2025
                        </p>
                        <p className="mt-4 text-gray-700 max-w-xl text-center md:text-left">
                          {profile.bio || ""}
                        </p>
                      </div>
                    </div>
                    <div className="flex-grow flex flex-col md:items-end md:mt-16 gap-2">
                      <div className="flex items-center text-gray-600">
                        <Mail className="h-4 w-4 mr-2 text-amber-700" />
                        <span>{profile.email}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone className="h-4 w-4 mr-2 text-amber-700" />
                        <span>{profile.phoneNumber}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-amber-700" />
                        <span>Nadiad</span>
                      </div>
                      <div className="flex gap-4 mt-4 text-center">
                        <div className="p-3 bg-amber-50 rounded-lg">
                          <p className="text-2xl font-bold text-amber-800">
                            {pendingTrades.length || 0}
                          </p>
                          <p className="text-xs text-gray-600">Pending Requests</p>
                        </div>
                        <div className="p-3 bg-amber-50 rounded-lg">
                          <p className="text-2xl font-bold text-amber-800">
                            {acceptedTrades.length || 0}
                          </p>
                          <p className="text-xs text-gray-600">Trades Completed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}
        {/* Trade History Tabs */}
        <Tabs
          defaultValue="accepted"
          value={activeTab}
          onValueChange={setActiveTab}
          className="mt-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-medium text-amber-800">
              Trade History
            </h2>
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
          </div>
          <TabsContent value="accepted">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {acceptedTrades.length > 0 ? (
                acceptedTrades.map((trade) => (
                  <TradeCard key={trade.id} trade={trade} />
                ))
              ) : (
                <div className="col-span-3 text-center py-12 bg-white rounded-lg shadow">
                  <BookOpen className="h-16 w-16 mx-auto text-amber-300 mb-3" />
                  <h3 className="text-xl font-medium text-amber-800 mb-2">
                    No Accepted Trades Yet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Your accepted trades will appear here.
                  </p>
                  <Link to="/">
                    <Button className="bg-amber-800 hover:bg-amber-900 text-white">
                      Browse Books
                    </Button>
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
                pendingTrades.map((trade) => (
                  <TradeCard key={trade.id} trade={trade} />
                ))
              ) : (
                <div className="col-span-3 text-center py-12 bg-white rounded-lg shadow">
                  <Clock className="h-16 w-16 mx-auto text-amber-300 mb-3" />
                  <h3 className="text-xl font-medium text-amber-800 mb-2">
                    No Pending Trades
                  </h3>
                  <p className="text-gray-600 mb-4">
                    When you request a trade, it will appear here.
                  </p>
                  <Link to="/">
                    <Button className="bg-amber-800 hover:bg-amber-900 text-white">
                      Find Books to Trade
                    </Button>
                  </Link>
                </div>
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

function TradeCard({ trade }) {
  const navigate = useNavigate();
  const isPending = trade.status === "PENDING";

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div variants={item}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-200">
        <div
          className={`p-3 ${
            isPending ? "bg-amber-50" : "bg-amber-100"
          } flex justify-between items-center`}
        >
          <span className="text-sm font-medium">Trade #{trade.id}</span>
          <Badge className={isPending ? "bg-amber-500" : "bg-green-500"}>
            {isPending ? (
              <Clock className="h-3 w-3 mr-1" />
            ) : (
              <Check className="h-3 w-3 mr-1" />
            )}
            {trade.status}
          </Badge>
        </div>
        <CardContent className="p-4">
          <p className="text-sm text-gray-500 mb-4">
            {formatDate(trade.requestedTime)}
          </p>
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-shrink-0 w-20 h-28 bg-amber-50 rounded overflow-hidden">
              <img
                src={
                  trade.userTradedBook.imageUrls &&
                  trade.userTradedBook.imageUrls[0]
                    ? trade.userTradedBook.imageUrls[0]
                    : "/placeholder.svg"
                }
                alt={trade.userTradedBook.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center text-sm text-amber-700 mb-1">
                <BookOpen className="h-3 w-3 mr-1" />
                <span>You traded</span>
              </div>
              <h4 className="font-medium text-amber-900 line-clamp-1">
                {trade.userTradedBook.title}
              </h4>
              <p className="text-sm text-gray-600 line-clamp-1">
                by {trade.userTradedBook.author}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-20 h-28 bg-amber-50 rounded overflow-hidden">
              <img
                src={
                  trade.userToGetBook.imageUrls &&
                  trade.userToGetBook.imageUrls[0]
                    ? trade.userToGetBook.imageUrls[0]
                    : "/placeholder.svg"
                }
                alt={trade.userToGetBook.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center text-sm text-amber-700 mb-1">
                <BookOpen className="h-3 w-3 mr-1" />
                <span>You received</span>
              </div>
              <h4 className="font-medium text-amber-900 line-clamp-1">
                {trade.userToGetBook.title}
              </h4>
              <p className="text-sm text-gray-600 line-clamp-1">
                by {trade.userToGetBook.author}
              </p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button
              className="w-full bg-amber-800 hover:bg-amber-900 text-white"
              onClick={() => navigate(`/trades/${trade.id}`)}
            >
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
