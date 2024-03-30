import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogInTutor = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const loginTutor = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("https://learnhattan-mern.vercel.app/api/tutor/login", {
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
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };

  return { loginTutor, error, isLoading };
};
