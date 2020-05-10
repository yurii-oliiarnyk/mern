import { useState, useCallback } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading();

      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }

        const response = await fetch(url, {
          method,
          body,
          headers,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Щось пішло не так");
        }

        setLoading(false);

        return data;
      } catch (error) {
        setLoading();
        setError(error.message);
        throw error;
      }
    },
    []
  );

  const clearError = () => setError(null);

  return {
    loading,
    error,
    request,
    clearError,
  };
};