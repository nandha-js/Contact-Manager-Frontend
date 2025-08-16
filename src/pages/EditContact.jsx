import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ContactForm from "../components/ContactForm";

export default function EditContact() {
  const { id } = useParams(); // Contact ID from URL
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch contact data for prefilling
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/contacts/${id}`
        );
        setContact(res.data?.data || res.data); // safer handling
      } catch (error) {
        console.error("Error fetching contact:", error);
        alert("❌ Failed to fetch contact details.");
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  // Handle updating contact
  const handleUpdateContact = async (data) => {
    setUpdating(true);
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/contacts/${id}`,
        data
      );
      alert("✅ Contact updated successfully!");
      navigate("/"); // Redirect to home
    } catch (error) {
      console.error("Error updating contact:", error);

      if (error.response?.status === 409) {
        alert("⚠️ Contact with this email/phone already exists.");
      } else if (error.response?.status === 400) {
        alert(
          "⚠️ Validation error: " +
            (error.response.data.errors?.join(", ") ||
              error.response.data.message)
        );
      } else {
        alert("❌ Failed to update contact. Please try again.");
      }
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <p className="flex justify-center items-center gap-2 text-gray-600 mt-10 text-lg font-medium">
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
        ⏳ Loading contact details...
      </p>
    );
  }

  if (!contact) {
    return (
      <p className="text-center text-red-600 mt-10 text-lg font-semibold">
        ❌ Contact not found.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 p-6 md:p-12 max-w-4xl mx-auto rounded-xl">
      {/* Header with Back button */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-extrabold text-gray-900">✏️ Edit Contact</h2>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-5 py-2 text-sm rounded-lg bg-gray-300 hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 text-gray-900 transition"
          aria-label="Go back"
        >
          ⬅ Back
        </button>
      </div>

      {/* Card */}
      <div className="bg-white shadow-lg rounded-2xl p-8">
        <ContactForm
          initialData={contact}
          onSubmit={handleUpdateContact}
          buttonText={updating ? "Saving..." : undefined}
          loading={updating}
        />
      </div>
    </div>
  );
}
