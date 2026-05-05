import { useState } from "react";
import { createRecord, updateRecord } from "../services/api";

export default function FormPage({ existingRecord = null }) {
  const [formData, setFormData] = useState({
    name: existingRecord?.name || "",
    status: existingRecord?.status || "",
    description: existingRecord?.description || "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.status) newErrors.status = "Status is required.";
    if (!formData.description.trim()) newErrors.description = "Description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      if (existingRecord) {
        await updateRecord(existingRecord.id, formData);
        setSuccessMessage("Record updated successfully!");
      } else {
        await createRecord(formData);
        setSuccessMessage("Record created successfully!");
      }
    } catch (err) {
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-[#1B4F8A]">
        {existingRecord ? "Edit Record" : "Create New Record"}
      </h1>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      {errors.general && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {errors.general}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4F8A]"
          placeholder="Enter record name"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4F8A]"
        >
          <option value="">Select status</option>
          <option value="COMPLIANT">Compliant</option>
          <option value="NON_COMPLIANT">Non Compliant</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="PENDING">Pending</option>
        </select>
        {errors.status && (
          <p className="text-red-500 text-xs mt-1">{errors.status}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4F8A]"
          placeholder="Enter description"
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description}</p>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="w-full bg-[#1B4F8A] text-white py-2 rounded font-medium hover:bg-blue-800 disabled:opacity-50"
      >
        {submitting ? "Saving..." : existingRecord ? "Update Record" : "Create Record"}
      </button>
    </div>
  );
}