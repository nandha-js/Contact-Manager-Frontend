import { useState } from "react";
import ContactList from "../components/ContactList";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-xl shadow-md">
      {/* Search + Sort Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <label htmlFor="search" className="sr-only">
          Search contacts
        </label>
        <div className="relative w-full sm:w-auto">
          <input
            id="search"
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-5 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            aria-label="Search contacts"
          />
          <svg
            className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35m0 0a7 7 0 1110-10 7 7 0 01-10 10z"
            />
          </svg>
        </div>

        <label htmlFor="sort" className="sr-only">
          Sort contacts
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full sm:w-auto px-5 py-3 border border-gray-300 rounded-lg shadow-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          aria-label="Sort contacts"
        >
          <option value="recent">Recent</option>
          <option value="name-asc">Name (A–Z)</option>
          <option value="name-desc">Name (Z–A)</option>
        </select>
      </div>

      {/* Contact List */}
      <ContactList searchTerm={searchTerm} sortBy={sortBy} />
    </div>
  );
}
