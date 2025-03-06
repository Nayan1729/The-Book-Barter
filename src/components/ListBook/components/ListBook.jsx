import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import { Button, Input, Label, Textarea, Loader } from "../../index";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../Select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../../Card";
import { toast } from "react-toastify";
import getUserLocation from "../../../utils/getLocationService";
import { MapPin, ArrowLeft, Upload } from "lucide-react";
import { validationSchema } from "../schemas/ListBookSchema";

export default function ListBookForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(true);
  const [bookCover, setBookCover] = useState(null);

  // Initialize formik with initialValues and onSubmit
  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      publisher: "",
      description: "",
      condition: "Good",
      genre: "Fiction",
      language: "English",
      location: {
        lat: 0,
        lng: 0,
        address: "",
      },
    },
    validationSchema : validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        toast({
          title: "Success!",
          description: "Your book has been listed successfully.",
        });
        navigate("/");
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to list your book. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  // Fetch user location on mount and update formik values for location
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const location = await getUserLocation();
        // We’ll leave the address blank for manual entry
        formik.setFieldValue("location", {
          lat: location.lat,
          lng: location.lng,
          address: "",
        });
      } catch (error) {
        toast({
          title: "Location Error",
          description: "Unable to get your location. Please enter it manually.",
          variant: "destructive",
        });
      } finally {
        setLocationLoading(false);
      }
    };

    fetchLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast]);

  // Handle file input separately
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBookCover(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

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

        <Card className="max-w-3xl mx-auto shadow-lg transition-all duration-300 hover:shadow-xl">
          <CardHeader className="bg-amber-800 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-serif">List Your Book</CardTitle>
            <CardDescription className="text-amber-100">
              Share your book with the community for trading
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Book Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      required
                      className="border-amber-200 focus:border-amber-500"
                      {...formik.getFieldProps("title")}
                      error={formik.errors.title}
                      touched={formik.touched.title}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="author">Author *</Label>
                    <Input
                      id="author"
                      name="author"
                      required
                      className="border-amber-200 focus:border-amber-500"
                      {...formik.getFieldProps("author")}
                      error={formik.errors.author}
                      touched={formik.touched.author}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="publisher">Publisher</Label>
                    <Input
                      id="publisher"
                      name="publisher"
                      className="border-amber-200 focus:border-amber-500"
                      {...formik.getFieldProps("publisher")}
                      error={formik.errors.publisher}
                      touched={formik.touched.publisher}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="condition">Condition *</Label>
                    <Select
                      name="condition"
                      value={formik.values.condition}
                      onValueChange={(value) =>
                        formik.setFieldValue("condition", value)
                      }
                    >
                      <SelectTrigger className="border-amber-200 focus:border-amber-500">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="Like New">Like New</SelectItem>
                        <SelectItem value="Very Good">Very Good</SelectItem>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Acceptable">Acceptable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="genre">Genre *</Label>
                    <Select
                      name="genre"
                      value={formik.values.genre}
                      onValueChange={(value) =>
                        formik.setFieldValue("genre", value)
                      }
                    >
                      <SelectTrigger className="border-amber-200 focus:border-amber-500">
                        <SelectValue placeholder="Select genre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fiction">Fiction</SelectItem>
                        <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
                        <SelectItem value="Mystery">Mystery</SelectItem>
                        <SelectItem value="Science Fiction">
                          Science Fiction
                        </SelectItem>
                        <SelectItem value="Fantasy">Fantasy</SelectItem>
                        <SelectItem value="Romance">Romance</SelectItem>
                        <SelectItem value="Biography">Biography</SelectItem>
                        <SelectItem value="History">History</SelectItem>
                        <SelectItem value="Self-Help">Self-Help</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Language *</Label>
                    <Select
                      name="language"
                      value={formik.values.language}
                      onValueChange={(value) =>
                        formik.setFieldValue("language", value)
                      }
                    >
                      <SelectTrigger className="border-amber-200 focus:border-amber-500">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                        <SelectItem value="German">German</SelectItem>
                        <SelectItem value="Italian">Italian</SelectItem>
                        <SelectItem value="Portuguese">Portuguese</SelectItem>
                        <SelectItem value="Chinese">Chinese</SelectItem>
                        <SelectItem value="Japanese">Japanese</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Right column */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      className="h-32 border-amber-200 focus:border-amber-500"
                      {...formik.getFieldProps("description")}
                      error={formik.errors.description}
                      touched={formik.touched.description}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Book Cover</Label>
                    <div className="border-2 border-dashed border-amber-200 rounded-lg p-4 text-center hover:bg-amber-50 transition-colors cursor-pointer">
                      <input
                        type="file"
                        id="coverImage"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="coverImage" className="cursor-pointer block">
                        {bookCover ? (
                          <div className="flex flex-col items-center">
                            <img
                              src={bookCover || "/placeholder.svg"}
                              alt="Book cover preview"
                              className="max-h-40 max-w-full mb-2 rounded"
                            />
                            <span className="text-sm text-amber-700">
                              Click to change
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center text-amber-700">
                            <Upload className="h-10 w-10 mb-2" />
                            <span>Upload book cover image</span>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label className="flex items-center">Location</Label>

                    {locationLoading ? (
                      <div className="flex items-center text-amber-700">
                        <Loader className="h-4 w-4 animate-spin mr-2" />
                        <span>Detecting your location...</span>
                      </div>
                    ) : (
                      <div className="relative">
                        {/* Single location input */}
                        <Input
                          placeholder="Enter location..."
                          className="pl-10 pr-28 border-amber-200 focus:border-amber-500"
                          value={formik.values.location.address}
                          onChange={(e) =>
                            formik.setFieldValue("location.address", e.target.value)
                          }
                          error={formik.errors.location?.address}
                          touched={formik.touched.location?.address}
                        />
                        {/* MapPin icon */}
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        {/* 'Using your location' Button */}
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-700 hover:text-amber-900 hover:bg-amber-50 text-sm px-2 py-1 rounded"
                          onClick={() => {
                            // For demonstration, you could reset or re-fetch location
                            formik.setFieldValue(
                              "location.address",
                              "Using your location"
                            );
                          }}
                        >
                          Using your location
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <CardFooter className="flex justify-end space-x-4 px-0 pt-6">
                <Link to="/">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-amber-800 text-amber-800"
                  >
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="bg-amber-800 hover:bg-amber-900 text-white"
                  disabled={loading}
                >
                  {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                  List Book
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
