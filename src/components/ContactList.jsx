import { useEffect, useState } from "react";
import ContactItem from "./ContactItem";
import { fetchContacts, deleteContact } from "../api/contacts";

export default function ContactList({ searchTerm, sortBy }) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch contacts on load
  useEffect(() => {
    const loadContacts = async () => {
      try {
        const data = await fetchContacts();
        setContacts(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setLoading(false);
      }
    };
    loadContacts();
  }, []);

  // Delete contact
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await deleteContact(id);
        setContacts((prev) => prev.filter((c) => c._id !== id));
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    }
  };

  // Filter + Sort contacts
  const filtered = contacts
    .filter((c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "name-desc") {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });

  if (loading)
    return (
      <p className="flex items-center justify-center gap-2 text-gray-600 mt-6 text-lg font-medium">
        <svg
          className="animate-spin h-6 w-6 text-indigo-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          ></path>
        </svg>
        ⏳ Loading contacts...
      </p>
    );

  return (
    <div
      className="space-y-5 bg-gradient-to-r from-white to-gray-50 p-6 rounded-2xl shadow-lg max-w-3xl mx-auto
                 transition-opacity duration-500 ease-in"
      aria-live="polite"
    >
      {filtered.length > 0 ? (
        filtered.map((contact) => (
          <ContactItem
            key={contact._id}
            contact={contact}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p className="text-gray-500 text-center mt-6 text-lg font-medium">
          No contacts found.
        </p>
      )}
    </div>
  );
}
