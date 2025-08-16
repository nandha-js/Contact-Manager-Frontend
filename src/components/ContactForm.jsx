import { useState, useEffect } from "react";

export default function ContactForm({ initialData = null, onSubmit, buttonText }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // If editing, prefill the form
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
      });
    } else {
      setFormData({ name: "", email: "", phone: "" }); // reset for new contact
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validations
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      alert("All fields are required!");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Please enter a valid email!");
      return;
    }
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      alert("Phone must be 10 digits!");
      return;
    }

    onSubmit(formData);

    // Reset form only if adding (not editing)
    if (!initialData) {
      setFormData({ name: "", email: "", phone: "" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 
                 p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-200 
                 max-w-md w-full mx-auto transition-all duration-300 hover:shadow-2xl"
      aria-label="Contact form"
      noValidate
    >
      {/* Form Title */}
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        {initialData ? "Update Contact" : "New Contact"}
      </h2>

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
          Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Enter full name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-5 py-3 mt-1 border border-gray-300 rounded-lg
                     placeholder-gray-400 bg-white text-gray-900
                     focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500
                     transition duration-200 shadow-sm hover:shadow-md"
          aria-required="true"
          autoComplete="name"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter email address"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-5 py-3 mt-1 border border-gray-300 rounded-lg
                     placeholder-gray-400 bg-white text-gray-900
                     focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500
                     transition duration-200 shadow-sm hover:shadow-md"
          aria-required="true"
          autoComplete="email"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">
          Phone
        </label>
        <input
          id="phone"
          type="text"
          name="phone"
          placeholder="Enter 10-digit phone number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-5 py-3 mt-1 border border-gray-300 rounded-lg
                     placeholder-gray-400 bg-white text-gray-900
                     focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500
                     transition duration-200 shadow-sm hover:shadow-md"
          aria-required="true"
          inputMode="numeric"
          pattern="[0-9]{10}"
          maxLength={10}
          autoComplete="tel"
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-500 via-blue-600 to-purple-600 
                   hover:opacity-90 active:scale-[0.98]
                   text-white font-semibold px-6 py-3 rounded-lg 
                   shadow-lg shadow-indigo-400/30 
                   focus:outline-none focus:ring-4 focus:ring-indigo-400
                   transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={false}
      >
        {buttonText || (initialData ? "Update Contact" : "Save Contact")}
      </button>
    </form>
  );
}
