import { useEffect, useState } from "react";
import { apiClient } from "../utils/apiClient";
import { useAuth } from "../hooks/useAuth.jsx";
import { useSearchParams } from "react-router-dom";
import {
  loginForm,
  userSelect,
  submitButton,
} from "../styles/Login.module.css";

export const Login = () => {
  const [users, setUsers] = useState([]);
  const [userInput, setUserInput] = useState("random");
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  useEffect(() => {
    apiClient.get(`/users`).then(({ data }) => setUsers(data.users));
  });
  const handleUserChange = (e) => setUserInput(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let randomUser;
    if (userInput === "random") {
      const randomIndex = Math.floor(Math.random() * users.length);
      randomUser = users[randomIndex];
    }
    await login(
      randomUser || users[Number(userInput)],
      searchParams.get("redirect")?.replace("%2F", "/")
    );
  };
  return (
    <form onSubmit={handleSubmit} className={loginForm}>
      <label>Select a user to impersonate</label>
      <select
        value={userInput}
        onChange={handleUserChange}
        className={userSelect}
      >
        <option key="random" value="random">
          Random User
        </option>
        {users.map(({ username, name }, index) => (
          <option key={username} value={index}>
            {name}
          </option>
        ))}
      </select>
      <button type="submit" className={submitButton}>
        Log in
      </button>
      <p>
        <em>
          You can log out at any time by clicking on your avatar in the top
          right
        </em>
      </p>
    </form>
  );
};
