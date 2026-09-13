import { useEffect, useState } from 'react';
import AppointmentForm from './components/AppointmentForm';
import AppointmentList from './components/AppointmentList';
import { getAppointments } from './api';

export default function App() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Clinic Living Plus</h1>
        <AppointmentForm onAppointmentAdded={fetchAppointments} />
        <AppointmentList appointments={appointments} refreshAppointments={fetchAppointments} />
      </div>
    </div>
  );
}