import { useEffect, useState } from "react";
import useFetching from "./hooks/useFetching";
import HomeApi from "./api/homeApi";

function App() {
  // ПЕРЕМЕННЫЕ
  const [data, dataChange] = useState("");

  // ОТПРАВКА И ПОЛУЧЕНИЕ ДАННЫХ
  const [fetchBook, isLoadingBook, errorBook] = useFetching(async () => {
    const response = await HomeApi.get();
    dataChange(response.data);
  });

  // Действия
  useEffect(() => {
    fetchBook();
  }, []);

  return (
    <div>
      <b>Данные</b>: {data}
    </div>
  );
}

export default App;
