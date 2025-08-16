import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import { addContact } from "../api/contacts"; // centralized API helper

export default function AddContact() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Handle adding a contact
  const handleAddContact = async (data) => {
    setLoading(true);
    try {
      await addContact(data);
      alert("✅ Contact added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding contact:", error);

      const errMsg =
        error.response?.data?.message ||
        (error.response?.data?.errors &&
          error.response.data.errors.join(", ")) ||
        "❌ Failed to add contact. Please try again.";

      if (error.response?.status === 409) {
        alert("⚠️ Contact already exists (email or phone in use).");
      } else {
        alert("⚠️ " + errMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 p-6 md:p-12 max-w-4xl mx-auto rounded-xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-extrabold text-gray-900">➕ Add New Contact</h2>
        <button
          onClick={() => navigate(-1)}
          disabled={loading} // prevent navigating while loading
          className={`flex items-center gap-2 px-6 py-2 text-sm rounded-lg transition focus:outline-none focus:ring-2 focus:ring-gray-400 ${
            loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300 text-gray-800"
          }`}
          aria-label="Go back"
        >
          ⬅ Back
        </button>
      </div>

      {/* Card */}
      <div className="bg-white shadow-lg rounded-2xl p-8">
        <ContactForm onSubmit={handleAddContact} buttonText={loading ? "Saving..." : undefined} />
      </div>
    </div>
  );
}
