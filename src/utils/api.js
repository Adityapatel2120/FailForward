const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/reminders`
  : "http://localhost:5000/api/reminders";

function getHeaders() {
  const token = localStorage.getItem("ff_token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// GET ALL
export const getReminders = async () => {
  const res = await fetch(BASE_URL, { headers: getHeaders() });
  return await res.json();
};

// ADD
export const addReminder = async (data) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return await res.json();
};

// UPDATE
export const updateReminder = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return await res.json();
};

// DELETE
export const deleteReminder = async (id) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
};