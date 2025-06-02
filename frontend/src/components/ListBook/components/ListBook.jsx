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
import {  MapPin, ArrowLeft, Upload, X, Plus, ImageIcon } from "lucide-react"
import { validationSchema } from "../schemas/ListBookSchema";
import { AnimatePresence, motion } from "framer-motion";
import { listBookApi } from "../../../apiEndPoints";

export default function ListBookForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(true);
  const [imageUploads, setImageUploads] = useState([])
  const [mainImageIndex, setMainImageIndex] = useState(0)
  const [isUsingCurrentLocation , setIsUsingCurrentLocation] = useState(true)
  const [currentLocation , setCurrentLocation] = useState(null)
  const [imageError, setImageError] = useState("");

  // Initialize formik with initialValues and onSubmit
  const validateImages = (images) => {
    if (images.length < 1) {
      setImageError("Please upload an image");
      return false;
    }
    const totalSize = images.reduce((acc, img) => acc + img.file.size, 0);
    if (totalSize > 5 * 1024 * 1024) { // 5MB
      setImageError("Total image size should be less than 5MB.");
      return false;
    }
    setImageError("");
    return true;
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      publisher: "",
      description: "",
      bookcondition: "Good",
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
      console.log(values);
      console.log(imageUploads);
      console.log(formik.errors);
      
      if (!validateImages(imageUploads)){
        return;
      } 
      console.log("imageUploads",imageUploads);
      setLoading(true);
        console.log("List book called");
        const res = await listBookApi(values,imageUploads);
        if(res.statusCode == 201){
          toast.success("Book Listed Successfully");
          navigate("/");
        }else{
          toast.error("Failed to list your book. Please try again.");
        }
        setLoading(false)
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
        setCurrentLocation(location)        
      } catch (error) {
        toast.error("Unable to get your location. Please enter it manually.");
      } finally {
        setLocationLoading(false);
      }
    };
    fetchLocation();
  },[]);

  useEffect(()=>{
    !isUsingCurrentLocation
                              ? (
                                  formik.setFieldValue("location.address", ""),
                                  formik.setFieldValue("location.lat", 0),
                                  formik.setFieldValue("location.lng", 0)
                                )
                              : (
                                  formik.setFieldValue("location.lat", currentLocation?.lat),
                                  formik.setFieldValue("location.lng", currentLocation?.lng),
                                  formik.setFieldValue("location.address","")
                                );
  },[isUsingCurrentLocation])
  console.log(formik.errors);
  
  // Handle file input separately

  const handleFileChange = (e) => {
    const files = e.target.files;
    console.log(files);
    if (!files || files.length === 0) return;

    const newImages = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const id = Math.random().toString(36).substring(2, 9);
        newImages.push({
          id,
          file,
          url: e.target?.result,
        });
        console.log(newImages);
        if (newImages.length === files.length) {
          const updatedImages = [...imageUploads, ...newImages];
          if (validateImages(updatedImages)) {
            setImageUploads(updatedImages);
          }
        }
      };
      
      
      reader.readAsDataURL(file);
    });
  };
  const removeImage = (id) => {
    setImageUploads((prev) => {
      const filtered = prev.filter((img) => img.id !== id)

      // If we're removing the main image, reset the main image index
      if (mainImageIndex >= filtered.length && filtered.length > 0) {
        setMainImageIndex(0)
      }

      return filtered
    }
  )}

  
  const setAsMainImage = (index) => {
    setMainImageIndex(index)
  }

  if(loading){
    return <Loader />
  }
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
                    <Label htmlFor="bookcondition">Book Condition *</Label>
                    <Select
                      name="bookcondition"
                      value={formik.values.bookcondition}
                      onValueChange={(value) =>
                        formik.setFieldValue("bookcondition", value)
                      }
                    >
                      <SelectTrigger className="border-amber-200 focus:border-amber-500">
                        <SelectValue placeholder="Select Book condition" />
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
                        <SelectItem value="Finance">Finance</SelectItem>
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
                    <Label className="mb-2 block">Book Images *</Label>
                    <div className="border-2 border-dashed border-amber-200 rounded-lg p-4 text-center hover:bg-amber-50 transition-colors">
                      <input
                        type="file"
                        id="coverImage"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                      />

                      {imageUploads.length > 0 ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                            <AnimatePresence>
                              {imageUploads.map((image, index) => (
                                <motion.div
                                  key={image.id}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.8 }}
                                  className={`relative rounded-md overflow-hidden border-2 ${index === mainImageIndex ? "border-amber-600 ring-2 ring-amber-400" : "border-gray-200"}`}
                                >
                                  <img
                                    src={image.url || "/placeholder.svg"}
                                    alt={`Book image ${index + 1}`}
                                    className="w-full h-24 object-cover"
                                  />
                                  <div className="absolute top-0 right-0 p-1 flex gap-1">
                                    {index !== mainImageIndex && (
                                      <button
                                        type="button"
                                        onClick={() => setAsMainImage(index)}
                                        className="bg-amber-800 text-white rounded-full p-1 hover:bg-amber-700 transition-colors"
                                        title="Set as main image"
                                      >
                                        <ImageIcon className="h-3 w-3" />
                                      </button>
                                    )}
                                    <button
                                      type="button"
                                      onClick={() => removeImage(image.id)}
                                      className="bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
                                      title="Remove image"
                                    >
                                      <X className="h-3 w-3" />
                                    </button>
                                  </div>
                                  {index === mainImageIndex && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-amber-800 text-white text-xs py-1 text-center">
                                      Main Image
                                    </div>
                                  )}
                                </motion.div>
                              ))}
                            </AnimatePresence>

                            <label
                              htmlFor="coverImage"
                              className="border-2 border-dashed border-amber-200 rounded-md flex items-center justify-center h-24 cursor-pointer hover:bg-amber-50 transition-colors"
                            >
                              <Plus className="h-6 w-6 text-amber-700" />
                            </label>
                          </div>

                          <p className="text-sm text-amber-700">
                            {imageUploads.length} {imageUploads.length === 1 ? "image" : "images"} selected. Click{" "}
                            <span className="font-medium">+</span> to add more.
                          </p>
                        </div>
                      ) : (
                        <label htmlFor="coverImage" className="cursor-pointer block py-6">
                          <div className="flex flex-col items-center text-amber-700">
                            <Upload className="h-10 w-10 mb-2" />
                            <span className="font-medium">Upload book images</span>
                            <p className="text-sm text-amber-600 mt-1">
                              Select multiple images to show your book from different angles
                            </p>
                          </div>
                        </label>
                      )}
                                          { imageError && <p className="text-red-500">{imageError}</p> }
                    </div>
                  </div>
                  <div className="space-y-2 mt-4"> 
                    <Label className="flex items-center">Location</Label>

                    {locationLoading ? (
                      <div className="flex items-center text-amber-700">
                        <Loader text = "Detecting your location..." className="h-4 w-4 animate-spin mr-2" />
                      </div>
                    ) : (
                      <div className="relative">
                        {/* Single location input */}
                        <Input
                          placeholder="Enter location..."
                          className="pl-10 pr-28 border-amber-200 focus:border-amber-500"
                          value={formik.values.location.address}
                          onChange={(e) =>{
                            formik.setFieldValue("location.address", e.target.value)
                            setIsUsingCurrentLocation(false)
                            formik.setFieldValue("location.lat","")
                            formik.setFieldValue("location.lng","")  
                            }
                          }
                          error={formik.errors.location?.address}
                          touched={formik.touched.location?.address}
                        />
                        {/* MapPin icon */}
                        {
                          <>
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          {/* 'Using your location' Button */}
                        <Button
                          type="button"
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-700 hover:text-amber-900 hover:bg-amber-50 text-sm px-2 py-1 rounded"
                          onClick={() => {
                            setIsUsingCurrentLocation((prev)=>!prev)
                            
                          }}
                        >
                          {isUsingCurrentLocation ? "Using your Location" : "Use your location"}
                          </Button>
                          </>
                        }
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
                >
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
