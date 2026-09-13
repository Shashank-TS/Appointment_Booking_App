import React, { useState } from "react";
import { updateAppointmentStatus, deleteAppointment } from "../api";
import { format } from "date-fns";

export default function AppointmentList({ appointments, refreshAppointments }) {
  const [expandedId, setExpandedId] = useState(null);

  const handleStatusChange = async (id, status) => {
    try {
      await updateAppointmentStatus(id, status);
      refreshAppointments();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?"))
      return;
    try {
      await deleteAppointment(id);
      refreshAppointments();
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatDateTime = (dateStr, timeStr) => {
    if (!dateStr || !timeStr) return "";
    try {
      const dateObj = new Date(`${dateStr}T${timeStr}`);
      return format(dateObj, "dd MMM, yyyy hh:mm a");
    } catch (error) {
      return `${dateStr} ${timeStr}`;
    }
  };

  console.log("appointments list check:", appointments);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Appointments</h2>
      <table className="min-w-full text-left border-collapse">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="p-3">Patient</th>
            <th className="p-3">Mobile</th>
            <th className="p-3">Doctor</th>
            <th className="p-3 whitespace-nowrap">Date & Time</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                className="p-8 text-center text-gray-500 font-medium"
              >
                No appointments yet - Book your first appointment using the form
                above
              </td>
            </tr>
          ) : (
            appointments.map((apt) => (
              <React.Fragment key={apt._id}>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div className="font-medium">{apt.patientName}</div>

                    {apt.aiSummary && apt.aiSummary.trim() !== "" && (
                      <button
                        onClick={() => toggleExpand(apt._id)}
                        className="text-xs text-blue-600 hover:underline mt-1 block focus:outline-none cursor-pointer"
                      >
                        {expandedId === apt._id
                          ? "Hide Summary"
                          : "View AI Summary"}
                      </button>
                    )}
                  </td>
                  <td className="p-3">{apt.mobileNumber}</td>
                  <td className="p-3">{apt.doctorName}</td>
                  <td className="p-3 whitespace-nowrap">
                    {formatDateTime(apt.appointmentDate, apt.appointmentTime)}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        apt.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : apt.status === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {apt.status}
                    </span>
                  </td>
                  <td className="p-3 flex flex-wrap justify-center gap-2">
                    {apt.status === "Pending" && (
                      <>
                        <button
                          onClick={() =>
                            handleStatusChange(apt._id, "Completed")
                          }
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                        >
                          Complete
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(apt._id, "Cancelled")
                          }
                          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDelete(apt._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>

                {expandedId === apt._id && apt.aiSummary && (
                  <tr className="bg-blue-50 border-b">
                    <td
                      colSpan="6"
                      className="p-4 text-sm text-gray-700 italic border-l-4 border-blue-400"
                    >
                      <strong>AI Summary:</strong> {apt.aiSummary}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
