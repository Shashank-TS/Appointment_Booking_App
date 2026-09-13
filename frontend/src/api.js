const API_URL = `/api/appointments`;

export const createAppointment = async (data) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create appointment');
  return response.json();
};

export const getAppointments = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch appointments');
  return response.json();
};

export const updateAppointmentStatus = async (id, status) => {
  const response = await fetch(`${API_URL}/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error('Failed to update status');
  return response.json();
};

export const deleteAppointment = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete appointment');
  return response.json();
};