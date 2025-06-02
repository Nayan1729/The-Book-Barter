import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button, Loader } from "../../index";
import { Card, CardContent } from "../../Card";
import { Badge } from "../../Badge";
import { ArrowLeft, Edit, BookOpen, Check, Clock, X } from "lucide-react";
import { motion } from "framer-motion";
import { acceptTradeApi, declineTradeApi, tradeDetailsApi } from "../../../apiEndPoints";
import { toast } from "react-toastify";

// Sample trade data for demonstration purposes.

function TradeDetailsComponent() {
  const { tradeId } = useParams();
  const navigate = useNavigate();
  const [trade, setTrade] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId")

  // Simulate fetching trade data
  useEffect(() => {
    const fetchTradeDetails = async()=>{
      setLoading(true);
      const res = await tradeDetailsApi(tradeId)
      if(res.statusCode == 200){
        setTrade(res.data);
        toast.success(res.message)
      }else{
        toast.error(res.message)
      }
      setLoading(false);
    }
    fetchTradeDetails()
  }, [tradeId]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const handleAcceptTrade = async() => {
    setLoading(true)
    const res = await acceptTradeApi(tradeId)
    if(res.statusCode == 200){
      setTrade((prevTrade) => ({
        ...prevTrade,
        trade: { ...prevTrade.trade, status: "ACCEPTED", responseTime: new Date().toISOString() },
      }));      toast.success(res.message)
    }else{
      toast.error(res.message)
    }
    setLoading(false)
  };

  const handleDeclineTrade = async() => {
    const res = await declineTradeApi(tradeId);
    if(res.statusCode == 200){
      toast.success(res.message)
      navigate(`/users/${userId}`);
    }else{
      toast.error(res.message)
    }
  };

  if (loading) {
    return <Loader />
  }

  if (!trade) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Trade not found.</h2>
        <Link to= {`/users/${userId}`} >Back to Profile</Link>
      </div>
    );
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <Link to={`/users/${userId}`}  style={{ display: "block", marginBottom: "1rem" }}>
        ← Back to Profile
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card style={{ marginBottom: "1rem" }}>
          <div
            style={{
              padding: "1rem",
              backgroundColor:
                trade.status === "PENDING" ? "#FEE2E2" : "#D1FAE5",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1 style={{ fontSize: "1.25rem", margin: 0 }}>Trade #{trade.trade.id}</h1>
            <Badge
              style={{
                backgroundColor:
                  trade.trade.status === "Pending" ? "#F87171" : "#34D399",
                color: "#fff",
                padding: "0.25rem 0.5rem",
                borderRadius: "0.375rem",
              }}
            >
              {trade.trade.status}
            </Badge>
          </div>
          <CardContent style={{ padding: "1rem" }}>
            <p style={{ color: "#4B5563", marginBottom: "1rem" }}>
              Requested on {formatDate(trade.trade.requestedTime)}
            </p>
           { trade.trade.status == "ACCEPTED" && <p style={{ color: "#4B5563", marginBottom: "1rem" }}>
              Accepted on {formatDate(trade.trade.responseTime)}
            </p>}
            {/* Your Book Details */}
            <h2 style={{ marginBottom: "0.5rem" }}>Your Book</h2>
            <div style={{ display: "flex", marginBottom: "1rem" }}>
              <img
                src={trade.trade.userTradedBook.imageUrls && trade.trade.userTradedBook.imageUrls[0] || "/placeholder.svg"}
                alt={trade.trade.userTradedBook.title}
                style={{
                  width: "100px",
                  height: "150px",
                  objectFit: "cover",
                  marginRight: "1rem",
                }}
              />
              <div>
                <h3 style={{ margin: "0 0 0.25rem 0" }}>
                  {trade.trade.userTradedBook.title}
                </h3>
                <p style={{ margin: "0 0 0.25rem 0" }}>
                  by {trade.trade.userTradedBook.author}
                </p>
                <p style={{ margin: "0 0 0.25rem 0", fontSize: "0.875rem" }}>
                  Genre: {trade.trade.userTradedBook.genre}
                </p>
                <p style={{ margin: "0 0 0.25rem 0", fontSize: "0.875rem" }}>
                  Condition: {trade.trade.userTradedBook.bookCondition}
                </p>
                <p style={{ margin: 0, fontSize: "0.875rem" }}>
                  Location: {trade.trade.userTradedBook.location}
                </p>
              </div>
            </div>

            {/* Their Book Details */}
            <h2 style={{ marginBottom: "0.5rem" }}>Their Book</h2>
            <div style={{ display: "flex", marginBottom: "1rem" }}>
              <img
                src={trade.trade.userToGetBook.imageUrls && trade.trade.userToGetBook.imageUrls[0] || "/placeholder.svg"}
                alt={trade.trade.userToGetBook.title}
                style={{
                  width: "100px",
                  height: "150px",
                  objectFit: "cover",
                  marginRight: "1rem",
                }}
              />
              <div>
                <h3 style={{ margin: "0 0 0.25rem 0" }}>
                  {trade.trade.userToGetBook.title}
                </h3>
                <p style={{ margin: "0 0 0.25rem 0" }}>
                  by {trade.trade.userToGetBook.author}
                </p>
                <p style={{ margin: "0 0 0.25rem 0", fontSize: "0.875rem" }}>
                  Genre: {trade.trade.userToGetBook.genre}
                </p>
                <p style={{ margin: "0 0 0.25rem 0", fontSize: "0.875rem" }}>
                  Condition: {trade.trade.userToGetBook.bookCondition}
                </p>
                <p style={{ margin: 0, fontSize: "0.875rem" }}>
                  Location: {trade.trade.userToGetBook.location}
                </p>
              </div>
            </div>

            {trade.trade.status === "PENDING" && (
              <div
                style={{
                  borderTop: "1px solid #F3F4F6",
                  paddingTop: "1rem",
                  display: "flex",
                  gap: "1rem",
                }}
              >
                {trade.tradeCreatedUserId == userId ? (
                  <p style={{ color: "#374151", fontSize: "1rem", fontWeight: "500" }}>
                    You have initiated this trade. Waiting for the other user to respond.
                  </p>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      onClick={handleDeclineTrade}
                      style={{ backgroundColor: "#FEE2E2", color: "#B91C1C" }}
                    >
                      Decline Trade
                    </Button>
                    <Button
                      onClick={handleAcceptTrade}
                      style={{ backgroundColor: "#34D399", color: "#fff" }}
                    >
                      Accept Trade
                    </Button>
                  </>
                )}
              </div>
            )}

          </CardContent>
        </Card>
      </motion.div>

      {/* Trade Partner Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card style={{ marginTop: "2rem" }}>
          <div style={{ padding: "1rem", backgroundColor: "#F59E0B", color: "#fff" }}>
            <h2 style={{ margin: 0 }}>Trade Partner</h2>
          </div>
          <CardContent style={{ padding: "1rem", display: "flex", alignItems: "center" }}>
            <img
              src={trade.avatar || "/placeholder.svg"}
              alt={trade.tradePartner}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                marginRight: "1rem",
              }}
            />
            <div>
              <h3 style={{ margin: 0 }}>{trade.tradePartner}</h3>
              <p style={{ margin: 0 }}>{trade.location}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}

export default TradeDetailsComponent;
