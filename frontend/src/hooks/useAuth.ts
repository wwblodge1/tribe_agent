import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "react-query";
import axios from 'axios';

import { type Body_login_login_access_token as AccessToken, type UserOut, UsersService } from "../client";

const isLoggedIn = () => {
  return localStorage.getItem("access_token") !== null;
};

const useAuth = () => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useQuery<UserOut | null, Error>(
    "currentUser",
    UsersService.readUserMe,
    {
      enabled: isLoggedIn(),
    },
  );

  const login = async (data: AccessToken) => {
    // Create form data
    const formData = new URLSearchParams();
    formData.append('username', data.username);
    formData.append('password', data.password);

    // Send POST request with form data
    const response = await axios.post('/api/v1/login/access-token', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    localStorage.setItem("access_token", response.data.access_token);
    navigate({ to: "/" });
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    navigate({ to: "/login" });
  };

  return { login, logout, user, isLoading };
};

export { isLoggedIn };
export default useAuth;
