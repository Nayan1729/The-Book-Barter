import { useState, useEffect } from "react";
import { BookList } from "./components/BookList";
import { SearchFilters } from "./components/SearchFilters";
import { LocationSearch } from "./components/LocationSearch";
import { Button , Loader} from "../index";
import { toast } from "react-toastify";
import getUserLocation from "../../utils/getLocationService";
import { Link } from "react-router-dom";
import { findNearByBooksApi } from "../../apiEndPoints";
import Pagination from "./components/Pagination";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [searchRadius, setSearchRadius] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [filterType, setFilterType] = useState("title");
  const [filterQuery, setFilterQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const userId = localStorage.getItem("userId")



  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const location = await getUserLocation();
        setUserLocation(location);
        console.log(location);
      } catch {
        toast.error("Unable to get your location. Please enter it manually.")
        setLoading(false)
      }
    };
    fetchUserLocation();
  }, []);

  useEffect(()=>{
    const fetchBooks = async ()=>{
      await findBooks();
    }
    fetchBooks()
  },[userLocation])




  const findBooks = async(pageNo = currentPage) => {
    // locationQuery  , userLocation , searchRadius , filterType , filterQuery , page...
    setLoading(true)
    const res = await findNearByBooksApi({location: locationQuery  , lat : userLocation?.lat , lng : userLocation?.lng , radius :searchRadius , filterType , filterQuery , pageNo })
    console.log(res);
    
    if(res.statusCode == 200){
      setBooks(res.data.booksListedDTOS)
      setCurrentPage(res.data.pageNo)
      setTotalPages(res.data.totalPages)
    }else{
      toast.error(res.message) 
    }
    setLoading(false)
  };

 

  const handleRadiusChange = (newRadius) => {
    setSearchRadius(newRadius);
    console.log(newRadius);
  };

  const handlePageChange = async(page) => {
    console.log(page);
    
    setCurrentPage(page);
    await findBooks(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  if(loading)return < Loader />

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-amber-900 mb-4 md:mb-0">The Book Barter</h1>
          <div className="flex space-x-4">
            <Link to="/list-book"><Button className="bg-amber-800 hover:bg-amber-900 text-white cursor-pointer">List a Book</Button></Link>
        <Link to= {`/users/${userId}`}>
          <Button className="bg-amber-800 text-white px-4 py-2 rounded-lg cursor-pointer">
            My-Profile
          </Button>
        </Link>
            <Link to="/logout"><Button className="bg-amber-800 text-white px-4 py-2 rounded-lg cursor-pointer">Logout</Button></Link>
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
            {console.log(currentPage)}
            <BookList {...{ books, currentPage, totalPages }} /> 
            <Pagination currentPage ={currentPage} totalPages={totalPages} onPageChange = {handlePageChange} />
          </>
        )}
      </div>
    </main>
  );
}
