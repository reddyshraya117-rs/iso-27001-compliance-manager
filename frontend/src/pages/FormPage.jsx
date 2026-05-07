import { useState } from "react";
import { createRecord, updateRecord } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function FormPage({ existingRecord = null }) {
  const [formData, setFormData] = useState({
    name: existingRecord?.name || "",
    status: existingRecord?.status || "",
    description: existingRecord?.description || "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

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
      setTimeout(() => navigate("/records"), 1500);
    } catch (err) {
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("/records")}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-[#1B4F8A]">
          {existingRecord ? "Edit Record" : "Create New Record"}
        </h1>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        {successMessage && (
          <div className="mb-5 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {successMessage}
          </div>
        )}

        {errors.general && (
          <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {errors.general}
          </div>
        )}

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] bg-gray-50"
            placeholder="Enter record name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status <span className="text-red-500">*</span>
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] bg-gray-50"
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] bg-gray-50"
            placeholder="Enter description"
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/records")}
            className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-lg font-medium hover:bg-gray-50 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex-1 bg-[#1B4F8A] text-white py-3 rounded-lg font-medium hover:bg-blue-800 disabled:opacity-50 text-sm"
          >
            {submitting ? "Saving..." : existingRecord ? "Update Record" : "Create Record"}
          </button>
        </div>
      </div>
    </div>
  );
}