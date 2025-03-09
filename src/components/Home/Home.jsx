import { useState, useEffect } from "react";
import { BookList } from "./components/BookList";
import { SearchFilters } from "./components/SearchFilters";
import { LocationSearch } from "./components/LocationSearch";
import { Button , Loader} from "../index";
import { toast } from "react-toastify";
import getUserLocation from "../../utils/getLocationService";
import { Link } from "react-router-dom";
import { dummyBooks } from "../../utils/DummyBooks";
import { findNearByBooksApi } from "../../apiEndPoints";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [searchRadius, setSearchRadius] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterType, setFilterType] = useState("title");
  const [filterQuery, setFilterQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");


  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const location = await getUserLocation();
        setUserLocation(location);
        await findBooks();
      } catch {
        toast.error("Unable to get your location. Please enter it manually.");
        setLoading(false);
      }
    };
    fetchUserLocation();
  }, []);




  const findBooks = async() => {
    // locationQuery  , userLocation , searchRadius , filterType , filterQuery , page...
    setLoading(true)
    const res = await findNearByBooksApi({location: locationQuery  , lat : userLocation?.lat , lng : userLocation?.lng , radius :searchRadius , filterType , filterQuery })
    console.log(res);
    
    if(res.statusCode == 200){
      setBooks(res.data.booksListedDTOS)
    }else{
      toast.error(res.message) 
    }
    setLoading(false)
  };

  const handleRadiusChange = (newRadius) => {
    setSearchRadius(newRadius);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-amber-900 mb-4 md:mb-0">The Book Barter</h1>
          <div className="flex space-x-4">
            <Link to="/login"><Button variant="outline" className="border-amber-800 text-amber-800">Login</Button></Link>
            <Link to="/list-book"><Button className="bg-amber-800 hover:bg-amber-900 text-white">List a Book</Button></Link>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 transition-all duration-300 hover:shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><h2 className="text-xl font-medium text-amber-800 mb-4">Find Books</h2>
              <SearchFilters {...{ filterType, setFilterType, filterQuery, setFilterQuery }} />
            </div>
            <div><h2 className="text-xl font-medium text-amber-800 mb-4">Location</h2>
              <LocationSearch {...{ locationQuery, setLocationQuery, searchRadius, setSearchRadius: handleRadiusChange, onSearch: findBooks, userLocation }} />
            </div>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader />
            <span className="ml-2 text-lg text-amber-700">Loading books...</span>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-medium text-amber-800 mb-6">
              {locationQuery ? `Books near "${locationQuery}"` : userLocation ? `Books within ${searchRadius}km` : "All Available Books"}
            </h2>
            <BookList {...{ books, currentPage, totalPages, onPageChange: handlePageChange }} /> 
          </>
        )}
      </div>
    </main>
  );
}
