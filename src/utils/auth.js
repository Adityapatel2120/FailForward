const USERS_KEY = "oma_users";
const CURRENT_USER_KEY = "oma_current_user";

export function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function signupUser({ name, email, password }) {
  const users = getUsers();

  const alreadyExists = users.find((u) => u.email === email);
  if (alreadyExists) {
    return { ok: false, message: "User already exists with this email." };
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
  };

  users.push(newUser);
  saveUsers(users);

  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify({ id: newUser.id, name: newUser.name, email: newUser.email })
  );

  return { ok: true, user: newUser };
}

export function loginUser({ email, password }) {
  const users = getUsers();

  const found = users.find((u) => u.email === email);

  if (!found) {
    return { ok: false, message: "No account found with this email." };
  }

  if (found.password !== password) {
    return { ok: false, message: "Incorrect password." };
  }

  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify({ id: found.id, name: found.name, email: found.email })
  );

  return { ok: true, user: found };
}

export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || "null");
}

export function isLoggedIn() {
  return !!getCurrentUser();
}
