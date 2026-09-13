import { useState, useEffect } from "react";
import { createAppointment } from "../api";

export default function AppointmentForm({ onAppointmentAdded }) {
  const [formData, setFormData] = useState({
    patientName: "",
    mobileNumber: "",
    doctorName: "",
    appointmentDate: "",
    appointmentTime: "",
    reasonForVisit: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [minDate, setMinDate] = useState("");
  const [minTime, setMinTime] = useState("");

  useEffect(() => {
    const updateMinConstraints = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      setMinDate(`${year}-${month}-${day}`);

      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setMinTime(`${hours}:${minutes}`);
    };

    updateMinConstraints();
    const interval = setInterval(updateMinConstraints, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createAppointment(formData);
      setMessage({ type: "success", text: "Appointment booked successfully!" });
      setFormData({
        patientName: "",
        mobileNumber: "",
        doctorName: "",
        appointmentDate: "",
        appointmentTime: "",
        reasonForVisit: "",
      });
      if (onAppointmentAdded) onAppointmentAdded();
    } catch (error) {
      setMessage({ type: "error", text: "Error booking appointment." });
    } finally {
      setIsLoading(false);
    }
  };

  const isToday = formData.appointmentDate === minDate;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-8"
    >
      <h2 className="text-xl font-bold mb-4">Book Appointment</h2>
      {message.text && (
        <div
          className={`p-3 mb-4 rounded ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
        >
          {message.text}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="patientName"
          placeholder="Patient Name"
          value={formData.patientName}
          onChange={handleChange}
          pattern="[A-Za-z\s\-']+"
          onInvalid={(e) =>
            e.target.setCustomValidity(
              "Please enter a valid name without numbers.",
            )
          }
          onInput={(e) => e.target.setCustomValidity("")}
          required
          className="p-2 border rounded"
        />
        <input
          type="tel"
          name="mobileNumber"
          placeholder="Mobile Number"
          pattern="[0-9]{10}"
          title="10 digit mobile number"
          value={formData.mobileNumber}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="doctorName"
          placeholder="Doctor Name"
          value={formData.doctorName}
          onChange={handleChange}
          pattern="[A-Za-z\s\-']+"
          onInvalid={(e) =>
            e.target.setCustomValidity(
              "Please enter a valid name without numbers.",
            )
          }
          onInput={(e) => e.target.setCustomValidity("")}
          required
          className="p-2 border rounded"
        />
        <input
          type="date"
          name="appointmentDate"
          min={minDate}
          value={formData.appointmentDate}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="time"
          name="appointmentTime"
          min={isToday ? minTime : undefined}
          value={formData.appointmentTime}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
      </div>
      <div className="mt-4">
        <textarea
          name="reasonForVisit"
          placeholder="Reason for Visit (Optional) - AI will generate a summary"
          value={formData.reasonForVisit}
          onChange={handleChange}
          className="p-2 border rounded w-full"
          rows="2"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={`mt-4 w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded transition ${
          isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
        }`}
      >
        {isLoading ? "Booking..." : "Book Appointment"}
      </button>{" "}
    </form>
  );
}
