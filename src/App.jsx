// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddContact from "./pages/AddContact";
import EditContact from "./pages/EditContact";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        {/* Navbar */}
        <nav className="bg-blue-600 text-white px-6 py-4 shadow-md flex justify-between items-center">
          <Link to="/" className="font-bold text-xl hover:underline">
            📇 Contact Manager
          </Link>
          <div className="space-x-4">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/add" className="hover:underline">
              Add Contact
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Routes>
            {/* Home page - list of contacts */}
            <Route path="/" element={<Home />} />

            {/* Add Contact page */}
            <Route path="/add" element={<AddContact />} />

            {/* Edit Contact page */}
            <Route path="/edit/:id" element={<EditContact />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-200 text-center text-gray-600 py-4 text-sm">
          © {new Date().getFullYear()} Contact Manager. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
