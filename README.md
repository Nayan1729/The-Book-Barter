# The Book Barter Frontend 📚

The **Book Barter Frontend** is a **React-based web application** built with **Vite** to provide a fast and efficient user experience for **The Book Barter** platform. Users can browse, list, and **exchange books with others in their locality**.

## 🚀 Features

- 🎨 **Modern UI**: Clean, responsive, and user-friendly interface built with **React**.
- 🔐 **Authentication**: Secure **JWT-based authentication**.
- 📍 **Geolocation-based Book Listings**: Books filtered based on user location.
- 📚 **Book Management**: Users can list, update, and remove books.
- 🔄 **Trade Requests**: Users can request and accept book trades.
- 📧 **Notifications**: Email alerts for trade requests and updates.
- ☁️ **AWS S3 Integration**: Secure book image uploads.

---

## 🛠️ Tech Stack

- **Frontend**: React ⚛️ + Vite ⚡
- **State Management**: Context API
- **Styling**: Tailwind CSS 🎨
- **API Communication**: Axios 🔗
- **Authentication**: JWT & React Router Protected Routes 🔐
- **Geolocation**: OpenCage API 🌍

---

## 📂 Project Structure

```
📦 src
 ┣ 📂 apiEndPoints   # API request functions
 ┣ 📂 components     # Reusable UI components
 ┣ 📂 pages          # Page-level components
 ┣ 📂 routes         # App routing configuration
 ┣ 📂 utils          # Utility functions
 ┣ 📜 App.jsx        # Main React component
 ┣ 📜 index.css      # Global styles
 ┣ 📜 main.jsx       # Entry point
 ┣ 📜 tailwind.config.js  # Tailwind CSS configuration
 ┣ 📜 vite.config.js  # Vite configuration
 ┗ ...other config files
```

---

## 🏁 Getting Started

### 📌 Prerequisites

Ensure you have the following installed:
- **Node.js (LTS version recommended)** 🌍
- **npm or yarn** 📦

### ⚙️ Setup

1. **Clone the repository**
   ```sh
   git clone https://github.com/Nayan1729/The-Book-Barter-Frontend.git
   cd The-Book-Barter-Frontend
   ```

2. **Install dependencies**
   ```sh
   npm install
   # OR
   yarn install
   ```

3. **Run the application** 🚀
   ```sh
   npm run dev
   # OR
   yarn dev
   ```

4. **Open in Browser** 🌐
   ```
   http://localhost:5173
   ```

---

## 🌟 API Endpoints Used

- **Authentication**:
  - `POST /api/auth/register` → Register a new user
  - `POST /api/auth/login` → Authenticate a user
- **Books**:
  - `GET /api/books` → Get all books
  - `GET /api/books/{id}` → Get a book by ID
  - `POST /api/books` → Add a new book
- **Trade Requests**:
  - `POST /api/trade` → Send a trade request
  - `GET /api/trade` → View trade requests
  - `GET /api/trade/{id}` → Get trade request details
  - `GET /api/trade/accept/{id}` → Accept a trade request
  - `GET /api/trade/decline/{id}` → Decline a trade request

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📩 Contact

For inquiries, reach out at [nayanthacker28@gmail.com](mailto:nayanthacker28@gmail.com).

