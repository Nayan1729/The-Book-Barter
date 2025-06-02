import * as Yup from "yup";

const validConditions = ["New", "Like New", "Very Good", "Good", "Acceptable"];
const validGenres = [
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Science Fiction",
  "Fantasy",
  "Romance",
  "Biography",
  "History",
  "Self-Help",
  "Other",
];
const validLanguages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Chinese",
  "Japanese",
  "Other",
];

export const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  publisher: Yup.string(),
  description: Yup.string() 
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
    bookcondition: Yup.string()
    .required("Condition is required")
    .oneOf(validConditions, "Invalid condition"),
  genre: Yup.string()
    .required("Genre is required")
    .oneOf(validGenres, "Invalid genre"),
  language: Yup.string()
    .required("Language is required")
    .oneOf(validLanguages, "Invalid language"),
  location: Yup.object().shape({
    lat: Yup.number().typeError("Latitude must be a number"),
    lng: Yup.number().typeError("Longitude must be a number"),
    address: Yup.string().nullable(),
  })
});
