const BASE_URL = "http://localhost:5000/api/reminders";

// GET ALL
export const getReminders = async () => {
  const res = await fetch(BASE_URL);
  return await res.json();
};

// ADD
export const addReminder = async (data) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
};

// UPDATE
export const updateReminder = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
};

// DELETE
export const deleteReminder = async (id) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};