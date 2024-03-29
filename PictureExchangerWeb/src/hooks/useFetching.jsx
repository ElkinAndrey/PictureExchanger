import { useState } from "react";

const useFetching = (callback, startLoader = false) => {
  const [isLoading, setIsLoading] = useState(startLoader); // Равно true, если данные пока, что получаются
  const [error, setError] = useState(null); // Если возникнет ошибка

  // Получение данных
  const fetching = async (...args) => {
    try {
      setIsLoading(true);
      await callback(...args); // Начать получение данных
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error];
};

export default useFetching;
