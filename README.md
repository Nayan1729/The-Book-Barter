# The Book Barter 📚

The Book Barter is a **book exchange platform** where users can trade books with others **in their locality**. Users can view available books nearby, filter listings based on preferences like **location, author, title**, and initiate trade requests. **Email notifications** are sent for trade requests, successful trades, and declined trades.

## 🚀 Features

- 🔐 **User Authentication**: Login and registration functionality with **JWT token** for stateless authentication.
- 📍 **Geolocation-based Book Listings**: Users can see available books in their locality, powered by **geolocation queries** to enhance search accuracy.
- 🌍 **Location Customization**: Users can change their location and adjust the search radius.
- 📚 **Book Listing**: Users can list books they want to trade.
- 🔄 **Book Trading**: Users can send trade requests for books in exchange for their own books.
- 📧 **Email Notifications**:
  - When a **trade request** is sent.
  - When a **trade is successfully completed**.
  - When a **trade request is declined**.
- ☁️ **AWS S3 Integration**: Book images are stored securely on AWS S3.

---

## 🛠️ Tech Stack

- **Frontend**: React ⚛️
- **Backend**: Spring Boot 🌱
- **Database**: MySQL 🐬
- **Cloud Storage**: AWS S3 ☁️
- **Geolocation API**: OpenCage API 🌍

---

## 🏁 Getting Started

### 📌 Prerequisites

Ensure you have the following installed:
- **Java (JDK 17 or later)** ☕
- **Spring Boot** 🏗️
- **MySQL** 🐬
- **IntelliJ IDEA** or any preferred IDE 🖥️

### ⚙️ Setup Backend

1. **Clone the repository**
   ```sh
   git clone https://github.com/Nayan1729/The-Book-Barter-Backend.git
   cd the-book-barter
   ```

2. **Configure Secrets**
   Create a file named `secrets.properties` in the project's `src/main/resources` directory and add the following:

   ```properties
   # AWS S3 Configuration
   AWS_ACCESS_KEY = your-access-key
   AWS_SECRET_KEY = your-secret-key
   AWS_REGION     = your-region
   AWS_BUCKET_NAME = your-bucket-name

   # OpenCage Geolocation API
   OPEN_CAGE_API = your-opencage-api-key

   # Email Service Configuration
   MAIL_USERNAME   = your-email-username
   MAIL_PASSWORD   = your-email-password
   MAIL_EMAIL      = your-email
   MAIL_PORT       = your-mail-port
   MAIL_HOST       = your-mail-host

   # Database Configuration
   DB_URL          = jdbc:mysql://localhost:3306/{yourDBName}
   DB_USERNAME     = your-database-username
   DB_PASSWORD     = your-database-password

   # JWT Secret Key
   SECRET_KEY      = 256BitJwtSecretKey
   ```

 
3. **Run the application** 🚀
   ```sh
   mvn spring-boot:run
   ```

---

## 🔌 API Endpoints

### **User Authentication** 🔐
- `POST /api/auth/register` → Register a new user
- `POST /api/auth/login` → Authenticate a user

### **Book Management** 📚
- `POST /api/books` → Add a new book
- `GET /api/books` → Get books based on geolocation & filters
- `GET /api/books/{id}` → Get a particular book by ID

### **Trade Requests** 🔄
- `POST /api/trade` → Send a trade request
- `GET /api/trade` → View trade requests
- `GET /api/trade/{id}` → Get a particular trade request by ID
- `PUT /api/trade/accept/{id}` → Accept a trade request
- `PUT /api/trade/decline/{id}` → Decline a trade request

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📩 Contact

For inquiries, reach out at [nayanthacker28@gmail.com](mailto:nayanthacker28@gmail.com).

