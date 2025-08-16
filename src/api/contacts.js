// src/api/contacts.js
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/contacts`;

// ✅ Fetch all contacts
export const fetchContacts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// ✅ Add new contact
export const addContact = async (contactData) => {
  const res = await axios.post(API_URL, contactData);
  return res.data;
};

// ✅ Get a contact by ID
export const getContactById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// ✅ Update a contact
export const updateContact = async (id, contactData) => {
  const res = await axios.put(`${API_URL}/${id}`, contactData);
  return res.data;
};

// ✅ Delete a contact
export const deleteContact = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
