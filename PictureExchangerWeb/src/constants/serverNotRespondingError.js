import notificationStatus from "./notificationStatus";

/** Ошибка, если сервер не отвечает */
const serverNotRespondingError = {
  title: "Ошибка",
  text: "Сервер не отвечает",
  status: notificationStatus.error,
};

export default serverNotRespondingError;
