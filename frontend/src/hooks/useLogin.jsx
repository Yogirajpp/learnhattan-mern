import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogIn = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const json = await response.json();
    if (!json.success) {
      setIsLoading(false);
      setError(json.error);
    }
    if (json.success) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({type : "LOGIN", payload : json});
      setIsLoading(false);
    }
  };
  return { login,error,isLoading };
};
