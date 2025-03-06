import { useState, useEffect } from "react";
import { BookList } from "./components/BookList";
import { SearchFilters } from "./components/SearchFilters";
import { LocationSearch } from "./components/LocationSearch";
import { Button , Loader} from "../index";
import { toast } from "react-toastify";
import getUserLocation from "../../utils/getLocationService";
import { Link } from "react-router-dom";
import { dummyBooks } from "../../utils/DummyBooks";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [searchRadius, setSearchRadius] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterType, setFilterType] = useState("title");
  const [filterQuery, setFilterQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  const booksPerPage = 8;

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const location = await getUserLocation();
        setUserLocation(location);
        fetchBooks(location, searchRadius);
      } catch {
        toast({
          title: "Location Error",
          description: "Unable to get your location. Please enter it manually.",
          variant: "destructive",
        });
        setLoading(false);
        fetchBooks(null, searchRadius);
      }
    };
    fetchUserLocation();
  }, [searchRadius, toast]);

  const fetchBooks = (location, radius) => {
    setLoading(true);
    setTimeout(() => {
      let booksToShow = [...dummyBooks];

      setBooks(booksToShow);
      setFilteredBooks(booksToShow);
      setTotalPages(Math.ceil(booksToShow.length / booksPerPage));
      setLoading(false);
    }, 1000);
  };


  const deg2rad = (deg) => deg * (Math.PI / 180);

  const handleSearch = () => {
    let results = books.filter((book) =>
      book[filterType]?.toLowerCase().includes(filterQuery.toLowerCase())
    );
    if (locationQuery) {
      results = results.filter((book) => book.location.address.toLowerCase().includes(locationQuery.toLowerCase()));
    }
    setFilteredBooks(results);
    setTotalPages(Math.ceil(results.length / booksPerPage));
    setCurrentPage(1);
  };

  const handleRadiusChange = (newRadius) => {
    setSearchRadius(newRadius);
    if (userLocation) fetchBooks(userLocation, newRadius);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentBooks = filteredBooks.slice((currentPage - 1) * booksPerPage, currentPage * booksPerPage);

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
              <SearchFilters {...{ filterType, setFilterType, filterQuery, setFilterQuery, onSearch: handleSearch }} />
            </div>
            <div><h2 className="text-xl font-medium text-amber-800 mb-4">Location</h2>
              <LocationSearch {...{ locationQuery, setLocationQuery, searchRadius, setSearchRadius: handleRadiusChange, onSearch: handleSearch, userLocation }} />
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
            {/* <h2 className="text-2xl font-medium text-amber-800 mb-6">
              {locationQuery ? `Books near "${locationQuery}"` : userLocation ? `Books within ${searchRadius}km` : "All Available Books"}
            </h2>*/
            <BookList {...{ books, currentPage, totalPages, onPageChange: handlePageChange }} /> }
          </>
        )}
      </div>
    </main>
  );
}
